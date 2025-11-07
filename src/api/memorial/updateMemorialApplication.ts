import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../axiosInstance';
import { memorial_application } from '@/config';

// 추모관 신청 수정을 위한 request body 타입
export interface UpdateMemorialApplicationRequest {
  content: string;
}

// 추모관 신청 수정
export const updateMemorialApplication = async (
  memorialApplicationId: number,
  data: UpdateMemorialApplicationRequest,
): Promise<void> => {
  await api.patch(`${memorial_application}/${memorialApplicationId}`, data);
};

// 수정 mutation hook
export const useMemorialApplicationUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memorialApplicationId,
      data,
    }: {
      memorialApplicationId: number;
      data: UpdateMemorialApplicationRequest;
    }) => updateMemorialApplication(memorialApplicationId, data),
    onSuccess: () => {
      // 신청 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['memorialApplications'] });
      queryClient.invalidateQueries({ queryKey: ['myMemorialApplications'] });
      queryClient.invalidateQueries({ queryKey: ['memorialApplication'] });
    },
  });
};
