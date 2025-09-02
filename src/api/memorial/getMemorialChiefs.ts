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
      const bowResults: memorialUserIdResponse[] = await Promise.all(
        chiefIds.map((userId) => getMemorialByUserId({ memorialId, userId: Number(userId) })),
      );
      // 이름 가져오기
      const userList = chiefIds.map((id) => id);
      console.log('userList 데이터!!!:', userList);
      const usersRes: usersData = await getUserByList({ userList });
      console.log('users:', usersRes.data);
      // bowCount + name 합치기
      const merged = bowResults.map((bow) => {
        const user = usersRes.data.find((u) => u.userId === bow.data.userId);
        return {
          name: user ? user.name : 'Unknown',
          bowCount: bow.data.bowCount,
        };
      });
      return merged;
    },

    onSuccess: (data: BowData[]) => {
      setBowData(data);
    },

    onError: (err: Error) => {
      alert('정보를 가져오는 중 문제가 발생했습니다!!\n다시 시도해주세요!');
      console.error(err);
    },
  });
};
