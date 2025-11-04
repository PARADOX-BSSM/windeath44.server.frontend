import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

const postDelete = async (post_id: number) => {
  try {
    const response: AxiosResponse = await api.delete(`${community}/posts/${post_id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log('게시글 삭제 실패', Error);
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
