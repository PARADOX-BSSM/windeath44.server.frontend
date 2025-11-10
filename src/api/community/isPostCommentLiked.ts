import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface IsPostCommentLikedResponse {
  message: string;
  data: {
    isLiked: boolean;
  };
}

const isPostCommentLiked = async (commentId: number, userId: string) => {
  try {
    const response: AxiosResponse<IsPostCommentLikedResponse> = await api.get(
      `${community}/posts/commnets/${commentId}/likes`,
      {
        headers: {
          'user-id': userId,
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

export const useIsPostCommentLiked = (commentId: number, userId: string) => {
  return useQuery({
    queryKey: ['commentLike', commentId, userId],
    queryFn: () => isPostCommentLiked(commentId, userId),
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분 동안 캐시 유지
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
  });
};
