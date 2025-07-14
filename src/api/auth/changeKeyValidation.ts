import axios from 'axios';
import { auth } from '@/config';
import { useMutation } from '@tanstack/react-query';
interface ChangeKeyValidation {
  authorizationCode: string;
}
const changeKeyValidation = async ({ authorizationCode }: ChangeKeyValidation) => {
  const data = {
    authorizationCode,
  };
  try {
    await axios.patch(`${auth}/password/valid`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error: any) {
    console.error(error);
    if (error.response?.data) {
      alert(` 실패: 다시 시도해 주세요!!`);
      console.log(`이메일 전송 실패: ${JSON.stringify(error.response.data)}`);
    } else {
      alert('이메일 전송 중 오류가 발생했습니다.');
    }
    return false;
  }
};
export const useChangeKeyValidationy = () => {
  return useMutation({
    mutationFn: changeKeyValidation,
  });
};
