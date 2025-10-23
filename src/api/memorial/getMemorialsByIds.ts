import { useQuery } from '@tanstack/react-query';
import { memorial } from '@/config';
import axios from 'axios';

export interface MemorialData {
  memorialId: number;
  characterId: number;
  chiefs: string[];
  bowCount: number;
  memorialCommitId: number;
  content: string;
  userId: string;
  createdAt: string;
  mergerId: string;
  updatedAt: string;
}

interface GetMemorialsByIdsResponse {
  message: string;
  data: MemorialData[];
}

const getMemorialsByIds = async (memorialIds: number[]): Promise<GetMemorialsByIdsResponse> => {
  // memorialIds를 string 배열로 변환
  const idsArray = memorialIds.map((id) => id.toString());

  const response = await axios.get(`${memorial}/memorialIds`, {
    params: {
      memorialIds: idsArray,
    },
    paramsSerializer: {
      indexes: null, // memorialIds=1&memorialIds=2 형식으로 직렬화
    },
  });
  return response.data;
};

export const useGetMemorialsByIdsQuery = (memorialIds: number[], enabled: boolean = true) => {
  return useQuery({
    queryKey: ['memorialsByIds', memorialIds],
    queryFn: () => getMemorialsByIds(memorialIds),
    enabled: enabled && memorialIds.length > 0,
  });
};
