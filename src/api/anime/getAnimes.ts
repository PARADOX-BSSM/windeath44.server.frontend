import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { anime } from '@/config';

interface FetchAnimesParams {
  cursorId?: number;
  size?: number;
  animeName?: string;
}

export const fetchAnimes = async ({ cursorId, size = 10, animeName }: FetchAnimesParams) => {
  const response = await api.get(`${anime}`, {
    params: { cursorId, size, animeName },
  });
  return response.data; // { data: { values: AnimeItem[] } } 가정
};

export const useGetAnimesQuery = ({ cursorId, size = 10, animeName }: FetchAnimesParams) => {
  const hasKeyword = !!(animeName && animeName.trim());
  return useQuery({
    queryKey: ['animes', cursorId ?? null, size, animeName ?? ''],
    queryFn: () => fetchAnimes({ cursorId, size, animeName }),
    enabled: hasKeyword, // 검색어 없으면 호출 안 함
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
};
