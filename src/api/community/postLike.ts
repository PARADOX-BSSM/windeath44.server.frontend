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
          'user-id': 'user_id',
        },
      },
    );
    return Response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(`게시글 좋아요 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const usePostLike = () => {
  return useMutation({
    mutationFn: postLike,
    onSuccess: () => {},
    onError: (error) => {
      console.error('게시글 좋아요 실패:', error);
    },
  });
};
