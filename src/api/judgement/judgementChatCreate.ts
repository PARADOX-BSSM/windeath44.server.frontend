import { AxiosResponse } from 'axios';
import api from '../axiosInstance';
import { judgement } from '@/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface postJudgementChatsProps {
  judgement_id: number;
  body: string;
  parentCommentId?: null | number;
}

const postJudgementChats = async ({
  judgement_id,
  body,
  parentCommentId,
}: postJudgementChatsProps) => {
  const data = JSON.stringify({ body: body, parentCommentId: parentCommentId });
  try {
    const response: AxiosResponse = await api.post(`${judgement}/${judgement_id}/comments`, data, {
      headers: { 'user-id': 'xlah_ht09', 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log('에러 응답:', JSON.stringify(error.response.data));
    }

    console.log('댓글 생성 실패');
    throw error;
  }
};

export const usePostJudgementChats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postJudgementChats,

    // 1) API 요청 전에 캐시를 낙관적으로 업데이트
    onMutate: async (newComment) => {
      const { judgement_id, body, parentCommentId } = newComment;

      // 해당 쿼리 invalidate 방지
      await queryClient.cancelQueries({
        queryKey: ['judgementChats', judgement_id],
      });

      // 현재 캐시 백업
      const previous = queryClient.getQueryData(['judgementChats', judgement_id]);

      // 낙관적 데이터 생성 (기존 데이터 구조에 맞춤)
      const optimisticComment = {
        commentId: `temp_${Date.now()}`, // 임시 ID (문자열로)
        body,
        parentCommentId: parentCommentId || null,
        userId: 'test', // 현재 사용자 ID
        name: 'xlah', // 사용자 이름
        profile: null,
        likesCount: 0,
        isLiked: false,
        judgmentId: judgement_id,
        createdAt: new Date().toISOString(),
        is_optimistic: true, // 임시 데이터 표시용
      };

      // 캐시 업데이트
      queryClient.setQueryData(['judgementChats', judgement_id], (old: any) => {
        if (!old || !old.data) return { data: [optimisticComment] };
        return { ...old, data: [...old.data, optimisticComment] };
      });

      // rollback을 위해 기존 값 반환
      return { previous, judgement_id };
    },

    // 2) 에러 났으면 rollback
    onError: (error, variables, context) => {
      console.error('댓글 생성 에러:', error);
      if (context?.previous) {
        queryClient.setQueryData(['judgementChats', context.judgement_id], context.previous);
      }
    },

    // 3) 성공하면 실제 데이터로 교체
    onSuccess: (data, variables) => {
      console.log('댓글 생성 성공:', data);
      queryClient.invalidateQueries({
        queryKey: ['judgementChats', variables.judgement_id],
      });
    },

    // 4) 성공/실패와 상관없이 최신화 (onSuccess 후 실행)
    onSettled: (data, error, variables) => {
      // onSuccess에서 이미 invalidate했으므로 제거 가능
      // 혹은 에러 시에만 실행하도록 조건 추가
      if (error) {
        queryClient.invalidateQueries({
          queryKey: ['judgementChats', variables.judgement_id],
        });
      }
    },
  });
};
