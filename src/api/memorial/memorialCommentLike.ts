import { useMutation } from '@tanstack/react-query';
import { memorial } from '@/config';
import api from '../axiosInstance';
import React from 'react';
import type { MemorialCommentsData } from './getMemorialComments';

interface LikeCommentData {
  commentId: number;
  isLiked: boolean; // 현재 좋아요 상태 (토글을 위해)
}

const toggleLikeComment = async ({ commentId, isLiked }: LikeCommentData) => {
  try {
    if (isLiked) {
      // 이미 좋아요 되어있으면 DELETE (좋아요 취소)
      const response = await api.delete(`${memorial}/comment/likes/${commentId}`);
      return response.data;
    } else {
      // 좋아요 안 되어있으면 POST (좋아요)
      const response = await api.post(`${memorial}/comment/likes/${commentId}`);
      return response.data;
    }
  } catch (err) {
    console.error('좋아요 토글 중 오류:', err);
    throw err;
  }
};

export const useCommentLike = (
  setMemorialComment: React.Dispatch<React.SetStateAction<MemorialCommentsData[]>>,
) => {
  return useMutation({
    mutationFn: toggleLikeComment,
    onMutate: async ({ commentId, isLiked }) => {
      // 이전 상태를 저장 (롤백을 위해)
      const previousComments = await new Promise<MemorialCommentsData[]>((resolve) => {
        setMemorialComment((prev) => {
          resolve(prev);
          return prev;
        });
      });

      // 낙관적 업데이트: 즉시 좋아요 상태 토글
      setMemorialComment((prev) => {
        const toggleLikeRecursive = (comments: MemorialCommentsData[]): MemorialCommentsData[] => {
          return comments.map((comment) => {
            if (comment.commentId === commentId) {
              return {
                ...comment,
                isLiked: !isLiked,
                likes: isLiked ? comment.likes - 1 : comment.likes + 1,
              };
            }
            if (comment.children && comment.children.length > 0) {
              return {
                ...comment,
                children: toggleLikeRecursive(comment.children),
              };
            }
            return comment;
          });
        };
        return toggleLikeRecursive(prev);
      });

      // 롤백을 위해 이전 상태 반환
      return { previousComments };
    },
    onError: (error: any, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousComments) {
        setMemorialComment(context.previousComments);
      }
      console.error('좋아요 토글 실패:', error);
    },
    onSuccess: (data: any) => {
      // console.log('좋아요 토글 성공:', data);
    },
  });
};
