import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { memorial } from '@/config';
type memorialData = {
  data: string | number[];
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
};
const memorialGet = async (id: number): Promise<memorialData> => {
  const response = await axios.get(`${memorial}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const useMemorialGet = () => {
  return useMutation<memorialData, Error, number>({
    mutationFn: memorialGet,
  });
};
