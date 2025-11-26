import { useMutation } from '@tanstack/react-query';
import { memorial } from '@/config';
import api from '@/api/axiosInstance.ts';
import { memorialUserIdResponse, memorialUserIdVar } from '@/modules/interface.ts';
import { AxiosError } from 'axios';

const memorialBow = async (memorialId: number) => {
  const response = await api.post(`${memorial}/bow`, { memorialId });
  return response.data;
};

export const useMemorialBow = () => {
  return useMutation<unknown, AxiosError<{ remainTime?: string }>, number>({
    mutationFn: memorialBow,
  });
};

const getBowByUserId = async ({
  memorialId,
  userId,
}: memorialUserIdVar): Promise<memorialUserIdResponse> => {
  const response = await api.get(`${memorial}/bow/${userId}/${memorialId}`, {});
  return response.data;
};

export const useGetBowByUserId = () => {
  return useMutation({
    mutationFn: getBowByUserId,
    onSuccess: (data: any) => {
      console.log('useGetBowByUserId', data);
    },
  });
};
