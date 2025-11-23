import { AxiosResponse } from 'axios';
import api from '../axiosInstance';
import { judgement } from '@/config';
import { useMutation } from '@tanstack/react-query';

interface getJudgementChatsProps {
  judgement_id: number;
  user_id: string;
}

interface postJudgementChatLikeProps {
  comment_id: number;
  user_id: string;
}

interface deleteJudgementChatLikeProps {
  comment_id: number;
  user_id: string;
}

interface getJudgementChatLikeProps {
  comment_id: number;
  user_id: string;
}

const getJudgementChats = async ({ judgement_id, user_id }: getJudgementChatsProps) => {
  try {
    const response: AxiosResponse = await api.get(`${judgement}/${judgement_id}/comments`, {
      headers: { 'user-id': user_id },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(JSON.stringify(error.response.data));
    }
    console.log('댓글 목록 불러오기 실패');
    throw error;
  }
};

const postJudgementChatLike = async ({ comment_id, user_id }: postJudgementChatLikeProps) => {
  try {
    const response: AxiosResponse = await api.post(
      `${judgement}/comments/${comment_id}/likes`,
      {},
      {
        headers: { 'user-id': user_id },
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(JSON.stringify(error.response.data));
    }
    console.log('좋아요 전송 실패');
    throw error;
  }
};

const deleteJudgementChatLike = async ({ comment_id, user_id }: deleteJudgementChatLikeProps) => {
  try {
    const response: AxiosResponse = await api.delete(`${judgement}/comments/${comment_id}/likes`, {
      headers: { 'user-id': user_id },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(JSON.stringify(error.response.data));
    }
    console.log('좋아요 취소 실패');
    throw error;
  }
};

const getJudgementChatLike = async ({ comment_id, user_id }: getJudgementChatLikeProps) => {
  try {
    const response: AxiosResponse = await api.get(`${judgement}/comments/${comment_id}/likes`, {
      headers: { 'user-id': user_id },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(JSON.stringify(error.response.data));
    }
    console.log('좋아요 상태 획득 실패');
    throw error;
  }
};

export const useGetJudgementChats = () => {
  return useMutation({
    mutationFn: getJudgementChats,
  });
};

export const usePostJudgementChatLike = () => {
  return useMutation({
    mutationFn: postJudgementChatLike,
  });
};

export const useDeleteJudgementChatLike = () => {
  return useMutation({
    mutationFn: deleteJudgementChatLike,
  });
};

export const useGetJudgementChatLike = () => {
  return useMutation({
    mutationFn: getJudgementChatLike,
  });
};
