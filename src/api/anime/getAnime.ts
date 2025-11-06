import { useQuery } from '@tanstack/react-query';
import { anime } from '@/config';
import axios from 'axios';

export interface AnimeData {
  animeId: number;
  name: string;
  genres: string[];
  imageUrl: string;
}

interface GetAnimeResponse {
  message: string;
  data: AnimeData;
}

const getAnime = async (animeId: number): Promise<GetAnimeResponse> => {
  const response = await axios.get(`${anime}/${animeId}`);
  return response.data;
};

export const useGetAnimeQuery = (animeId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['anime', animeId],
    queryFn: () => getAnime(animeId),
    enabled: enabled && !!animeId,
    staleTime: Infinity, // 애니메이션 정보는 변경되지 않으므로 무한 캐시
    gcTime: 1000 * 60 * 60 * 24, // 24시간 동안 메모리에 유지
  });
};
