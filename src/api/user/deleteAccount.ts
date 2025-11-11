import { useMutation } from '@tanstack/react-query';
import { user } from '@/config';
import api from '@/api/axiosInstance.ts';

interface responseParams {
  message: string;
  data: null;
}
const deleteAccount = async (id: string): Promise<responseParams> => {
  const data = { 'user-id': id };
  return await api.delete(`${user}`, {
    headers: data,
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
  });
};
