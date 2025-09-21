import api from '@/api/axiosInstance.ts';
import { memorial } from '@/config';
import { useMutation, useQuery } from '@tanstack/react-query';

type commitValue = { memorialId: number; content: string; userId: number };
type ApiResponse<T> = {
  message?: string;
  data?: T | null;
};
// user의 memorial commit 사항을 db에 저장하는 api
const postMemorialCommit = async ({
  memorialId,
  content,
  userId,
}: commitValue): Promise<ApiResponse<commitValue>> => {
  try {
    const data = {
      memorialId,
      content,
    };
    const response = await api.post(`:${memorial}/commit`, data, {
      headers: {
        'user-id': userId,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(`실패 : ${JSON.stringify(error.response.data)}`);
    throw error;
  }
};

export const usePostCommit = () => {
  return useMutation({
    mutationFn: postMemorialCommit,
    onSuccess: (e) => {
      console.log(e);
    },
    onError: () => {},
  });
};

//user의 memorial pull request 사항을 저장하는 api
const postMemorialPullRequest = async (data1, userId): Promise => {
  const data = data1;
  const response = await api.get(`:${memorial}/pull-request`, {
    headers: {
      'user-id': userId,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const usePostPullRequest = () => {
  return useMutation({
    mutationFn: postMemorialPullRequest,
    onSuccess: (e) => {
      console.log(e);
    },
    onError: () => {},
  });
};
//get commits
const getMemorialCommits = async (memorialId): Promise<void> => {
  const response = await api.get(`:${memorial}commits/${memorialId}`);
  return response.data;
};
export const useGetCommitsQuery = ({ memorialId }) => {
  return useQuery({
    queryKey: [],
    queryFn: () => getMemorialCommits({ memorialId }),
  });
};
//get commit by commitId
const getCommitById = async (commitId): Promise<void> => {
  const response = await api.get(`:${memorial}commits/id/${commitId}`);
  return response.data;
};
export const useGetCommitsByIdQuery = ({ commitId }) => {
  return useQuery({
    queryKey: [],
    queryFn: () => getCommitById({ commitId }),
  });
};
