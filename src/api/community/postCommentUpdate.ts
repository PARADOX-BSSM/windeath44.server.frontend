import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface PostCommentUpdateInterface {
  commentId: number;
  body: string;
}

interface PostCommentUpdateResponse {
  message: string;
  data: {
    commentId: number;
    postId: number;
    userId: string;
    name: string;
    profile: string;
    parentCommentId: number;
    body: string;
    createdAt: string;
    updatedAt: string;
    likesCount: number;
  };
}
const postCommentUpdate = async ({ commentId, body }: PostCommentUpdateInterface) => {
  const data = {
    body: body,
  };
  try {
    const response: AxiosResponse<PostCommentUpdateResponse> = await api.patch(
      `${community}/posts/comments/${commentId}`,
      data,
    );
    console.log(data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log('댓글 수정 실패');
    }
    throw error;
  }
};

export const usePostCommentUpdate = () => {
  return useMutation({
    mutationFn: postCommentUpdate,
    onSuccess: () => {
      console.log('댓글 수정 성공');
    },
    onError: () => {},
  });
};
