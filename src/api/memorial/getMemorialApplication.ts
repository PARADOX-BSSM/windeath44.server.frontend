import { useQuery } from '@tanstack/react-query';
import api from '../axiosInstance';
import { memorial_application } from '@/config';

interface MemorialApplicationResponse {
  message: string;
  data: {
    userId: string;
    characterId: number;
    content: string;
    createdAt: string;
    state: string;
    likes: number;
    didUserLiked: boolean;
  };
}

export const fetchMemorialApplication = async (
  memorialApplicationId: number,
): Promise<MemorialApplicationResponse> => {
  const response = await api.get(`${memorial_application}/${memorialApplicationId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const useGetMemorialApplicationQuery = (memorialApplicationId: number) => {
  return useQuery({
    queryKey: ['memorialApplication', memorialApplicationId],
    queryFn: () => fetchMemorialApplication(memorialApplicationId),
    enabled: !!memorialApplicationId,
  });
};
