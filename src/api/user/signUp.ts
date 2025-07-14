import axios from 'axios';
import { user } from '@/config';
import { useMutation } from '@tanstack/react-query';
interface SignUpParams {
  name: string;
  email: string;
  pw: string;
  changeToLogIn: () => void;
}

export const signUp = async ({
  name,
  email,
  pw,
  changeToLogIn,
}: SignUpParams): Promise<boolean> => {
  const data = {
    userId: email.split('@')[0],
    email,
    name,
    password: pw,
  };
  try {
    await axios.post(`${user}/register`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    alert('회원가입이 완료되었습니다.');
    changeToLogIn();
    return true;
  } catch (error: any) {
    console.error(error);
    if (error.response?.data) {
      alert(`회원가입 실패: 다시 시도해 주세요!!`);
      console.log(`회원가입 실패: ${JSON.stringify(error.response.data)}`);
    } else {
      alert('회원가입 중 오류가 발생했습니다.');
    }
    return false;
  }
};
export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
