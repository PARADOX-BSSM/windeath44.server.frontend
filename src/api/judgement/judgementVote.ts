import { judgement } from '@/config';
import { AxiosResponse } from 'axios';
import api from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

interface postVoteProps {
  judgement_id: number;
  is_heaven: boolean;
}

interface getVoteProps {
  judgement_id: number;
}

const getVote = async ({ judgement_id }: getVoteProps) => {
  try {
    const response: AxiosResponse = await api.get(`${judgement}/${judgement_id}/votes/me`, {
      headers: { 'user-id': 'test' },
    });
    return response.data;
  } catch (error: any) {
    console.log('투표 상태 획득 실패');
    throw error;
  }
};

const postVote = async ({ judgement_id, is_heaven }: postVoteProps) => {
  try {
    const response: AxiosResponse = await api.post(
      `${judgement}/${judgement_id}/votes`,
      { is_heaven },
      { headers: { 'user-id': 'test' } },
    );
    return response.data;
  } catch (error: any) {
    console.log('투표 전송 실패');
    throw error;
  }
};

export const usePostVote = () => {
  return useMutation({
    mutationFn: postVote,
    onSuccess: () => {
      console.log('성공:');
    },
    onError: () => {
      console.log('실패:');
    },
  });
};

export const useGetVote = () => {
  return useMutation({
    mutationFn: getVote,
    onSuccess: () => {
      console.log('성공:');
    },
    onError: () => {
      console.log('실패:');
    },
  });
};
