import { useMutation } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { memorial } from '@/config';

// Pull Request Diff 조회 API 타입
export interface GetPullRequestDiffRequest {
  memorialPullRequestId: number;
}

export interface GetPullRequestDiffResponse {
  message: string;
  data: {
    memorialPullRequestId: number;
    diffContent: string;
    hasConflicts: boolean;
    userId: string;
    createdAt: string;
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

// Pull Request Diff 조회 API
export const getPullRequestDiff = async (request: GetPullRequestDiffRequest): Promise<GetPullRequestDiffResponse> => {
  const response = await api.get(`${memorial}/pull-request/${request.memorialPullRequestId}/diff`, {});
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

// Pull Request Diff 조회 훅
export const useGetPullRequestDiffMutation = () => {
  return useMutation({
    mutationFn: getPullRequestDiff,
    onSuccess: (data) => {
// console.log('PR Diff 조회 완료:', data);
    },
    onError: (error) => {
      console.error('PR Diff 조회 실패:', error);
    },
  });
};

// 병합 실행 훅
export const useMergeMemorialPullRequestMutation = () => {
  return useMutation({
    mutationFn: mergeMemorialPullRequest,
    onSuccess: (data) => {
// console.log('병합 성공:', data);
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
// console.log('충돌 해결 성공:', data);
    },
    onError: (error) => {
      console.error('충돌 해결 실패:', error);
    },
  });
};