import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface postListSearchInterface {
  title?: string;
  is_blind?: boolean;
  character_id?: number;
  status?: string;
}

const postListSearch = async ({
  title,
  is_blind,
  character_id,
  status,
}: postListSearchInterface) => {
  const data = JSON.stringify({
    title: title,
    is_blind: is_blind,
    character_id: character_id,
    status: status,
  });
  try {
    const response: AxiosResponse = await api.post(`${community}/posts/list`, data);
    console.log(data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log('게시글 불러오기 실패');
    }
    throw error;
  }
};

export const usePostListSearch = () => {
  return useMutation({
    mutationFn: postListSearch,
    onSuccess: () => {
      console.log('게시글 불러오기 성공');
    },
    onError: () => {},
  });
};
