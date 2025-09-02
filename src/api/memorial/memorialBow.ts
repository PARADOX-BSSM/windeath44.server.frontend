import { useMutation } from '@tanstack/react-query';
import { memorial } from '@/config';
import api from '@/api/axiosInstance.ts';

const memorialBow = async (memorialId: number) => {
  try {
    const response = await api.post(`${memorial}/bow`, memorialId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
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
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
