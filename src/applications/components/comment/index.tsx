import * as _ from './style';
import ameImg from '@/assets/profile/ame.svg';
import chotenImg from '@/assets/profile/choten.svg';
import { useState } from 'react';

interface PropsType {
  // nickname: string;
  userid: string;
  content: string;
  idx: number;
  commentId: number;
  parentId?: number;
  onReplySubmit?: (commentId: number, content: string) => void;
}

const Comment = ({ userid, content, idx, commentId, parentId, onReplySubmit }: PropsType) => {
  // console.log(idx);
  const imgUrl = idx % 2 === 0 ? ameImg : chotenImg;
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  // console.log(imgUrl);

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    if (onReplySubmit) {
      onReplySubmit(commentId, replyContent);
    }
    setReplyContent('');
    setShowReplyForm(false);
  };

  return (
    <>
      <_.CommentDiv $isReply={!!parentId}>
        <_.ProfileImg imgUrl={imgUrl} />
        <_.TextBox>
          <_.NickNameContainer>
            {/*<_.NickName>{nickname}</_.NickName>*/}
            <_.UserId>@{userid}</_.UserId>
          </_.NickNameContainer>
          <_.Content>{content}</_.Content>
          {!parentId && (
            <_.ReplyButton onClick={() => setShowReplyForm(!showReplyForm)}>
              답글 입력
            </_.ReplyButton>
          )}
        </_.TextBox>
      </_.CommentDiv>
      {showReplyForm && (
        <_.ReplyFormContainer>
          <_.ReplyForm onSubmit={handleReplySubmit}>
            <_.ReplyInput
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="답글을 입력하세요."
              maxLength={250}
            />
            <_.CharCount>{replyContent.length}/250</_.CharCount>
          </_.ReplyForm>
        </_.ReplyFormContainer>
      )}
    </>
  );
};

export default Comment;
