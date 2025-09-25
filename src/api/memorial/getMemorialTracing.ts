import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';
import { memorial } from '@/config';

interface MemorialCommentResponse {
  commentId: number;
  memorialId: number;
  userId: string;
  content: string;
  likes: number;
  isLiked: boolean;
  parentId: number;
  createdAt: string;
}

interface MemorialTracingResponse {
  message: string;
  data: MemorialCommentResponse[];
}

const getMemorialTracing = async (
  userId: string,
  size: number = 6,
): Promise<MemorialTracingResponse> => {
  const response = await axiosInstance.get(`${memorial}/memorial-tracing/${userId}`, {
    params: {
      size,
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
