import axios from 'axios';
import { memorial } from '@/config';
import { useMutation } from '@tanstack/react-query';

type commentData = {
  memorialId: number;
  cursorId: number;
  size?: number;
};
const getMemorialComments = async ({
  memorialId,
  cursorId,
  size = 10,
}: commentData): Promise<commentData> => {
  const response = await axios.get(`${memorial}/comment/${memorialId}`, {
    params: {
      ...(cursorId != null ? { cursorId } : {}),
      size,
    },
    withCredentials: true,
  });
  return response.data;
};
export const useGetMemorialComments = () => {
  return useMutation({
    mutationFn: getMemorialComments,
    onSuccess: (data) => {
      console.log('코멘트', data.data);
    },
    onError: (data) => {
      console.log(data);
    },
  });
};
