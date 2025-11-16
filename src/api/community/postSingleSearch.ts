import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface postData {
  message: string;
  data: {
    postId: number;
    userId: string;
    name: string;
    profile: string;
    title: string;
    body: string;
    status: string;
    isBlind: boolean;
    createdAt: string;
    likesCount: number;
    viewCount: number;
    commentCount: number;
  };
}
const postSingleSearch = async (post_id: number) => {
  try {
    const response: AxiosResponse<postData> = await api.get(`${community}/posts/${post_id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('게시글 조회 실패:', error.message);
    }
    throw error;
  }
};

export const usePostSingleSearch = (post_id: number) => {
  return useQuery({
    queryKey: ['post', post_id],
    queryFn: () => postSingleSearch(post_id),
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh상태 유지
    gcTime: 10 * 60 * 1000, // 10분 동안 캐시 유지
  });
};
