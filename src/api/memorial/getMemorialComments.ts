import axios from 'axios';
import { memorial } from '@/config';
import { useMutation } from '@tanstack/react-query';
import * as console from 'node:console';
import React from 'react';

type commentData = {
  memorialId: number;
  cursorId: number;
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
type MemorialCommentsResponse = {
  message: string;
  data: MemorialCommentsData[];
};
const getMemorialComments = async ({
  memorialId,
  cursorId,
  size = 10,
}: commentData): Promise<MemorialCommentsResponse> => {
  const response = await axios.get(`${memorial}/comment/${memorialId}`, {
    params: {
      ...(cursorId != null ? { cursorId } : {}),
      size,
    },
    withCredentials: true,
  });
  return response.data;
};
export const useGetMemorialComments = (
  setCharacterData: React.Dispatch<React.SetStateAction<CharacterData>>,
) => {
  return useMutation<MemorialCommentsResponse, Error, commentData>({
    mutationFn: getMemorialComments,
    onSuccess: (data: MemorialCommentsResponse) => {},
    onError: (err: Error) => {
      alert('정보를 가져오는 중 문제가 발생했습니다!!\n 다시 시도해주세요!');
      console.log(err);
    },
  });
};
