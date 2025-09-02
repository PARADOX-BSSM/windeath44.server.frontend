import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { anime } from '@/config';

interface FetchCharactersParams {
  cursorId?: number;
  size?: number;
}

export const fetchCharacters = async ({ cursorId, size }: FetchCharactersParams) => {
  const response = await api.get(`${anime}/characters`, {
    params: { cursorId, size },
  });
  return response.data;
};

export const useGetCharactersQuery = ({ cursorId, size = 30 }: FetchCharactersParams) => {
  return useQuery({
    queryKey: ['characters', cursorId, size],
    queryFn: () => fetchCharacters({ cursorId, size }),
  });
};
