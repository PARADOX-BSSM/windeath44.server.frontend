import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { auth } from '@/config';
import api from '@/api/axiosInstance.ts';
interface authParams {
  email: string;
}
export const emailValidationRequest = async ({ email }: authParams): Promise<boolean> => {
  try {
    const response: AxiosResponse = await api.post(
      `${auth}/email`,
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    console.log(JSON.stringify(response.data));
    return true;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(`이메일 전송 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};
export const useEmailValidation = () => {
  return useMutation({
    mutationFn: emailValidationRequest,
    onSuccess: () => {
      console.log('이메일이 성공적으로 전송되었습니다.');
    },
    onError: () => {},
  });
};
