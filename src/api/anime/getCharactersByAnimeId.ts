import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { anime } from '@/config';
import qs from 'qs';

interface FetchCharactersParams {
  animeId?: number[];
  cursorId?: number;
  size?: number;
}

export const fetchCharacters = async ({ animeId, cursorId, size }: FetchCharactersParams) => {
  const response = await api.get(`${anime}/characters/search/anime`, {
    params: { animeId, cursorId, size },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    withCredentials: true,
  });
  return response.data;
};

export const useGetCharactersByAnimeQuery = ({
  animeId = [23176],
  cursorId,
  size = 10,
}: FetchCharactersParams) => {
  return useQuery({
    queryKey: ['characters', animeId, cursorId, size],
    queryFn: () => fetchCharacters({ animeId, cursorId, size }),
  });
};
