import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import { memorial } from '@/config';
export type memorialData = {
  memorialId: number;
  characterId: number;
  chiefs: string[];
  bowCount: number;
  memorialCommitId: number;
  content: string;
  userId: string;
  createdAt: string;
  mergerId: string;
  updatedAt: string;
} | null;
export type memorialDataResponse = {
  message: string;
  data: memorialData;
};
const memorialGet = async (id: number): Promise<memorialDataResponse> => {
  const response = await axios.get(`${memorial}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const useMemorialGet = (
  setMemorialData: React.Dispatch<React.SetStateAction<memorialData>>,
) => {
  return useMutation<memorialDataResponse, Error, number>({
    mutationFn: memorialGet,
    onSuccess: (data: memorialDataResponse) => {
      setMemorialData(data.data);
    },
    onError: (err: Error) => {
      alert('정보를 가져오는 중 문제가 발생했습니다!!\n 다시 시도해주세요!');
      console.log(err);
    },
  });
};
