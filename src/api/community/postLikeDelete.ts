import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface postLikeDeleteInterface {
  post_id: number;
  user_id: string;
}

const postLikeDelete = async ({ post_id, user_id }: postLikeDeleteInterface) => {
  try {
    const response: AxiosResponse = await api.delete(`${community}/posts/${post_id}/likes`, {
      headers: {
        'user-id': user_id,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(`게시글 좋아요 삭제 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const usePostLikeDelete = () => {
  return useMutation({
    mutationFn: postLikeDelete,
    onSuccess: () => {},
    onError: (error) => {
      console.error('게시글 좋아요 삭제 실패:', error);
    },
  });
};
