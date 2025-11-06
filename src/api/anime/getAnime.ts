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
    staleTime: 10 * 60 * 1000, // 10분간 캐시
  });
};
