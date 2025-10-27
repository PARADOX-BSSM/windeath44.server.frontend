import { useMutation } from '@tanstack/react-query';
import { memorial } from '@/config';
import api from '@/api/axiosInstance.ts';

const memorialBow = async (memorialId: number) => {
  try {
    const response = await api.post(`${memorial}/bow`, { memorialId });
    return response.data;
  } catch (err) {
    console.error('절하기 값 불러오는 중 오류:', err);
    throw err;
  }
};

export const useMemorialBow = () => {
  return useMutation({
    mutationFn: memorialBow,
    onSuccess: (data: any) => {
      // console.log(data);
      console.log('useMemorialBow', data);
    },
    onError: (error: any) => {
      // console.log(error);
    },
  });
};

const getBowByUserId = async (memorialId: number) => {
  try {
    const response = await api.get(`${memorial}bow/my/${memorialId}`);
    return response.data;
  } catch (err) {
    // console.error('절하기 값 불러오는 중 오류:', err);
    throw err;
  }
};
export const useGetBowByUserId = () => {
  return useMutation({
    mutationFn: getBowByUserId,
    onSuccess: (data: any) => {
      console.log('useGetBowByUserId', data);
      useMemorialBow();
    },
    onError: (error: any) => {
      // console.log(error);
    },
  });
};
