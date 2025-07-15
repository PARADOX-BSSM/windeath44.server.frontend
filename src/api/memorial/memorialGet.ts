import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { memorial } from '@/config';
const memorialGet = async (id: number): Promise<void> => {
  const response = await axios.get(`${memorial}/${id}`, {
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
};

export const useMemorialGet = () => {
  return useMutation({
    mutationFn: memorialGet,
  });
};
