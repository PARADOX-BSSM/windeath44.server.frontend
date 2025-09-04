import api from '@/api/axiosInstance.ts';
import { memorial } from '@/config';

// user의 memorial commit 사항을 db에 저장하는 api
const postMemorialCommit = async (data, userId): Promise<> => {
  const data = data;
  const response = await api.get(`:${memorial}/commit`, {
    headers: {
      'user-id': userId,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
//user의 memorial pull request 사항을 저장하는 api
const postMemorialPullRequest = async (memorialPullRequestId, userId): Promise<> => {
  const memorialPullRequestId = memorialPullRequestId;
  const response = await api.get(`:${memorial}/pull-request`, {
    headers: {
      'user-id': userId,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
//get commit
//get commits
