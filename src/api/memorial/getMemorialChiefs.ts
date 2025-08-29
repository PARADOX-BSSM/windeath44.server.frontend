import axios from 'axios';
import { memorial } from '@/config';
import { user } from '@/config';
import { useMutation } from '@tanstack/react-query';
import qs from 'qs';

// memorial chief
type memorialChiefs = {
  message: string;
  data: string[];
};
type memorialChiefVar = {
  memorialId: number;
};
// memorial bow by user id and memorial id
type memorialUserIdData = {
  bowId: number;
  memorialId: number;
  userId: string;
  bowCount: number;
  lastBowedAt: string;
};
type memorialUserIdResponse = {
  message: string;
  data: memorialUserIdData;
};
type memorialUserIdVar = {
  memorialId: number;
  userId: number;
};
//Get Users By List
type usersResponse = {
  userId: string;
  name: string;
  remainToken: number;
  profile: string;
  role: string;
};
type usersData = {
  message: string;
  data: usersResponse[];
};
type userList = {
  userList: string[];
};
//최종 반환 데이터
type BowData = {
  name: string;
  bowCount: number;
};

const getMemorialChiefs = async ({ memorialId }: memorialChiefVar): Promise<memorialChiefs> => {
  const response = await axios.get(`${memorial}/chiefs/${memorialId}`, {
    withCredentials: true,
  });
  return response.data;
};

const getMemorialByUserId = async ({
  memorialId,
  userId,
}: memorialUserIdVar): Promise<memorialUserIdResponse> => {
  const response = await axios.get(`${memorial}/bow/${userId}/${memorialId}`, {
    withCredentials: true,
  });
  return response.data;
};

const getUserByList = async ({ userList }: userList): Promise<usersData> => {
  const response = await axios.get(`${user}`, {
    withCredentials: true,
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
  return useMutation<BowData[], Error, number>({
    mutationFn: async (): Promise<BowData[]> => {
      // chiefs 조회
      const chiefsRes = await getMemorialChiefs({ memorialId });
      const chiefIds = chiefsRes.data; // string[] (userId)

      console.log('chiefIds:', chiefIds);

      // userId별 bow 정보 가져오기
      const bowResults: memorialUserIdResponse[] = await Promise.all(
        chiefIds.map((userId) => getMemorialByUserId({ memorialId, userId: Number(userId) })),
      );

      console.log('bowResults:', bowResults);

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

      console.log('merged bowData:', merged);
      return merged;
    },

    onSuccess: (data: BowData[]) => {
      setBowData(data);
      console.log('Final bowData set:', data);
    },

    onError: (err: Error) => {
      alert('정보를 가져오는 중 문제가 발생했습니다!!\n다시 시도해주세요!');
      console.error(err);
    },
  });
};
