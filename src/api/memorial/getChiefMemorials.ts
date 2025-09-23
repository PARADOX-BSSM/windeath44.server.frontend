import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { memorial } from '@/config';

// API 문서에 따른 응답 타입 (string 배열)
export interface ChiefMemorialsResponse {
  message: string;
  data: string[];
}

// 현재 로그인한 사용자가 상주인 추모관 ID 목록 조회
export const fetchMyChiefMemorials = async (): Promise<ChiefMemorialsResponse> => {
  const response = await api.get(`${memorial}/chiefs/my`, {});
  return response.data;
};

// React Query Hook
export const useGetMyChiefMemorialsQuery = () => {
  return useQuery({
    queryKey: ['myChiefMemorials'],
    queryFn: fetchMyChiefMemorials,
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
};
