import { judgement } from '@/config';
import { AxiosResponse } from 'axios';
import api from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

interface postVoteProps {
  judgement_id: number;
  isHeaven: boolean;
}

interface getVoteProps {
  judgement_id: number;
}

interface deleteVoteProps {
  judgement_id: number;
}

const getVoteDirection = async ({ judgement_id }: getVoteProps) => {
  try {
    const response: AxiosResponse = await api.get(`${judgement}/${judgement_id}/votes/me`, {
      headers: { 'user-id': 'xlah_ht09' },
    });
    return response.data;
  } catch (error: any) {
    console.log('투표 상태 획득 실패');
    throw error;
  }
};

const postVote = async ({ judgement_id, isHeaven }: postVoteProps) => {
  try {
    const response: AxiosResponse = await api.post(
      `${judgement}/${judgement_id}/votes`,
      { isHeaven },
      { headers: { 'user-id': 'xlah_ht09' } },
    );
    return response.data;
  } catch (error: any) {
    console.log('투표 전송 실패');
    throw error;
  }
};

const deleteVote = async ({ judgement_id }: deleteVoteProps) => {
  try {
    const response: AxiosResponse = await api.delete(`${judgement}/${judgement_id}/votes`, {
      headers: { 'user-id': 'xlah_ht09' },
    });
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

export const useDeleteVote = () => {
  return useMutation({
    mutationFn: deleteVote,
    onSuccess: () => {
      console.log('성공:');
    },
    onError: () => {
      console.log('실패:');
    },
  });
};

export const useGetVoteDirection = () => {
  return useMutation({
    mutationFn: getVoteDirection,
    onSuccess: () => {
      console.log('성공:');
    },
    onError: () => {
      console.log('실패:');
    },
  });
};
