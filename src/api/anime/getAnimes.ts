import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { anime } from '@/config';

interface FetchAnimesParams {
  cursorId?: number;
  size: number;
  animeName?: string;
}

export const fetchAnimes = async ({ cursorId, size, animeName }: FetchAnimesParams) => {
  const response = await api.get(`${anime}`, {
    params: { cursorId, size, animeName },
    withCredentials: true,
  });
  return response.data;
};

export const useGetAnimesQuery = ({ cursorId, size = 10, animeName }: FetchAnimesParams) => {
  return useQuery({
    queryKey: ['animes', cursorId, size, animeName],
    queryFn: () => fetchAnimes({ cursorId, size, animeName }),
  });
};
