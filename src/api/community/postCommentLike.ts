import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface postCommentLike {
  comment_id: number;
  user_id: string;
}
const postCommentLike = async ({ comment_id, user_id }: postCommentLike) => {
  try {
    const Response: AxiosResponse = await api.post(
      `${community}/posts/comments/${comment_id}/likes`,
      {},
      {
        headers: {
          'user-id': 'user_id',
        },
      },
    );
    return Response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(`댓글 좋아요 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const usePostCommentLike = () => {
  return useMutation({
    mutationFn: postCommentLike,
    onSuccess: () => {},
    onError: (error) => {
      console.error('댓글 좋아요 실패:', error);
    },
  });
};
