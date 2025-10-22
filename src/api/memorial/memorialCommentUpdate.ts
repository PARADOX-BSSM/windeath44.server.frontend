import { useMutation } from '@tanstack/react-query';
import { memorial } from '@/config';
import api from '../axiosInstance';
import React from 'react';
import type { MemorialCommentsData } from './getMemorialComments';

interface UpdateCommentData {
  commentId: number;
  content: string;
}

const updateComment = async ({ commentId, content }: UpdateCommentData) => {
  try {
    const response = await api.patch(`${memorial}/comment/${commentId}`, { content });
    return response.data;
  } catch (err) {
    console.error('댓글 수정 중 오류:', err);
    throw err;
  }
};

export const useCommentUpdate = (
  setMemorialComment: React.Dispatch<React.SetStateAction<MemorialCommentsData[]>>,
) => {
  return useMutation({
    mutationFn: updateComment,
    onMutate: async ({ commentId, content }) => {
      // 이전 상태를 저장 (롤백을 위해)
      const previousComments = await new Promise<MemorialCommentsData[]>((resolve) => {
        setMemorialComment((prev) => {
          resolve(prev);
          return prev;
        });
      });

      // 낙관적 업데이트: 즉시 댓글 수정 반영
      setMemorialComment((prev) => {
        const updateCommentRecursive = (comments: MemorialCommentsData[]): MemorialCommentsData[] => {
          return comments.map((comment) => {
            if (comment.commentId === commentId) {
              return { ...comment, content };
            }
            if (comment.children && comment.children.length > 0) {
              return {
                ...comment,
                children: updateCommentRecursive(comment.children),
              };
            }
            return comment;
          });
        };
        return updateCommentRecursive(prev);
      });

      // 롤백을 위해 이전 상태 반환
      return { previousComments };
    },
    onError: (error: any, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousComments) {
        setMemorialComment(context.previousComments);
      }
      console.error('댓글 수정 실패:', error);
    },
    onSuccess: (data: any) => {
      // console.log('댓글 수정 성공:', data);
    },
  });
};
