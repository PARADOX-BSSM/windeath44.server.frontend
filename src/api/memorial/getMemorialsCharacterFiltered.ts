import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { memorial } from '@/config';

interface FetchMemorialsParams {
  orderBy: string;
  page: number;
  characters: number[];
}

export const fetchMemorials = async ({ orderBy, page, characters }: FetchMemorialsParams) => {
  const response = await api.post(
    `${memorial}/character-filtered`,
    { orderBy, page, characters }, // body
    { withCredentials: true }, // config
  );
  return response.data;
};

export const useGetMemorialsCharacterFilteredQuery = ({
  orderBy = 'recently-updated',
  page = 1,
  characters = [5],
}: FetchMemorialsParams) => {
  return useQuery({
    queryKey: ['memorials', orderBy, page, characters],
    queryFn: () => fetchMemorials({ orderBy, page, characters }),
  });
};
