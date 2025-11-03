import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../axiosInstance';
import { memorial_application } from '@/config';

// 추모관 신청 승인
export const approveMemorialApplication = async (
  memorialApplicationId: number,
): Promise<void> => {
  await api.patch(`${memorial_application}/approve/${memorialApplicationId}`, null, {
    withCredentials: true,
  });
};

// 추모관 신청 거절
export const rejectMemorialApplication = async (memorialApplicationId: number): Promise<void> => {
  await api.patch(`${memorial_application}/cancel/${memorialApplicationId}`, null, {
    withCredentials: true,
  });
};

// 승인 mutation hook
export const useMemorialApplicationApproveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveMemorialApplication,
    onSuccess: () => {
      // 신청 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['memorialApplications'] });
      queryClient.invalidateQueries({ queryKey: ['myMemorialApplications'] });
      queryClient.invalidateQueries({ queryKey: ['memorialApplication'] });
    },
  });
};

// 거절 mutation hook
export const useMemorialApplicationRejectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectMemorialApplication,
    onSuccess: () => {
      // 신청 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['memorialApplications'] });
      queryClient.invalidateQueries({ queryKey: ['myMemorialApplications'] });
      queryClient.invalidateQueries({ queryKey: ['memorialApplication'] });
    },
  });
};
