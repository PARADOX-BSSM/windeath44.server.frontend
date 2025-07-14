import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { user } from '@/config';

const fetchUser = async (userId: string): Promise<AxiosResponse> => {
  return await axios.get(`${user}/profile`, {
    headers: {
      'user-id': userId,
    },
    withCredentials: true,
  });
};

export const useGetUserMutation = () => {
  return useMutation({
    mutationFn: (userId: string) => fetchUser(userId),
  });
};
