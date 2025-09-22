import api from '@/api/axiosInstance.ts';
import { memorial } from '@/config';
import { useMutation, useQuery } from '@tanstack/react-query';

type apiResponse<T> = {
  message?: string;
  data?: T | null;
};
type mergeableRequest = {
  memorialPullRequestId: number;
  userId: number;
};
type mergeableResponse = {
  memorialPullRequestId: number;
  latestMemorialPullRequestId: number | null;
  mergeable: boolean;
  conflict: string | null;
};
// chief mergeable
const postMemorialMergeable = async ({
  memorialPullRequestId,
  userId,
}: mergeableRequest): Promise<apiResponse<mergeableResponse>> => {
  const data = memorialPullRequestId;
  const response = await api.post(`:${memorial}/mergeable`, data, {
    headers: {
      'user-id': userId,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const usePostMergeable = () => {
  return useMutation({
    mutationFn: postMemorialMergeable,
    onSuccess: (e) => {
      console.log(e);
    },
    onError: () => {},
  });
};
// chief merge
const postMemorialMerge = async ({
  memorialPullRequestId,
  userId,
}: mergeableRequest): Promise<apiResponse<string>> => {
  const data = memorialPullRequestId;
  const response = await api.patch(`:${memorial}/merge`, data, {
    headers: {
      'user-id': userId,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
export const usePatchMerge = () => {
  return useMutation({
    mutationFn: postMemorialMerge,
    onSuccess: (e) => {
      console.log(e);
    },
    onError: () => {},
  });
};

// chief resolve
type resolveRequest = {
  memorialPullRequestId: number;
  userId: number;
  resolved: string;
};
const postMemorialResolve = async ({
  memorialPullRequestId,
  userId,
  resolved,
}: resolveRequest): Promise<apiResponse<object>> => {
  const data = {
    memorialPullRequestId,
    resolved,
  };
  const response = await api.patch(`:${memorial}/resolve`, data, {
    headers: {
      'user-id': userId,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
export const usePatchMemorialResolve = () => {
  return useMutation({
    mutationFn: postMemorialResolve,
    onSuccess: (e) => {
      console.log(e);
    },
    onError: () => {},
  });
};

// chief reject
type memorialPullRequestId = {
  memorialPullRequestId: number;
};
const postMemorialReject = async ({
  memorialPullRequestId,
}: memorialPullRequestId): Promise<apiResponse<object>> => {
  const data = memorialPullRequestId;
  const response = await api.patch(`:${memorial}/reject`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
export const usePatchMemorialReject = () => {
  return useMutation({
    mutationFn: postMemorialReject,
    onSuccess: (e) => {
      console.log(e);
    },
    onError: () => {},
  });
};
// chief get prs by memorial id
type memorialId = {
  memorialId: number;
};
const getPullRequestsByMemorialId = async ({ memorialId }: memorialId): Promise<object> => {
  const response = await api.get(`:${memorial}/pull-requests/${memorialId}`);
  return response.data;
};
export const useGetPrsQuery = ({ memorialId }: memorialId) => {
  return useQuery({
    queryKey: [],
    queryFn: () => getPullRequestsByMemorialId({ memorialId }),
  });
};
// chief get pr by request id
type requestId = {
  requestId: number;
};
const getPullRequestByRequestId = async ({ requestId }: requestId): Promise<object> => {
  const response = await api.patch(`:${memorial}/pull-request/${requestId}`);
  return response.data;
};
export const useGetPrQuery = ({ requestId }: requestId) => {
  return useQuery({
    queryKey: [],
    queryFn: () => getPullRequestByRequestId({ requestId }),
  });
};
