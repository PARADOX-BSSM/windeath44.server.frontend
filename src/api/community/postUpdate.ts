import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface PostUpdateInterface {
  postId: number;
  title: string;
  body: string;
  status: string;
  isBlind: boolean;
}

interface PostUpdateResponse {
  message: string;
  data: {
    postId: number;
    userId: string;
    name: string;
    profile: string;
    characterId: number;
    title: string;
    body: string;
    status: string;
    isBlind: boolean;
    createdAt: string;
    updatedAt: string;
    viewCount: number;
    likesCount: number;
  };
}

const postUpdate = async ({ postId, title, body, status, isBlind }: PostUpdateInterface) => {
  const data = {
    title: title,
    body: body,
    status: status,
    isBlind: isBlind,
  };
  try {
    const response: AxiosResponse<PostUpdateResponse> = await api.patch(
      `${community}/posts/${postId}`,
      data,
    );
    console.log(data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log('게시글 수정 실패');
    }
    throw error;
  }
};

export const usePostUpdate = () => {
  return useMutation({
    mutationFn: postUpdate,
    onSuccess: () => {
      console.log('게시글 수정 성공');
    },
    onError: () => {},
  });
};
