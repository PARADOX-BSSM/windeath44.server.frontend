import { useMutation } from '@tanstack/react-query';
import { memorial } from '@/config';
import api from '../axiosInstance';

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

export const useCommentUpdate = () => {
  return useMutation({
    mutationFn: updateComment,
    onSuccess: (data: any) => {
      // console.log(data);
    },
    onError: (error: any) => {
      // console.log(error);
    },
  });
};
