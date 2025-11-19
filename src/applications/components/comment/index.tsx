import * as _ from './style';
import ameImg from '@/assets/profile/ame.svg';
import { useState } from 'react';
import { setCursorImage, CURSOR_IMAGES } from 'lib/setCursorImg';

interface PropsType {
  // nickname: string;
  userid: string;
  content: string;
  idx: number;
  commentId: number;
  parentId: number | null;
  currentUserId?: string;
  likes: number;
  isLiked: boolean;
  userName?: string;
  userProfile?: string;
  onReplySubmit?: (commentId: number, content: string) => void;
  onEditSubmit?: (commentId: number, content: string) => void;
  onDeleteSubmit?: (commentId: number) => void;
  onLikeToggle?: (commentId: number, isLiked: boolean) => void;
}

const Comment = ({
  userid,
  content,
  idx,
  commentId,
  parentId,
  currentUserId,
  likes,
  isLiked,
  userName,
  userProfile,
  onReplySubmit,
  onEditSubmit,
  onDeleteSubmit,
  onLikeToggle,
}: PropsType) => {
  // console.log(idx);
  const imgUrl = userProfile || ameImg;
  const displayName = userName || userid;
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  // console.log(imgUrl);

  const isOwner = currentUserId === userid;

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    if (onReplySubmit) {
      onReplySubmit(commentId, replyContent);
    }
    setReplyContent('');
    setShowReplyForm(false);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    if (onEditSubmit) {
      onEditSubmit(commentId, editContent);
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  return (
    <>
      <_.CommentDiv $isReply={!!parentId}>
        <_.ProfileImg imgUrl={imgUrl} />
        <_.TextBox>
          <_.NickNameContainer>
            {userName && <_.NickName>{displayName}</_.NickName>}
            <_.UserId>@{userid}</_.UserId>
          </_.NickNameContainer>
          {isEditing ? (
            <_.EditForm onSubmit={handleEditSubmit}>
              <_.EditInput
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                maxLength={250}
                autoFocus
                onMouseEnter={() => {
                  setCursorImage(CURSOR_IMAGES.drag);
                }}
                onMouseLeave={() => {
                  setCursorImage(CURSOR_IMAGES.default);
                }}
              />
              <_.EditButtonGroup>
                <_.CharCount>{editContent.length}/250</_.CharCount>
                <_.EditCancelButton
                  type="button"
                  onClick={handleEditCancel}
                  onMouseEnter={() => {
                    setCursorImage(CURSOR_IMAGES.hand);
                  }}
                  onMouseLeave={() => {
                    setCursorImage(CURSOR_IMAGES.default);
                  }}
                >
                  취소
                </_.EditCancelButton>
                <_.EditSubmitButton
                  type="submit"
                  onMouseEnter={() => {
                    setCursorImage(CURSOR_IMAGES.hand);
                  }}
                  onMouseLeave={() => {
                    setCursorImage(CURSOR_IMAGES.default);
                  }}
                >
                  완료
                </_.EditSubmitButton>
              </_.EditButtonGroup>
            </_.EditForm>
          ) : (
            <>
              <_.Content>{content}</_.Content>
              <_.ActionButtonGroup>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {!parentId && (
                    <>
                      <_.LikeButton
                        $isLiked={isLiked}
                        onClick={() => onLikeToggle?.(commentId, isLiked)}
                        onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                        onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                      >
                        {isLiked ? '♥' : '♡'} {likes}
                      </_.LikeButton>
                      <_.ReplyButton
                        onClick={() => setShowReplyForm(!showReplyForm)}
                        onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                        onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                      >
                        답글 입력
                      </_.ReplyButton>
                    </>
                  )}
                </div>
                {isOwner && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <_.EditButton
                      onClick={() => setIsEditing(true)}
                      onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                      onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                    >
                      수정
                    </_.EditButton>
                    <_.DeleteButton
                      onClick={() => onDeleteSubmit?.(commentId)}
                      onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                      onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                    >
                      삭제
                    </_.DeleteButton>
                  </div>
                )}
              </_.ActionButtonGroup>
            </>
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
