import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

const postSingleSearch = async (post_id: number) => {
  try {
    const response: AxiosResponse = await api.get(`${community}/posts/${post_id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log('게시글 조회 실패: ', error.data);
    }
    throw Error;
  }
};

export const usePostSingleSearch = (post_id: number) => {
  useQuery({
    queryKey: ['post', post_id],
    queryFn: () => postSingleSearch,
  });
};
