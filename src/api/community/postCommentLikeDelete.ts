import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface postCommentLikeDeleteInterface {
  comment_id: number;
  user_id: string;
}

const postCommentLikeDelete = async ({ comment_id, user_id }: postCommentLikeDeleteInterface) => {
  try {
    const response: AxiosResponse = await api.delete(
      `${community}/posts/comments/${comment_id}/likes`,
      {
        headers: {
          'user-id': user_id,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(`댓글 좋아요 삭제 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const useCommentPosstLikeDelete = () => {
  useMutation({
    mutationFn: postCommentLikeDelete,
    onSuccess: () => {},
    onError: (error) => {
      console.error('댓글 좋아요 삭제 실패:', error);
    },
  });
};
