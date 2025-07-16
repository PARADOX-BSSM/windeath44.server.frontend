import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { anime } from '@/config';

interface FetchCharactersParams {
  deathReason?: string;
  cursorId?: number;
  size?: number;
}

export const fetchCharacters = async ({ deathReason, cursorId, size }: FetchCharactersParams) => {
  const response = await api.get(`${anime}/characters/search/death-reason`, {
    params: { deathReason, cursorId, size },
    withCredentials: true,
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
