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
  const postCommentsData = usePostCommentListSearch(postId);

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
              title: data?.data.title || 'title',
              body: data?.data.body || 'body',
              createdAt: data?.data.createdAt || 'createdAt',
              likesCount: data?.data.likesCount || 0,
              commentCount: data?.data.commentCount || 0,
            }}
          />
          <CommentInput
            name="방태양"
            userId="noah_byte"
            postId={postId}
          />
          {postCommentsData.data?.comments?.map((data) => (
            <Comment
              user={{ name: data.name, userId: data.userId, profile: data.profile }}
              post={{
                body: data.body,
                likesCount: data.likesCount,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
              }}
            />
          ))}
          <Comment
            user={{ name: '방태양', userId: 'noah_byte', profile: '' }}
            post={{
              body: '아니 이건 진짜 아니지. 살려내라.',
              likesCount: 12,
              createdAt: '',
              updatedAt: '',
            }}
          />
        </_.PostArea>
      </_.Main>
      <JudgementPreview />
    </_.Container>
  );
};

export default CommunityPost;
