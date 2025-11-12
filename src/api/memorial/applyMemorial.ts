import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    });
    // console.log(JSON.stringify(response.data));
    return true;
  } catch (error: any) {
    if (error.response?.data) {
      // console.log(`추모관 등록 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const useApplyMemorial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyMemorial,
    onSuccess: () => {
      // console.log('추모관이 성공적으로 등록되었습니다.');
      // 신청 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['memorialApplications'] });
      queryClient.invalidateQueries({ queryKey: ['myMemorialApplications'] });
    },
    onError: () => {},
  });
};
