import { AxiosResponse } from 'axios';
import api from '../axiosInstance';
import { judgement } from '@/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface deleteJudgementChatsProps {
  comment_id: number;
  user_id: string;
  role: string;
}

const deleteJudgementChats = async ({ comment_id, user_id, role }: deleteJudgementChatsProps) => {
  try {
    const response: AxiosResponse = await api.delete(`${judgement}/comments/${comment_id}`, {
      headers: { 'user-id': user_id, role: role },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(JSON.stringify(error.response.data));
    }
    console.log('댓글 삭제 실패');
    throw error;
  }
};

export const useDeleteJudgementChats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJudgementChats,
    onMutate: async ({ comment_id }) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ['judgementChats'] });

      // 이전 데이터 스냅샷 저장
      const previousData = queryClient.getQueryData(['judgementChats']);

      // 낙관적 업데이트: 댓글 목록에서 해당 댓글 제거
      queryClient.setQueryData(['judgementChats'], (old: any) => {
        if (!old) return old;

        // 데이터 구조에 따라 조정 필요
        // 예시 1: 배열 형태
        if (Array.isArray(old)) {
          return old.filter((comment: any) => comment.id !== comment_id);
        }

        // 예시 2: 객체 형태 (data 속성 내부에 배열)
        if (old.data && Array.isArray(old.data)) {
          return {
            ...old,
            data: old.data.filter((comment: any) => comment.id !== comment_id),
          };
        }

        return old;
      });

      // 롤백을 위한 이전 데이터 반환
      return { previousData };
    },
    onSuccess: (data) => {
      console.log('댓글 삭제 성공:', data);
      // 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ['judgementChats'] });
    },
    onError: (error, variables, context) => {
      console.log('댓글 삭제 실패:', error);
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(['judgementChats'], context.previousData);
      }
    },
  });
};
