import { auth } from '@/config';
import { useMutation } from '@tanstack/react-query';
import api from '@/api/axiosInstance.ts';
interface ChangeKeyValidation {
  authorizationCode: string;
}
const changeKeyValidation = async ({ authorizationCode }: ChangeKeyValidation) => {
  const data = {
    authorizationCode,
  };
  try {
    await api.patch(`${auth}/password/valid`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error: any) {
    console.error(error);
    if (error.response?.data) {
      console.log(`인증 코드 검증 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};
export const useChangeKeyValidation = () => {
  return useMutation({
    mutationFn: changeKeyValidation,
  });
};
