import { useMutation } from '@tanstack/react-query';
import api from '../axiosInstance';
import { chatbot } from '@/config';
import React from 'react';

export interface ChatHistoryItem {
  _id: string;
  session_id: string;
  input_text: string;
  output_text: string;
}

interface ChatHistoryParams {
  chatbotId: number;
  cursorId?: number;
  size?: number;
}

interface ChatHistoryResponse {
  message: string;
  data: {
    values: ChatHistoryItem[];
    hasNext: boolean;
  };
}

const getChatbotHistory = async ({
  chatbotId,
  cursorId,
  size = 20,
}: ChatHistoryParams): Promise<ChatHistoryResponse> => {
  const response = await api.get(`${chatbot}/history/${chatbotId}`, {
    params: {
      size,
      ...(cursorId != null && { cursorId }),
    },
  });
  return response.data;
};

export const useGetChatbotHistory = (
  setChatHistory: React.Dispatch<React.SetStateAction<ChatHistoryItem[]>>,
  setHasNext: React.Dispatch<React.SetStateAction<boolean>>,
  isLoadMore: boolean = false,
) => {
  return useMutation<ChatHistoryResponse, Error, ChatHistoryParams>({
    mutationFn: getChatbotHistory,
    onSuccess: (data: ChatHistoryResponse) => {
      if (isLoadMore) {
        // 더보기: 기존 히스토리에 추가
        setChatHistory((prev) => [...prev, ...data.data.values]);
      } else {
        // 초기 로드: 히스토리 교체
        setChatHistory(data.data.values);
      }
      setHasNext(data.data.hasNext);
    },
    onError: (err: unknown) => {
      console.error('채팅 기록 조회 실패', err);
    },
  });
};
