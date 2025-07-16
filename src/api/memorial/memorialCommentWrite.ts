import { useMutation } from '@tanstack/react-query';
import { memorial } from '@/config';
import axios, { AxiosResponse } from 'axios';

interface commentData {
  memorialId: number;
  content: string;
  parentCommentId?: number; //답글의 상위 댓글id
}

const commentWrite = async ({ memorialId, content, parentCommentId }: commentData) => {
  try {
    const data = { memorialId, content, parentCommentId };
    const response: AxiosResponse = await axios.post(`${memorial}/comment/${memorialId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    localStorage.setItem('data', JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    console.error('댓글 작성 중 오류:', err);
    localStorage.setItem('error', JSON.stringify(err));
    throw err;
  }
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
