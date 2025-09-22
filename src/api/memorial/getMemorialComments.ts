import { memorial } from '@/config';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import api from '@/api/axiosInstance.ts';

type commentData = {
  memorialId: number;
  cursorId?: number;
  size?: number;
};
export type MemorialCommentsData = {
  commentId: number;
  memorialId: number;
  userId: string;
  content: string;
  likes: number;
  isLiked: boolean;
  parentId: number;
  createdAt: string;
};
type CommentMain = {
  hasNext: boolean;
  data: MemorialCommentsData[];
};
type MemorialCommentsResponse = {
  message: string;
  data: CommentMain;
};
const getMemorialComments = async ({
  memorialId,
  cursorId,
  size = 10,
}: commentData): Promise<MemorialCommentsResponse> => {
  const response = await api.get(`${memorial}/comment/${memorialId}`, {
    params: {
      ...(cursorId != null ? { cursorId } : {}),
      size,
    },
  });
  return response.data;
};
export const useGetMemorialComments = (
  setMemorialComment: React.Dispatch<React.SetStateAction<MemorialCommentsData[]>>,
) => {
  return useMutation<MemorialCommentsResponse, Error, commentData>({
    mutationFn: getMemorialComments,
    onSuccess: (data: MemorialCommentsResponse) => {
      console.log('onSuccess data', data.data.data);
      setMemorialComment(data.data.data);
    },
    onError: (err: unknown) => {
      console.error('댓글 조회 실패', err);
    },
  });
};
