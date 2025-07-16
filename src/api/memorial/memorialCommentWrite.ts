import api from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { memorial } from '@/config';
import { AxiosResponse } from 'axios';

interface commentData {
  memorialId: number;
  content: string;
  parentCommentId?: number; //답글의 상위 댓글id
}

const commentWrite = async ({ memorialId, content, parentCommentId }: commentData) => {
  const data = { memorialId, content, parentCommentId };
  const response: AxiosResponse = await api.post(`${memorial}/comment${memorialId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const useCommentWrite = () => {
  return useMutation({
    mutationFn: commentWrite,
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
