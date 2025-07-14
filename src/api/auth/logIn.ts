import axios, { AxiosError } from 'axios';
import { auth } from '@/config';
import { useMutation } from '@tanstack/react-query';
interface authParams {
  id: string;
  password: string;
}
const logIn = async ({ id, password }: authParams): Promise<boolean> => {
  const data = {
    userId: id,
    password,
  };
  try {
    await axios.post(`${auth}/login`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
      alert(`로그인 실패: 다시 입력해 주세요!`);
      console.log(`로그인 실패: ${JSON.stringify(axiosError.response.data)}`);
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
