import { useQuery } from '@tanstack/react-query';
import api from '../axiosInstance';
import { memorial } from '@/config';

interface MemorialTracingData {
  memorialId: number;
  viewedAt: string;
}

interface MemorialTracingResponse {
  message: string;
  data: {
    hasNext: boolean;
    data: MemorialTracingData[];
  };
}

const getMemorialTracing = async (
  size: number = 6,
  cursor?: string,
): Promise<MemorialTracingResponse> => {
  const response = await api.get(`${memorial}/memorial-tracing`, {
    params: {
      size,
      ...(cursor && { cursor }),
    },
  });
  return response.data;
};

export const useGetMemorialTracingQuery = (size: number = 6) => {
  return useQuery({
    queryKey: ['memorialTracing', size],
    queryFn: () => getMemorialTracing(size),
  });
};
