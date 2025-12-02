import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { judgement } from '@/config';
import api from '../axiosInstance';

const judgmentSearchTop = async () => {
  try {
    const response: AxiosResponse = await api.get(`${judgement}/rank`);
    return response;
  } catch (error) {
    console.error('상위 3개 재판 조회 실패:', error);
    throw error;
  }
};

export const useJudgmentSearchTop = () => {
  return useQuery({
    queryKey: ['judgementSearchTop'],
    queryFn: () => judgmentSearchTop(),
    staleTime: 10 * 60 * 1000, // 10분 동안 fresh상태 유지
    gcTime: 15 * 60 * 1000, // 15분 동안 캐시 유지
  });
};
