import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

const postCommentListSearch = async (post_id: number) => {
  try {
    const response: AxiosResponse = await api.get(`${community}/posts/${post_id}/comments`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log('댓글 조회가 실패했습니다: ', error.data);
    }
    throw Error;
  }
};

export const usePostCommentListSearch = (post_id: number) => {
  return useQuery({
    queryKey: ['postComment', post_id],
    queryFn: () => postCommentListSearch,
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh상태 유지
    gcTime: 10 * 60 * 1000, // 10분 동안 캐시 유지
  });
};
