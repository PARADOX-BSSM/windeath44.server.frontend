import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { user } from '@/config';
import api from '@/api/axiosInstance';

const fetchUser = async (): Promise<AxiosResponse> => {
  return (await api.get(`${user}/profile`)).data;
};

export const useGetUserMutation = () => {
  return useMutation({
    mutationFn: () => fetchUser(),
  });
};
