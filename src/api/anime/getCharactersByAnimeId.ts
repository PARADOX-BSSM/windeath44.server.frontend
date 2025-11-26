import { useQuery } from '@tanstack/react-query';
import { anime } from '@/config';
import qs from 'qs';
import axios from 'axios';

interface FetchCharactersParams {
  animeId?: number[];
  cursorId?: number;
  size?: number;
}

export const fetchCharacters = async ({ animeId, cursorId, size }: FetchCharactersParams) => {
  const response = await axios.get(`${anime}/characters/search/anime`, {
    params: { animeId, cursorId, size },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
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
