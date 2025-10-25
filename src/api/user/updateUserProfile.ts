import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { user } from '@/config';
import api from '@/api/axiosInstance';

interface UpdateProfileParams {
  name?: string;
  profile?: string; // base64 encoded image
}

const updateUserProfile = async (params: UpdateProfileParams): Promise<AxiosResponse> => {
  return await api.patch(`${user}/profile`, params);
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: (params: UpdateProfileParams) => updateUserProfile(params),
  });
};
