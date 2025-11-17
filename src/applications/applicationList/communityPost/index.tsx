import React from 'react';
import * as _ from './style';
import Posts from '@/applications/components/posts';
import Comment from '@/applications/components/communityComment';
import CommentInput from '@/applications/components/commentInput';
import JudgementPreview from '@/applications/components/judgementPreview';
import chevron from '@/assets/community/chevron-left.svg';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import { alerterAtom } from '@/atoms/alerter';
import { usePostSingleSearch } from '@/api/community/postSingleSearch';
import { usePostCommentListSearch } from '@/api/community/postCommentListSearch';
import { useGetUserMutation } from '@/api/user/getUser';
import { getCookie } from '@/api/auth/cookie';
import { useEffect, useState } from 'react';

interface postProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  postId: number;
}

const CommunityPost = ({ stack, push, pop, top, postId }: postProps) => {
  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  const { data } = usePostSingleSearch(postId);
  const { data: postCommentsData, refetch: refetchComments } = usePostCommentListSearch(postId);
  const getUserMutation = useGetUserMutation();
  const token = getCookie('access_token');

  const [currentUser, setCurrentUser] = useState<{
    name: string;
    userId: string;
    profile?: string;
  } | null>(null);

  useEffect(() => {
    if (token) {
      getUserMutation.mutate(undefined, {
        onSuccess: (response: any) => {
          setCurrentUser({
            name: response.data?.name || '사용자',
            userId: response.data?.userId || 'user',
            profile: response.data?.profile,
          });
        },
        onError: () => {
          setCurrentUser({
            name: '사용자',
            userId: 'userId',
          });
        },
      });
    } else {
      setCurrentUser({
        name: '게스트',
        userId: 'guest_user',
      });
    }
  }, [token]);

  const taskSearch = useAtomValue(taskSearchAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);

  return (
    <_.Container>
      <_.Main>
        <_.Header>
          <_.BtnIcon onClick={() => push(taskSearch?.('communityMain', stackProps))}>
            <_.Icon src={chevron} />
          </_.BtnIcon>
          {data?.data.name || '사용자'}님의 게시글
        </_.Header>
        <_.PostArea>
          <Posts
            user={{ name: data?.data.name || '사용자', userId: data?.data.userId || 'userId' }}
            post={{
              postId: postId,
              title: data?.data.title || 'title',
              body: data?.data.body || 'body',
              createdAt: data?.data.createdAt || 'createdAt',
              likesCount: data?.data.likesCount || 0,
              commentCount: data?.data.commentCount || 0,
            }}
          />
          <CommentInput
            name={currentUser?.name}
            userId={currentUser?.userId}
            postId={postId}
            profile={currentUser?.profile}
            refetchComments={refetchComments}
          />
          {postCommentsData?.data?.map((data) => (
            <Comment
              key={data.commentId}
              user={{ name: data.name, userId: data.userId, profile: data.profile }}
              post={{
                postId: data.postId,
                commentId: data.commentId,
                body: data.body,
                likesCount: data.likesCount,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
              }}
              refetchComments={refetchComments}
            />
          ))}
        </_.PostArea>
      </_.Main>
      <JudgementPreview />
    </_.Container>
  );
};

export default CommunityPost;
