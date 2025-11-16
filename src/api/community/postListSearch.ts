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
interface postListSearchResponse {
  message: string;
  data: {
    content: {
      postId: number;
      userId: string;
      name: string;
      profile: string | null;
      title: string;
      body: string;
      status: string;
      isBlind: boolean;
      createdAt: string;
      updatedAt: string;
      viewsCount: number;
      likesCount: number;
      postCommentCount: number;
    }[];
  };
}
const postListSearch = async ({ title, isBlind, characterId, status }: postListSearchInterface) => {
  const data = {
    title: title,
    is_blind: isBlind,
    character_id: characterId,
    status: status,
  };
  try {
    const response: AxiosResponse<postListSearchResponse> = await api.post(
      `${community}/posts/list`,
      data,
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log('게시글 불러오기 실패:', error.response.data);
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
