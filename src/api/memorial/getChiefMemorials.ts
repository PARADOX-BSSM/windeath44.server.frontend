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
// console.log('API 요청 URL:', `${memorial}/chiefs/my`);
  try {
    const response = await api.get(`${memorial}/chiefs/my`, {});
// console.log('API 성공 응답:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('API 에러 상세:', error.response?.data || error.message);
    console.error('요청 헤더:', error.config?.headers);
    throw error;
  }
};

// React Query Hook
export const useGetMyChiefMemorialsQuery = () => {
  return useQuery({
    queryKey: ['myChiefMemorials'],
    queryFn: fetchMyChiefMemorials,
    staleTime: 30 * 1000, // 30초간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    retry: false, // 400 에러 시 재시도 중단
  });
};
