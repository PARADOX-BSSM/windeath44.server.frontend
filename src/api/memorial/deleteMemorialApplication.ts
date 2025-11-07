import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../axiosInstance';
import { memorial_application } from '@/config';

// 추모관 신청 삭제
export const deleteMemorialApplication = async (memorialApplicationId: number): Promise<void> => {
  await api.delete(`${memorial_application}/${memorialApplicationId}`);
};

// 삭제 mutation hook
export const useMemorialApplicationDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMemorialApplication,
    onSuccess: () => {
      // 신청 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['memorialApplications'] });
      queryClient.invalidateQueries({ queryKey: ['myMemorialApplications'] });
      queryClient.invalidateQueries({ queryKey: ['memorialApplication'] });
    },
  });
};
