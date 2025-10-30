import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { memorial_application } from '@/config';

// Memorial Application 데이터 타입
export interface MemorialApplicationData {
  userId: string;
  characterId: number;
  content: string;
  createdAt: string;
  state: string;
  likes: number;
  memorialApplicationId: number;
}

export interface MemorialApplicationsResponse {
  message: string;
  data: {
    values: MemorialApplicationData[];
    hasNext: boolean;
  };
}

// 내 추모관 신청 목록 조회
export const fetchMyMemorialApplications = async (
  cursorId?: number,
  size: number = 10,
): Promise<MemorialApplicationsResponse> => {
  const params: any = { size };
  if (cursorId !== undefined) {
    params.cursorId = cursorId;
  }

  const response = await api.get(`${memorial_application}/my`, {
    params,
    withCredentials: true,
  });
  return response.data;
};

// React Query Hook
export const useGetMyMemorialApplicationsQuery = (cursorId?: number, size: number = 10) => {
  return useQuery({
    queryKey: ['myMemorialApplications', cursorId, size],
    queryFn: () => fetchMyMemorialApplications(cursorId, size),
    staleTime: 2 * 60 * 1000, // 2분간 fresh 상태 유지
    gcTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};
