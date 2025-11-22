import { AxiosResponse } from 'axios';
import api from '../axiosInstance';
import { judgement } from '@/config';
import { useMutation } from '@tanstack/react-query';

interface postJudgementLike {
  judgement_id: number;
}

interface deleteJudgementLike {
  judgement_id: number;
}

interface getJudgementLike {
  judgement_id: number;
}

const postJudgementLike = async ({ judgement_id }: postJudgementLike) => {
  try {
    const response: AxiosResponse = await api.post(
      `${judgement}/${judgement_id}/likes`,
      {},
      {
        headers: { 'user-id': 'test' },
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(JSON.stringify(error.response.data));
    }
    console.log('좋아요 클릭 전송 실패');
    throw error;
  }
};

const deleteJudgementLike = async ({ judgement_id }: deleteJudgementLike) => {
  try {
    const response: AxiosResponse = await api.delete(`${judgement}/${judgement_id}/likes`, {
      headers: { 'user-id': 'test' },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(JSON.stringify(error.response.data));
    }
    console.log('좋아요 취소 전송 실패');
    throw error;
  }
};

const getJudgementLike = async ({ judgement_id }: getJudgementLike) => {
  try {
    const response: AxiosResponse = await api.get(`${judgement}/${judgement_id}/likes`, {
      headers: { 'user-id': 'test' },
    });
    return response.data;
  } catch (error: any) {
    console.log('좋아요 목록 획득 실패');
    throw error;
  }
};

//좋아요
export const usepostJudgementLike = () => {
  return useMutation({
    mutationFn: postJudgementLike,
    onSuccess: () => {
      console.log('성공:');
    },
    onError: () => {
      console.log('실패:');
    },
  });
};

//좋아요 취소
export const usedeleteJudgementLike = () => {
  return useMutation({
    mutationFn: deleteJudgementLike,
    onSuccess: () => {
      console.log('성공:');
    },
    onError: () => {
      console.log('실패:');
    },
  });
};

//좋아요 눌렀는지 확인
export const usegetJudgementLike = () => {
  return useMutation({
    mutationFn: getJudgementLike,
    onSuccess: () => {
      console.log('성공:');
    },
    onError: () => {
      console.log('실패:');
    },
  });
};
