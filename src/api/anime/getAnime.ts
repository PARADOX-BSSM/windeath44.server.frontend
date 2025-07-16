import axios from 'axios';
import { AxiosResponse } from 'axios';
import { anime } from '@/config/index';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

interface GetAnimeParams {
  cursorId?: number | null;
  size: number;
  name?: string;
}
interface Anime {
  animeId: number;
  name: string;
  genres: string[];
  imageUrl: string;
}

interface AnimeResponse {
  message: string;
  data: {
    values: Anime[];
    hasNext: boolean;
  };
}

const fetchAnime = async ({
  cursorId,
  size = 10,
  name = '',
}: GetAnimeParams): Promise<AnimeResponse> => {
  const response: AxiosResponse<AnimeResponse> = await axios.get(`${anime}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    params: {
      ...(cursorId != null ? { cursorId } : {}),
      size,
      ...(name ? { animeName: name } : {}),
    },
    withCredentials: true,
  });

  return response.data;
};

export const useInfiniteAnime = (size: number, name: string | '') => {
  return useInfiniteQuery<
    AnimeResponse,
    Error,
    InfiniteData<AnimeResponse>,
    [string, string | undefined],
    number | null
  >({
    queryKey: ['animeName', encodeURIComponent(name)],
    queryFn: async ({ pageParam = null }) => {
      // console.log('요청하는 cursorId:', pageParam);
      return fetchAnime({ cursorId: pageParam, size, name });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage, allPages) => {
      const lastValues = allPages.at(-1)!.data.values;
      const lastAnime = lastValues[lastValues.length - 1];
      return lastPage.data.hasNext ? lastAnime.animeId : undefined;
    },
  });
};
