import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { auth } from '@/config';
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
    await axios.patch(`${auth}/email/valid`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    alert('인증이 완료되었습니다.');
    return true;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
      alert(`인증 실패: 다시 입력해 주세요!`);
      console.log(`인증 실패: ${JSON.stringify(axiosError.response.data)}`);
    } else {
      alert('인증코드 확인 중 오류가 발생했습니다.');
    }
    throw error;
  }
};
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmailCode,
  });
};
