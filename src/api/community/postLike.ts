import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface postLike {
  post_id: number;
  user_id: string;
}
const postLike = async ({ post_id, user_id }: postLike) => {
  try {
    const Response: AxiosResponse = await api.post(
      `${community}/posts/${post_id}/likes`,
      {},
      {
        headers: {
          'user-id': user_id,
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

export const usePostLike = () => {
  useMutation({
    mutationFn: postLike,
    onSuccess: () => {},
    onError: (error) => {
      console.error('댓글 좋아요 실패:', error);
    },
  });
};
