import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { chatbot } from '@/config/index';
import api from '@/api/axiosInstance';

interface DoChatInterface {
  chatbotId: number;
  content: string;
  userId: string;
}

const doChat = async ({ chatbotId, content, userId }: DoChatInterface) => {
  // console.log('doChat 호출됨:', { chatbotId, content, userId });
  // console.log('chatbot URL:', chatbot);
  try {
    const response: AxiosResponse = await api.post(
      `${chatbot}/chat/${chatbotId}`,
      { content },
      {
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
// console.log(`채팅 실패 : ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const useDoChat = () => {
  return useMutation({
    mutationFn: doChat,
    onSuccess: () => {},
    onError: () => {},
  });
};
