import { useMutation } from '@tanstack/react-query';
import { user } from '@/config';
import axios from 'axios';

interface responseParams {
  message: string;
  data: null;
}
const deleteAccount = async (id:string): Promise<responseParams> => {
  const data = { 'user-id': id };
  return (await axios.delete(`${user}`,{
    headers:data
  }));
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
  });
};
