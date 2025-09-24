import api from '@/api/axiosInstance.ts';
import { memorial } from '@/config';
import { useMutation, useQuery } from '@tanstack/react-query';

type commitValue = { memorialId: number; content: string; userId: string };
type apiResponse<T> = {
  message?: string;
  data?: T | null;
};
// user의 memorial commit 사항을 db에 저장하는 api
const postMemorialCommit = async ({
  memorialId,
  content,
  userId,
}: commitValue): Promise<apiResponse<string>> => {
  try {
    const data = {
      memorialId,
      content,
    };
    const response = await api.post(`${memorial}/commit`, data, {
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
type pullRequestValue = { memorialCommitId: number };
//user의 memorial pull request 사항을 저장하는 api
const postMemorialPullRequest = async ({
  memorialCommitId,
}: pullRequestValue): Promise<apiResponse<string>> => {
  const data = {
    memorialCommitId: memorialCommitId,
  };
  const response = await api.post(`${memorial}/pull-request`, data, {
    headers: {
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
type commitRespone = {
  memorialCommitId: number;
  userId: string;
  memorialId: number;
  content: string;
  createdAt: string;
};
type memorialId = {
  memorialId: number;
};
//get commits
const getMemorialCommits = async ({
  memorialId,
}: memorialId): Promise<apiResponse<commitRespone>> => {
  const response = await api.get(`${memorial}commits/${memorialId}`);
  return response.data;
};
export const useGetCommitsQuery = ({ memorialId }: memorialId) => {
  return useQuery({
    queryKey: [],
    queryFn: () => getMemorialCommits({ memorialId }),
  });
};
type commitId = {
  commitId: number;
};
//get commit by commitId
const getCommitById = async ({ commitId }: commitId): Promise<apiResponse<commitRespone>> => {
  const response = await api.get(`${memorial}/commits/id/${commitId}`);
  return response.data;
};
export const useGetCommitsByIdQuery = ({ commitId }: commitId) => {
  return useQuery({
    queryKey: [],
    queryFn: () => getCommitById({ commitId }),
  });
};
