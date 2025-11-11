import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { memorial_application } from '@/config/index';
import api from '@/api/axiosInstance';

interface UpdateMemorialApplicationRequest {
  content: string;
}

interface UpdateMemorialApplicationParams {
  memorialApplicationId: number;
  content: string;
}

const updateMemorialApplication = async ({
  memorialApplicationId,
  content,
}: UpdateMemorialApplicationParams): Promise<any> => {
  const data: UpdateMemorialApplicationRequest = {
    content: content,
  };

  try {
    const response: AxiosResponse = await api.patch(
      `${memorial_application}/${memorialApplicationId}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.error(`추모관 신청 수정 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const useUpdateMemorialApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMemorialApplication,
    onSuccess: () => {
      // console.log('추모관 신청이 성공적으로 수정되었습니다.');
      // 신청 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['memorialApplications'] });
      queryClient.invalidateQueries({ queryKey: ['myMemorialApplications'] });
    },
    onError: (error) => {
      console.error('추모관 신청 수정 중 오류 발생:', error);
    },
  });
};
