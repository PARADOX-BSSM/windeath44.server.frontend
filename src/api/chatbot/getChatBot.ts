import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { chatbot } from '@/config';
import { ReactNode } from 'react';

interface ChatBot {
  description: ReactNode;
  chatbot_id: number;
  name: string;
  contributor: string[];
}

interface ChatBotResponse {
  message: string;
  data: ChatBot;
}

interface FetchChatBotParams {
  chatbot_id: number;
}

export const fetchChatBot = async ({
  chatbot_id,
}: FetchChatBotParams): Promise<ChatBotsResponse> => {
  const response = await api.get(`${chatbot}/${chatbot_id}`);
  return response.data;
};

export const useGetChatBotQuery = ({ chatbot_id = 1 }: FetchChatBotParams) => {
  return useQuery({
    queryKey: [],
    queryFn: () => fetchChatBot({ chatbot_id }),
  });
};
