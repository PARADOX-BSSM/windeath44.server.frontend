import { useMutation } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { memorial } from '@/config';

// Mergeable 체크 API 타입
export interface CheckMergeableRequest {
  memorialPullRequestId: number;
}

export interface CheckMergeableResponse {
  message: string;
  data: {
    memorialPullRequestId: number;
    latestMemorialPullRequestId: number | null;
    mergeable: boolean;
    conflict: string | null;
  };
}

// 실제 병합 API 타입
export interface MergeRequest {
  memorialPullRequestId: number;
}

export interface MergeResponse {
  message: string;
  data: any;
}

// 충돌 해결 API 타입
export interface ResolveRequest {
  memorialPullRequestId: number;
  resolved: string;
}

export interface ResolveResponse {
  message: string;
  data: any;
}

// Mergeable 체크 API
export const checkMergeable = async (request: CheckMergeableRequest): Promise<CheckMergeableResponse> => {
  const response = await api.post(`${memorial}/mergeable`, request, {});
  return response.data;
};

// 실제 병합 API
export const mergeMemorialPullRequest = async (request: MergeRequest): Promise<MergeResponse> => {
  const response = await api.patch(`${memorial}/merge`, request, {});
  return response.data;
};

// 충돌 해결 API
export const resolveMemorialPullRequest = async (request: ResolveRequest): Promise<ResolveResponse> => {
  const response = await api.patch(`${memorial}/resolve`, request, {});
  return response.data;
};

// Mergeable 체크 훅
export const useCheckMergeableMutation = () => {
  return useMutation({
    mutationFn: checkMergeable,
    onSuccess: (data) => {
      console.log('Mergeable 체크 완료:', data);
    },
    onError: (error) => {
      console.error('Mergeable 체크 실패:', error);
    },
  });
};

// 병합 실행 훅
export const useMergeMemorialPullRequestMutation = () => {
  return useMutation({
    mutationFn: mergeMemorialPullRequest,
    onSuccess: (data) => {
      console.log('병합 성공:', data);
    },
    onError: (error) => {
      console.error('병합 실패:', error);
    },
  });
};

// 충돌 해결 훅
export const useResolveMemorialPullRequestMutation = () => {
  return useMutation({
    mutationFn: resolveMemorialPullRequest,
    onSuccess: (data) => {
      console.log('충돌 해결 성공:', data);
    },
    onError: (error) => {
      console.error('충돌 해결 실패:', error);
    },
  });
};