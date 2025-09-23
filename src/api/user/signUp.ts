import { user } from '@/config';
import { useMutation } from '@tanstack/react-query';
import api from '@/api/axiosInstance.ts';
interface SignUpParams {
  name: string;
  userId: string;
  email: string;
  pw: string;
  changeToLogIn: () => void;
}

export const signUp = async ({
  name,
  userId,
  email,
  pw,
  changeToLogIn,
}: SignUpParams): Promise<boolean> => {
  const data = {
    userId,
    email,
    name,
    password: pw,
  };
  try {
    const response = await api.post(`${user}/register`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(JSON.stringify(response.data));
    changeToLogIn();
    return true;
  } catch (error: any) {
    console.error(error);
    if (error.response?.data) {
      console.log(`회원가입 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};
export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
