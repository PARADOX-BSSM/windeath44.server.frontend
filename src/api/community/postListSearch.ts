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
  mode?: string;
  role?: string;
  page?: number;
  size?: number;
}
interface postListSearchResponse {
  message: string;
  data: {
    content: {
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
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
      };
      offset: number;
      unpaged: boolean;
      paged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  };
}
const postListSearch = async ({
  user_id,
  title,
  isBlind,
  characterId,
  status,
  mode,
  role,
  page,
  size,
}: postListSearchInterface) => {
  const data = {
    title: title,
    is_blind: isBlind,
    character_id: characterId,
    status: status,
    mode: mode,
    page: page,
    size: size,
  };
  try {
    const response: AxiosResponse<postListSearchResponse> = await api.post(
      `${community}/posts/list`,
      data,
      {
        headers: {
          'user-id': user_id,
          role: role,
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
