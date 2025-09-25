import { memorial } from '@/config';
import { user } from '@/config';
import { useMutation } from '@tanstack/react-query';
import qs from 'qs';
import api from '@/api/axiosInstance.ts';
import {
  BowData,
  memorialChiefs,
  memorialChiefVar,
  memorialUserIdResponse,
  memorialUserIdVar,
  userList,
  usersData,
} from '@/modules/interface.ts';

const getMemorialChiefs = async ({ memorialId }: memorialChiefVar): Promise<memorialChiefs> => {
  const response = await api.get(`${memorial}/chiefs/${memorialId}`, {});
  return response.data;
};

const getMemorialByUserId = async ({
  memorialId,
  userId,
}: memorialUserIdVar): Promise<memorialUserIdResponse> => {
  const response = await api.get(`${memorial}/bow/${userId}/${memorialId}`, {});
  return response.data;
};

const getUserByList = async ({ userList }: userList): Promise<usersData> => {
  // 빈 배열일 때 빈 응답 반환
  if (!userList || userList.length === 0) {
    return { message: '', data: [] };
  }

  const response = await api.get(`${user}`, {
    params: { userIds: userList },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
  return response.data;
};

export const useMemorialChiefBows = (
  setBowData: React.Dispatch<React.SetStateAction<BowData[] | undefined>>,
  memorialId: number,
) => {
  return useMutation<BowData[], Error, void>({
    mutationFn: async (): Promise<BowData[]> => {
      // chiefs 조회
      const chiefsRes = await getMemorialChiefs({ memorialId });
      const chiefIds = chiefsRes.data; // string[] (userId)

      // userId별 bow 정보 가져오기
      // console.log('chiefIds 상세:', chiefIds);
      const bowResults: memorialUserIdResponse[] = await Promise.all(
        chiefIds.map((userId) => {
          // console.log('변환 전 userId:', userId, '문자열로 전달');
          return getMemorialByUserId({ memorialId, userId: userId });
        }),
      );
      // console.log('bowResults:', bowResults);
      // 이름 가져오기
      const userList = chiefIds.map((id) => id);
      // console.log('userList 데이터!!!:', userList);
      const usersRes: usersData = await getUserByList({ userList });
      // console.log('users:', usersRes.data);
      // bowCount + name 합치기
      // console.log('bowResults 상세:', JSON.stringify(bowResults, null, 2));
      const merged = bowResults
        .filter((bow) => bow?.data) // null/undefined 필터링
        .map((bow) => {
          const user = usersRes.data.find((u) => u.userId === bow.data.userId);
          return {
            name: user ? user.name : 'Unknown',
            bowCount: bow.data.bowCount,
          };
        });
      // console.log('merged 결과:', merged);
      return merged;
    },

    onSuccess: (data: BowData[]) => {
      // console.log('setBowData 호출:', data);
      setBowData(data);
    },

    onError: (err: Error) => {
      console.error(err);
    },
  });
};
