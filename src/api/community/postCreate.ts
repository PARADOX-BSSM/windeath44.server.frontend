import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface postCreateInterface {
  user_id: string;
  characterId?: number;
  title: string;
  body: string;
  status: string;
  isBlind?: boolean;
}

const postCreate = async ({
  user_id,
  characterId,
  title,
  body,
  status,
  isBlind,
}: postCreateInterface) => {
  const data = JSON.stringify({
    characterId: characterId,
    title: title,
    body: body,
    status: status,
    isBlind: isBlind,
  });
  try {
    const response: AxiosResponse = await api.post(`${community}/posts`, data, {
      headers: {
        'user-id': user_id,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(`게시글 작성 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const usePostCreate = () => {
  return useMutation({
    mutationFn: postCreate,
    onSuccess: () => {
      console.log('게시글 작성 완료');
    },
    onError: (error) => {
      console.error('게시글 작성 실패:', error);
    },
  });
};
