import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { anime } from '@/config';

interface FetchCharactersParams {
  animeId?: number[];
  cursorId?: number;
  size?: number;
}

export const fetchCharacters = async ({ animeId, cursorId, size }: FetchCharactersParams) => {
  const response = await api.get(`${anime}/characters/search/anime`, {
    params: { animeId, cursorId, size },
    withCredentials: true,
  });
  return response.data;
};

export const useGetCharactersByAnimeQuery = ({
  animeId = [1],
  cursorId,
  size = 10,
}: FetchCharactersParams) => {
  return useQuery({
    queryKey: ['characters', animeId, cursorId, size],
    queryFn: () => fetchCharacters({ animeId, cursorId, size }),
  });
};
