import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { memorial } from '@/config';

interface FetchMemorialsParams {
  orderBy: string;
  page: number;
}

export const fetchMemorials = async ({ orderBy, page }: FetchMemorialsParams) => {
  const response = await api.get(`${memorial}`, {
    params: { orderBy, page },
    withCredentials: true,
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
