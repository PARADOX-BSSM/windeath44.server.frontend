import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface postListSearchInterface {
  title?: string;
  isBlind?: boolean;
  characterId?: number;
  status?: string;
}

const postListSearch = async ({ title, isBlind, characterId, status }: postListSearchInterface) => {
  const data = {
    title: title,
    is_blind: isBlind,
    character_id: characterId,
    status: status,
  };
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
