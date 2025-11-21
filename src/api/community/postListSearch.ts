import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface postListSearchInterface {
  user_id?: string;
  title?: string;
  isBlind?: boolean;
  characterId?: number;
  status?: string;
  mod?: string;
}
interface postListSearchResponse {
  message: string;
  data: {
    posts: {
      postId: number;
      userId: string;
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
const postListSearch = async ({
  user_id,
  title,
  isBlind,
  characterId,
  status,
  mod,
}: postListSearchInterface) => {
  const data = {
    title: title,
    is_blind: isBlind,
    character_id: characterId,
    status: status,
    mod: mod,
  };
  try {
    const response: AxiosResponse<postListSearchResponse> = await api.post(
      `${community}/posts/list`,
      data,
      {
        headers: {
          user_id: user_id,
        },
      },
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
