import api from '@/api/axiosInstance.ts';
import { memorial } from '@/config';

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
// chief get prs by memorial id
const getPullRequestsByMemorialId = async (memorialId): Promise<> => {
  const response = await api.patch(`:${memorial}/pull-requests/${memorialId}`);
  return response.data;
};
// chief get pr by request id
const getPullRequestByRequestId = async (requestId): Promise<> => {
  const response = await api.patch(`:${memorial}/pull-request/${requestId}`);
  return response.data;
};
