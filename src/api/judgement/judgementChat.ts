import { AxiosResponse } from 'axios';
import api from '../axiosInstance';
import { judgement } from '@/config';
import { useMutation } from '@tanstack/react-query';

interface getJudgementChatsProps {
  judgement_id: number;
}

const getJudgementChats = async ({ judgement_id }: getJudgementChatsProps) => {
  try {
    const response: AxiosResponse = await api.get(`${judgement}/${judgement_id}/comments`, {
      headers: { 'user-id': 'test' },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(JSON.stringify(error.response.data));
    }
    console.log('댓글 목록 불러오기 실패');
    throw error;
  }
};

export const useGetJudgementChats = () => {
  return useMutation({
    mutationFn: getJudgementChats,
    onSuccess: (data) => {
      console.log('댓글 불러오기 성공:', data);
    },
    onError: (error) => {
      console.log('실패:', error);
    },
  });
};
