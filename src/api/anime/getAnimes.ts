import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { anime } from '@/config';

interface AnimeItem {
  animeId: number;
  name: string;
  genres: string[];
  imageUrl: string;
}

interface AnimeResponse {
  message: string;
  data: {
    data: AnimeItem[];
    hasNext: boolean;
  };
}

interface FetchAnimesParams {
  cursorId?: number | null;
  size?: number;
  animeName?: string;
}

const fetchAnimesPage = async ({
  cursorId = null,
  size = 10,
  animeName = '',
}: FetchAnimesParams): Promise<AnimeResponse> => {
  const url = new URL(anime);
  const params = new URLSearchParams();
  if (cursorId != null) params.set('cursorId', String(cursorId));
  params.set('size', String(size));
  if (animeName && animeName.trim()) params.set('animeName', animeName);
  url.search = params.toString();

  const res = await fetch(url.toString(), {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch animes: ${res.status}`);
  }
  return (await res.json()) as AnimeResponse;
};

export const useInfiniteAnimes = (size: number, name: string | '') => {
  return useInfiniteQuery<
    AnimeResponse,
    Error,
    InfiniteData<AnimeResponse>,
    [string, string | undefined],
    number | null
  >({
    queryKey: ['animeName', name ? encodeURIComponent(name) : ''],
    queryFn: async ({ pageParam = null }) => {
      return fetchAnimesPage({ cursorId: pageParam, size, animeName: name });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage, allPages) => {
      const lastItems = allPages.at(-1)!.data.data;
      if (!lastItems || lastItems.length === 0) return undefined;
      const lastAnime = lastItems[lastItems.length - 1];
      return lastPage.data.hasNext ? lastAnime.animeId : undefined;
    },
  });
};
