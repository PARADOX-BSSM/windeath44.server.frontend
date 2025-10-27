import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { user } from '@/config';
import api from '@/api/axiosInstance';

interface UpdateNameParams {
  name: string;
}

const updateUserName = async (params: UpdateNameParams): Promise<AxiosResponse> => {
  return await api.patch(`${user}/change/name`, params);
};

export const useUpdateUserName = () => {
  return useMutation({
    mutationFn: (params: UpdateNameParams) => updateUserName(params),
  });
};
