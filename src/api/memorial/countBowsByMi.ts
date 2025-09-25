import { useMutation } from '@tanstack/react-query';
import { memorial } from '@/config';
import React from 'react';
import api from '@/api/axiosInstance.ts';

type BowData = {
  message: string;
  data: number;
};
const memorialGet = async (memorialId: number): Promise<void> => {
  const response = await api.get(`${memorial}/bow/${memorialId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const useMemorialGet = (setTotalBow: React.Dispatch<React.SetStateAction<number | null>>) => {
  return useMutation<BowData, Error, number>({
    mutationFn: memorialGet,
    onSuccess: (data: BowData) => {
      setTotalBow(data.data);
      // console.log(data);
    },
    onError: (err: Error) => {
      console.log(err);
    },
  });
};
