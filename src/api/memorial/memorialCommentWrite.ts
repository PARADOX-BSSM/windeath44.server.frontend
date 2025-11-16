import { useMutation } from '@tanstack/react-query';
import { memorial } from '@/config';
import api from '../axiosInstance';
import React from 'react';
import type { MemorialCommentsData } from './getMemorialComments';

interface commentData {
  memorialId: number;
  content: string;
  parentCommentId?: number; //답글의 상위 댓글id
}

const commentWrite = async ({ memorialId, content, parentCommentId }: commentData) => {
  try {
    const data = { memorialId, content, parentCommentId };
    const response = await api.post(`${memorial}/comment/${memorialId}`, data, {});
    return response.data;
  } catch (err) {
    console.error('댓글 작성 중 오류:', err);
    throw err;
  }
};

export const useCommentWrite = (
  setMemorialComment: React.Dispatch<React.SetStateAction<MemorialCommentsData[]>>,
  currentUserId?: string,
) => {
  return useMutation({
    mutationFn: commentWrite,
    onMutate: async ({ memorialId, content, parentCommentId }) => {
      // 이전 상태를 저장 (롤백을 위해)
      const previousComments = await new Promise<MemorialCommentsData[]>((resolve) => {
        setMemorialComment((prev) => {
          resolve(prev);
          return prev;
        });
      });

      // 임시 댓글 객체 생성 (음수 ID 사용)
      const tempComment: MemorialCommentsData = {
        commentId: -Date.now(), // 임시 음수 ID
        memorialId,
        userId: currentUserId || 'unknown',
        content,
        likes: 0,
        isLiked: false,
        parentId: parentCommentId || null,
        createdAt: new Date().toISOString(),
        children: [],
      };

      // 낙관적 업데이트: 즉시 댓글 추가 반영
      setMemorialComment((prev) => {
        if (parentCommentId) {
          // 답글인 경우: 부모 댓글의 children에 추가
          const addReplyRecursive = (comments: MemorialCommentsData[]): MemorialCommentsData[] => {
            return comments.map((comment) => {
              if (comment.commentId === parentCommentId) {
                return {
                  ...comment,
                  children: [...comment.children, tempComment],
                };
              }
              if (comment.children && comment.children.length > 0) {
                return {
                  ...comment,
                  children: addReplyRecursive(comment.children),
                };
              }
              return comment;
            });
          };
          return addReplyRecursive(prev);
        } else {
          // 최상위 댓글인 경우: 목록 끝에 추가
          return [...prev, tempComment];
        }
      });

      // 롤백을 위해 이전 상태 반환
      return { previousComments };
    },
    onError: (error: any, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousComments) {
        setMemorialComment(context.previousComments);
      }
      console.error('댓글 작성 실패:', error);
    },
    onSuccess: (data: any) => {
      // console.log('댓글 작성 성공:', data);
    },
  });
};
