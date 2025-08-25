import axios from 'axios';
import { memorial } from '@/config';
import { useMutation } from '@tanstack/react-query';

type memorialChiefs = {
  message: string;
  data: string[];
};
type memorialVar = {
  memorialId: number;
};

const getMemorialChiefs = async ({ memorialId }: memorialVar): Promise<memorialChiefs> => {
  const response = await axios.get(`${memorial}/chiefs/${memorialId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const useMemorialChiefs = ({ memorialId }: memorialVar) => {
  return useMutation({
    mutationFn: () => getMemorialChiefs(memorialId),
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
