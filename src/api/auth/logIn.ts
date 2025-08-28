import { AxiosError, AxiosResponse } from 'axios';
import api from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { auth } from '@/config';

interface authParams {
  id: string;
  password: string;
}

const logIn = async ({ id, password }: authParams): Promise<string> => {
  const data = { userId: id, password };
  try {
    const response: AxiosResponse = await api.post(`${auth}/login`, data, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response.headers);

    const authorization: string | undefined = response.headers['authorization'];

    if (!authorization) {
      throw new Error('accessToken 없음');
    }
    localStorage.setItem('access_token', authorization);
    return authorization;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.headers) {
      alert(`로그인 실패: 다시 입력해 주세요!`);
      console.log(`로그인 실패: ${JSON.stringify(axiosError.response.headers)}`);
    } else {
      alert('로그인 중 오류가 발생했습니다.');
    }
    throw error;
  }
};

export const useLogIn = () => {
  return useMutation({
    mutationFn: logIn,
  });
};
