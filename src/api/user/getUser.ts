import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { user } from '@/config';

const fetchUser = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${user}/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    withCredentials: true,
  });

  return response.data;
};

export const useGetUserMutation = () => {
  return useMutation({
    mutationFn: () => fetchUser(),
  });
};
