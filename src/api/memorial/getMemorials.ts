import { useQuery } from '@tanstack/react-query';
import { memorial } from '@/config';
import axios from 'axios';

interface FetchMemorialsParams {
  orderBy: string;
  page: number;
}

export const fetchMemorials = async ({ orderBy, page }: FetchMemorialsParams) => {
  const response = await axios.get(`${memorial}`, {
    params: { orderBy, page },
  });
  return response.data;
};

export const useGetMemorialsQuery = ({
  orderBy = 'recently-updated',
  page = 1,
}: FetchMemorialsParams) => {
  return useQuery({
    queryKey: ['memorials', orderBy, page],
    queryFn: () => fetchMemorials({ orderBy, page }),
  });
};
