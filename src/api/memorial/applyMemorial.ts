import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { memorial_application } from '@/config/index';
import api from '@/api/axiosInstance';

interface ApplyMemorialInterface {
  characterId: number;
  content: string;
}

const applyMemorial = async ({
  characterId,
  content,
}: ApplyMemorialInterface): Promise<boolean> => {
  const data = {
    characterId: characterId,
    content: content,
  };
  try {
    const response: AxiosResponse = await api.post(`${memorial_application}/apply`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log(JSON.stringify(response.data));
    return true;
  } catch (error: any) {
    if (error.response?.data) {
      alert(`추모관 등록 오류`);
      console.log(`이메일 전송 실패: ${JSON.stringify(error.response.data)}`);
    } else {
      alert('추모관 등록 중 오류가 발생했습니다.');
    }
    throw error;
  }
};

export const useApplyMemorial = () => {
  return useMutation({
    mutationFn: applyMemorial,
    onSuccess: () => {
      alert('추모관이 성공적으로 등록되었습니다.');
    },
    onError: () => {},
  });
};
