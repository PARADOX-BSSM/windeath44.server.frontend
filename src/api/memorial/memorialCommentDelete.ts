import { useMutation } from '@tanstack/react-query';
import { memorial } from '@/config';
import api from '../axiosInstance';
import React from 'react';
import type { MemorialCommentsData } from './getMemorialComments';

interface DeleteCommentData {
  commentId: number;
}

const deleteComment = async ({ commentId }: DeleteCommentData) => {
  try {
    const response = await api.delete(`${memorial}/comment/${commentId}`);
    return response.data;
  } catch (err) {
    console.error('댓글 삭제 중 오류:', err);
    throw err;
  }
};

export const useCommentDelete = (
  setMemorialComment: React.Dispatch<React.SetStateAction<MemorialCommentsData[]>>,
) => {
  return useMutation({
    mutationFn: deleteComment,
    onMutate: async ({ commentId }) => {
      // 이전 상태를 저장 (롤백을 위해)
      const previousComments = await new Promise<MemorialCommentsData[]>((resolve) => {
        setMemorialComment((prev) => {
          resolve(prev);
          return prev;
        });
      });

      // 낙관적 업데이트: 즉시 댓글 삭제 반영
      setMemorialComment((prev) => {
        const deleteCommentRecursive = (comments: MemorialCommentsData[]): MemorialCommentsData[] => {
          // 최상위 레벨에서 삭제
          const filtered = comments.filter((comment) => comment.commentId !== commentId);

          // children에서 재귀적으로 삭제
          return filtered.map((comment) => {
            if (comment.children && comment.children.length > 0) {
              return {
                ...comment,
                children: deleteCommentRecursive(comment.children),
              };
            }
            return comment;
          });
        };
        return deleteCommentRecursive(prev);
      });

      // 롤백을 위해 이전 상태 반환
      return { previousComments };
    },
    onError: (error: any, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousComments) {
        setMemorialComment(context.previousComments);
      }
      console.error('댓글 삭제 실패:', error);
    },
    onSuccess: (data: any) => {
      // console.log('댓글 삭제 성공:', data);
    },
  });
};
