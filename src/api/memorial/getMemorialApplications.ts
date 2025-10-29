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

// 추모관 신청 목록 조회 (모든 사람의 신청)
export const fetchMemorialApplications = async (
  cursorId?: number,
  size: number = 10,
  memorizingCode?: number, // 10: APPROVED, 20: REJECTED, 30: PENDING
): Promise<MemorialApplicationsResponse> => {
  const params: any = { size };
  if (cursorId !== undefined) {
    params.cursorId = cursorId;
  }
  if (memorizingCode !== undefined) {
    params.memorizingCode = memorizingCode;
  }

  const response = await api.get(`${memorial_application}`, {
    params,
    withCredentials: true,
  });
  return response.data;
};

// React Query Hook
export const useGetMemorialApplicationsQuery = (
  cursorId?: number,
  size: number = 10,
  memorizingCode?: number,
) => {
  return useQuery({
    queryKey: ['memorialApplications', cursorId, size, memorizingCode],
    queryFn: () => fetchMemorialApplications(cursorId, size, memorizingCode),
    staleTime: 2 * 60 * 1000, // 2분간 fresh 상태 유지
    gcTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};
