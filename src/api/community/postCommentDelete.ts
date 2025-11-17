import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface postCommentDeleteInterface {
  post_id: number;
  comment_id: number;
}
const postCommentDelete = async ({ post_id, comment_id }: postCommentDeleteInterface) => {
  try {
    const response: AxiosResponse = await api.delete(
      `${community}/posts/${post_id}/comments/${comment_id}`,
      {
        headers: {
          'user-id': 'user_id',
          role: '',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('댓글 삭제 실패: ', error);
    throw error;
  }
};

export const usePostCommentDelete = () => {
  return useMutation({
    mutationFn: postCommentDelete,
    onSuccess: () => {},
    onError: () => {},
  });
};
