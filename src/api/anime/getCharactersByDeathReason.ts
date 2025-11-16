import { useQuery } from '@tanstack/react-query';
import { anime } from '@/config';
import axios from 'axios';

interface FetchCharactersParams {
  deathReason?: string;
  cursorId?: number;
  size?: number;
}

export const fetchCharacters = async ({ deathReason, cursorId, size }: FetchCharactersParams) => {
  const response = await axios.get(`${anime}/characters/search/death-reason`, {
    params: { deathReason, cursorId, size },
  });
  return response.data;
};

export const useGetCharactersByDeathReasonQuery = ({
  deathReason = '',
  cursorId,
  size = 10,
}: FetchCharactersParams) => {
  return useQuery({
    queryKey: ['characters', deathReason, cursorId, size],
    queryFn: () => fetchCharacters({ deathReason, cursorId, size }),
  });
};
