import { AxiosResponse } from 'axios';
import api from '../axiosInstance';
import { judgement } from '@/config';
import { useMutation } from '@tanstack/react-query';

const getJudgementList = async () => {
  try {
    const response: AxiosResponse = await api.post(
      `${judgement}/list`,
      {},
      { headers: { 'Content-Type': 'application/json' } },
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(JSON.stringify(error.response.data));
    }
    console.log('재판 목록 불러오기 실패');
    throw error;
  }
};

export const useGetJudgementList = () => {
  return useMutation({
    mutationFn: getJudgementList,
    onSuccess: (data) => {
      console.log('성공:', data);
    },
    onError: (error) => {
      console.log('실패:', error);
    },
  });
};
