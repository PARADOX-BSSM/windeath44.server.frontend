import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { judgement } from '@/config';
import api from '../axiosInstance';

interface JudgmentRank {
  characterId: number;
  rank: number;
}

interface JudgmentSearchTopResponse {
  message: string;
  data: {
    content: JudgmentRank[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  };
}

const judgmentSearchTop = async () => {
  try {
    const response: AxiosResponse<JudgmentSearchTopResponse> = await api.get(`${judgement}/rank`);
    return response.data;
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
