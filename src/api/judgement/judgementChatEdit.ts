import { AxiosResponse } from 'axios';
import api from '../axiosInstance';
import { judgement } from '@/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface patchJudgementChatsProps {
  comment_id: number;
  body: string;
}

const patchJudgementChats = async ({ comment_id, body }: patchJudgementChatsProps) => {
  const data = JSON.stringify({ body: body });
  try {
    const response: AxiosResponse = await api.patch(`${judgement}/comments/${comment_id}`, data, {
      headers: { 'user-id': 'xlah_ht09', role: 'user', 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(JSON.stringify(error.response.data));
    }
    console.log('댓글 수정 실패');
    throw error;
  }
};

export const usePatchJudgementChats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchJudgementChats,
    onMutate: async ({ comment_id, body }) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ['judgementChats'] });

      // 이전 데이터 스냅샷 저장
      const previousData = queryClient.getQueryData(['judgementChats']);

      // 낙관적 업데이트: 댓글 내용 수정
      queryClient.setQueryData(['judgementChats'], (old: any) => {
        if (!old) return old;

        // 배열 형태
        if (Array.isArray(old)) {
          return old.map((comment: any) =>
            comment.id === comment_id
              ? { ...comment, body, updated_at: new Date().toISOString() }
              : comment,
          );
        }

        // 객체 형태 (data 속성 내부에 배열)
        if (old.data && Array.isArray(old.data)) {
          return {
            ...old,
            data: old.data.map((comment: any) =>
              comment.id === comment_id
                ? { ...comment, body, updated_at: new Date().toISOString() }
                : comment,
            ),
          };
        }

        return old;
      });

      return { previousData };
    },
    onSuccess: (data) => {
      console.log('댓글 수정 성공:', data);
    },
    onError: (error, variables, context) => {
      console.log('댓글 수정 실패:', error);
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(['judgementChats'], context.previousData);
      }
    },
    onSettled: () => {
      // 모든 작업 완료 후 서버와 동기화
      queryClient.invalidateQueries({ queryKey: ['judgementChats'] });
    },
  });
};
