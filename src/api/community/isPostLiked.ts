import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface IsPostLikedResponse {
  message: string;
  data: {
    isLiked: boolean;
  };
}

const isPostLiked = async (postId: number, userId: string) => {
  try {
    const response: AxiosResponse<IsPostLikedResponse> = await api.get(
      `${community}/posts/${postId}/likes`,
      {
        headers: {
          'user-id': 'user_id',
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('좋아요 상태 조회 실패:', error.message);
    }
    throw error;
  }
};

export const useIsPostLiked = (postId: number, userId: string) => {
  return useQuery({
    queryKey: ['postLike', postId, userId],
    queryFn: () => isPostLiked(postId, userId),
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분 동안 캐시 유지
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
  });
};
