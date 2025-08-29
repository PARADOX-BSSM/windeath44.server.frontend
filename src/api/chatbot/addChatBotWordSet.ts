import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { chatbot } from '@/config/index';
import api from '@/api/axiosInstance';

interface addWordSetInterface {
  characterId: number;
  userId: string;
}

const addWordSet = async ({ characterId, userId }: addWordSetInterface) => {
  try {
    const response: AxiosResponse = await api.post(`${chatbot}/wordset/${characterId}`, {
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(`실패 : ${JSON.stringify(error.response.data)}`);
    throw error;
  }
};

export const useAddWordSet = () => {
  return useMutation({
    mutationFn: addWordSet,
    onSuccess: () => {
      console.log('성공');
    },
    onError: () => {},
  });
};
