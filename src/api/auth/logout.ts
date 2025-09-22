import { AxiosError, AxiosResponse } from 'axios';
import api from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { auth } from '@/config';

const logOut = async (): Promise<string> => {
  try {
    const response: AxiosResponse = await api.post(`${auth}/logout`, {}, { withCredentials: true });
    console.log(response.headers);

    return '성공';
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.headers) {
      console.log(`로그아웃 실패: ${JSON.stringify(axiosError.response.headers)}`);
    }
    throw error;
  }
};

export const useLogOut = () => {
  return useMutation({
    mutationFn: logOut,
  });
};
