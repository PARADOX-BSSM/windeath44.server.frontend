import React from 'react';
import * as _ from './style';
import ProfileImg from '@/assets/profile/choten.svg';
import Emoticon from '@/assets/community/emoticon.svg';
import CommunityBtn from '../communityBtn';
import { useState } from 'react';
import { usePostCommentCreate } from '@/api/community/postCommentCreate';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import { alerterAtom } from '@/atoms/alerter';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';

interface CommentInputProps {
  name?: string;
  userId?: string;
  postId: number;
  profile?: string;
  parentCommentId?: number | null;
  refetchComments?: () => void;
}
const CommentInput: React.FC<CommentInputProps> = ({
  name = '게스트',
  userId = 'guest_user',
  postId,
  profile = '',
  parentCommentId,
  refetchComments,
}) => {
  const postCreateCommentMutation = usePostCommentCreate();
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);

  const createComment = () => {
    postCreateCommentMutation.mutate(
      {
        post_id: postId,
        user_id: userId,
        body: commentInput,
        parentCommentId: parentCommentId,
      },
      {
        onSuccess: () => {
          console.log('댓글 작성 완료');
          setCommentInput('');
          if (refetchComments) {
            refetchComments();
          }
        },

        onError: () => {
          if (setAlert) {
            setAlert(Seori, <>댓글이 작성되지 않았습니다.</>, () => {
              taskTransform?.('경고', '');
            });
          }
        },
      },
    );
  };

  const [commentInput, setCommentInput] = useState<string>('');

  return (
    <_.Post>
      <_.Line></_.Line>
      <_.ProfileImg imgUrl={profile || ProfileImg} />
      <_.PostMain>
        <_.PostInfo>
          <_.Name>{name}</_.Name>
          <_.UserId>@{userId}</_.UserId>
        </_.PostInfo>
        <_.CommentMain>
          <_.InputArea>
            <_.Input
              type="text"
              placeholder={
                parentCommentId
                  ? '자유롭게 대댓글을 작성해보세요!'
                  : '자유롭게 의견을 작성해보세요!'
              }
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <_.Icon src={Emoticon} />
          </_.InputArea>

          <CommunityBtn
            name="게시"
            type="submit"
            onClick={createComment}
          />
        </_.CommentMain>
      </_.PostMain>
    </_.Post>
  );
};

export default CommentInput;
