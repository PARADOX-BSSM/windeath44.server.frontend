import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface PostDeleteInterface {
  post_id: number;
  user_id: string;
}

const postDelete = async ({ post_id, user_id }: PostDeleteInterface) => {
  try {
    const response: AxiosResponse = await api.delete(`${community}/posts/${post_id}`, {
      headers: {
        'user-id': user_id,
        role: '',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log('게시글 삭제 실패', error);
    }
    throw error;
  }
};

export const usePostDelete = () => {
  return useMutation({
    mutationFn: postDelete,
    onSuccess: () => {},
    onError: () => {},
  });
};
