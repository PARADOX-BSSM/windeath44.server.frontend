import { auth } from '@/config';
import { useMutation } from '@tanstack/react-query';
import api from '@/api/axiosInstance.ts';
interface authParams {
  email: string;
}
const changeTemporaryKey = async ({ email }: authParams) => {
  const data = {
    userId: email.split('@')[0],
    email,
  };
  try {
    await api.post(`${auth}/password`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error: any) {
    console.error(error);
    if (error.response?.data) {
      console.log(`이메일 전송 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};
export const useChangeTemporaryKey = () => {
  return useMutation({
    mutationFn: changeTemporaryKey,
  });
};
