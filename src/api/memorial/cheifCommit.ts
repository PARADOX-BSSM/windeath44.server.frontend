import api from '@/api/axiosInstance.ts';
import { memorial } from '@/config';
import { useMutation, useQuery } from '@tanstack/react-query';

// chief mergeable
const postMemorialMergeable = async (memorialPullRequestId, userId): Promise<> => {
  const data = memorialPullRequestId;
  const response = await api.post(`:${memorial}/mergeable`, {
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
const postMemorialMerge = async (memorialPullRequestId, userId): Promise<> => {
  const data = memorialPullRequestId;
  const response = await api.patch(`:${memorial}/merge`, {
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
const postMemorialResolve = async (memorialPullRequestId, userId): Promise<> => {
  const data = memorialPullRequestId;
  // memorialPullRequestId;
  // resolved;
  const response = await api.patch(`:${memorial}/resolve`, {
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
const postMemorialReject = async (memorialPullRequestId, userId): Promise<> => {
  const data = memorialPullRequestId;
  const response = await api.patch(`:${memorial}/reject`, {
    headers: {
      'user-id': userId,
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
const getPullRequestsByMemorialId = async (memorialId): Promise<> => {
  const response = await api.patch(`:${memorial}/pull-requests/${memorialId}`);
  return response.data;
};
export const useGetPrsQuery = ({ memorialId }) => {
  return useQuery({
    queryKey: [],
    queryFn: () => getPullRequestsByMemorialId({ memorialId }),
  });
};
// chief get pr by request id
const getPullRequestByRequestId = async (requestId): Promise<> => {
  const response = await api.patch(`:${memorial}/pull-request/${requestId}`);
  return response.data;
};
export const useGetPrQuery = ({ requestId }) => {
  return useQuery({
    queryKey: [],
    queryFn: () => getPullRequestByRequestId({ requestId }),
  });
};
