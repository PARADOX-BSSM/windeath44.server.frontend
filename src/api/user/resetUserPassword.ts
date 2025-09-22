import { user } from '@/config';
import { useMutation } from '@tanstack/react-query';
import api from '@/api/axiosInstance.ts';
interface ResetPasswordParams {
  email: string;
  password: string;
}
const resetPassword = async ({ email, password }: ResetPasswordParams): Promise<boolean> => {
  const data = {
    email,
    password,
  };
  try {
    await api.patch(`${user}/retrieve/password`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error: any) {
    console.error(error);
    if (error.response?.data) {
      console.error('비밀번호 재설정 실패:', error.response.status);
    }
    throw error;
  }
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
