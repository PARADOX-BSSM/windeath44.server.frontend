import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';
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
  userId: string,
  size: number = 6,
  cursor?: string
): Promise<MemorialTracingResponse> => {
  const response = await axiosInstance.get(`${memorial}/memorial-tracing/${userId}`, {
    params: {
      size,
      ...(cursor && { cursor: toUnixTime(cursor) })
    },
  });
  return response.data;
};

export const useGetMemorialTracingQuery = (userId: string, size: number = 6) => {
  return useQuery({
    queryKey: ['memorialTracing', userId, size],
    queryFn: () => getMemorialTracing(userId, size),
    enabled: !!userId,
  });
};
