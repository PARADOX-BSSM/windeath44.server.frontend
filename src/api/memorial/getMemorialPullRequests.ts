import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { memorial } from '@/config';

// Memorial Pull Request 데이터 타입
export interface MemorialPullRequestData {
  memorialPullRequestId: number;
  userId: string;
  memorialCommit: {
    memorialCommitId: number;
    userId: string;
    memorial: {
      memorialId: number;
      characterId: number;
      bowCount: number;
    };
  };
  memorial: {
    memorialId: number;
    characterId: number;
    bowCount: number;
  };
  state: string;
  updatedAt: string;
}

export interface MemorialPullRequestsResponse {
  message: string;
  data: MemorialPullRequestData[];
}

// 특정 추도관의 풀 리퀘스트 목록 조회
export const fetchMemorialPullRequests = async (memorialId: number): Promise<MemorialPullRequestsResponse> => {
  const response = await api.get(`${memorial}/pull-requests/${memorialId}`, {});
  return response.data;
};

// React Query Hook
export const useGetMemorialPullRequestsQuery = (memorialId: number) => {
  return useQuery({
    queryKey: ['memorialPullRequests', memorialId],
    queryFn: () => fetchMemorialPullRequests(memorialId),
    enabled: !!memorialId, // memorialId가 있을 때만 쿼리 실행
    staleTime: 2 * 60 * 1000, // 2분간 fresh 상태 유지
    gcTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};