import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { community } from '@/config';
import api from '../axiosInstance';

interface PostCommentCreateInterface {
  post_id: number;
  user_id: string;
  body: string;
  parentCommentId?: number | null;
}

interface PostCommentResponse {
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
}

interface ApiResponse {
  message: string;
  data: PostCommentResponse;
}

const postCommentCreate = async ({
  post_id,
  body,
  parentCommentId,
}: PostCommentCreateInterface) => {
  const data = JSON.stringify({
    body: body,
    parentCommentId: parentCommentId,
  });

  try {
    const response: AxiosResponse<ApiResponse> = await api.post(
      `${community}/posts/${post_id}/comments`,
      data,
      {
        headers: {
          'user-id': 'user_id',
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log(`댓글 작성 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const usePostCommentCreate = () => {
  return useMutation({
    mutationFn: postCommentCreate,
    onSuccess: () => {
      console.log('댓글 작성 완료');
    },
    onError: (error) => {
      console.error('댓글 작성 실패:', error);
    },
  });
};
