import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { auth } from '@/config';
import api from '@/api/axiosInstance.ts';
interface authParams {
  email: string;
  check: string;
}
export const verifyEmailCode = async ({ email, check }: authParams): Promise<boolean> => {
  const data = {
    authorizationCode: check,
    email,
  };
  try {
    await api.patch(`${auth}/email/valid`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
      console.log(`인증 실패: ${JSON.stringify(axiosError.response.data)}`);
    }
    throw error;
  }
};
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmailCode,
  });
};
