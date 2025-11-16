import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../axiosInstance';
import { memorial_application } from '@/config';

// 추모관 신청 좋아요 추가
export const likeMemorialApplication = async (memorialApplicationId: number): Promise<void> => {
  await api.post(`${memorial_application}/likes/${memorialApplicationId}`, null, {
    withCredentials: true,
  });
};

// 추모관 신청 좋아요 취소
export const unlikeMemorialApplication = async (memorialApplicationId: number): Promise<void> => {
  await api.delete(`${memorial_application}/likes/${memorialApplicationId}`, {
    withCredentials: true,
  });
};

// 좋아요 토글 mutation hook
export const useMemorialApplicationLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      memorialApplicationId,
      isLiked,
    }: {
      memorialApplicationId: number;
      isLiked: boolean;
    }) => {
      if (isLiked) {
        await unlikeMemorialApplication(memorialApplicationId);
      } else {
        await likeMemorialApplication(memorialApplicationId);
      }
    },
    onSuccess: () => {
      // 신청 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['memorialApplications'] });
      queryClient.invalidateQueries({ queryKey: ['myMemorialApplications'] });
    },
  });
};
