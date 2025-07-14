import axios from 'axios';
import { user } from '@/config';
import { useMutation } from '@tanstack/react-query';
interface ResetPasswordParams {
  email: string;
  pw: string;
}
const resetPassword = async ({ email, pw }: ResetPasswordParams): Promise<boolean> => {
  const data = {
    email,
    password: pw,
  };
  try {
    await axios.patch(`${user}/retrieve/password`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error: any) {
    console.error(error);
    if (error.response?.data) {
      alert(`비밀번호 재설정 실패: 다시 시도해 주세요!!`);
      console.log(`비밀번호 재설정 실패: ${JSON.stringify(error.response.data)}`);
    } else {
      alert('비밀번호 재설정 중 오류가 발생했습니다.');
    }
    throw error;
  }
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
