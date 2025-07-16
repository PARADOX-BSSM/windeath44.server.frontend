import axios from 'axios';
import { memorial } from '@/config';
import { useQuery } from '@tanstack/react-query';
import * as console from 'node:console';

type commentData = {
  memorialId: number;
  cursorId: number;
  size?: number;
};

type MemorialCommentsResponse = {
  data: [];
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
export const useGetMemorialComments = ({ memorialId, cursorId, size }: commentData) => {
  // return useQuery<MemorialCommentsResponse, Error>({
  //   queryKey: ['memorialComments', memorialId, cursorId, size],
  //   queryFn: () => getMemorialComments({ memorialId, cursorId, size }),
  //   onSuccess: (data: MemorialCommentsResponse) => {
  //     console.log('코멘트', data.data);
  //   },
  //   onError: (err: Error) => {
  //     console.log(err);
  //   },
  // });
  return undefined;
};
