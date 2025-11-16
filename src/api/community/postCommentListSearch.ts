import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface commentData {
  message: string;
  comments: {
    commentId: number;
    postId: number;
    userId: string;
    name: string;
    profile: string;
    parentCommentId?: number | null;
    body: string;
    createdAt: string;
    updatedAt: string;
    likesCount: number;
  }[];
}

const postCommentListSearch = async (post_id: number) => {
  try {
    const response: AxiosResponse<commentData> = await api.get(
      `${community}/posts/${post_id}/comments`,
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log('댓글 조회가 실패했습니다: ', error.data);
    }
    throw error;
  }
};

export const usePostCommentListSearch = (post_id: number) => {
  return useQuery({
    queryKey: ['postComment', post_id],
    queryFn: () => postCommentListSearch(post_id),
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh상태 유지
    gcTime: 10 * 60 * 1000, // 10분 동안 캐시 유지
  });
};
