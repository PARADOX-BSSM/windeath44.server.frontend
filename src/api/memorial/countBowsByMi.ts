import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { memorial } from '@/config';
import React from 'react';

type BowData = {
  message: string;
  data: number;
};
const memorialGet = async (memorialId: number): Promise<void> => {
  const response = await axios.get(`${memorial}/bow/${memorialId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const useMemorialGet = (setTotalBow: React.Dispatch<React.SetStateAction<BowData>>) => {
  return useMutation<BowData, Error, number>({
    mutationFn: memorialGet,
    onSuccess: (data: BowData) => {
      setTotalBow(data.data);
      console.log(data);
    },
    onError: (err: Error) => {
      alert('정보를 가져오는 중 문제가 발생했습니다!!\n 다시 시도해주세요!');
      console.log(err);
    },
  });
};
