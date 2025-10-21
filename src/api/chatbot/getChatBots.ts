import { useQuery } from '@tanstack/react-query';
import { chatbot } from '@/config';
import { ReactNode } from 'react';
import axios from 'axios';

interface ChatBot {
  description: ReactNode;
  chatbot_id: number;
  name: string;
  contributor: string[];
}

interface ChatBotsResponse {
  message: string;
  data: {
    values: ChatBot[][];
    hasNext: boolean;
  };
}

interface FetchChatBotsParams {
  cursorId?: number;
  size?: number;
}

export const fetchChatBots = async ({ cursorId, size }: FetchChatBotsParams): Promise<ChatBotsResponse> => {
  const response = await axios.get(`${chatbot}`, {
    params: { cursorId, size },
  });
  return response.data;
};

export const useGetChatBotsQuery = ({ cursorId, size = 10 }: FetchChatBotsParams) => {
  return useQuery({
    queryKey: ['chatbots', cursorId, size],
    queryFn: () => fetchChatBots({ cursorId, size }),
  });
};
