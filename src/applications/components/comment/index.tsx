import * as _ from './style';
import verificationBadge from '@/assets/verification.png';
import { useState, useEffect } from 'react';
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
  isOfficial?: boolean;
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
  isOfficial,
  onReplySubmit,
  onEditSubmit,
  onDeleteSubmit,
  onLikeToggle,
}: PropsType) => {
  // console.log(idx);
  const imgUrl = userProfile;
  const displayName = userName || userid;

  // official 계정의 경우 userid에서 1,2,4번째 요소만 추출
  const displayUserId =
    isOfficial && userid.startsWith('official-windeath44-')
      ? (() => {
          const parts = userid.split('-');
          return `${parts[0]}-${parts[1]}-${parts[3]}`;
        })()
      : userid;

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  // console.log(imgUrl);

  const isOwner = currentUserId === userid;
  const isPending = commentId < 0; // 음수 ID는 임시 댓글 (아직 서버에 등록 중)

  // 이미지 로딩 상태 추적
  useEffect(() => {
    if (!userProfile) {
      // userProfile이 없으면 스켈레톤 유지
      setImageLoaded(false);
      return;
    }

    setImageLoaded(false);
    setImageError(false);

    const img = new Image();
    img.src = userProfile;

    img.onload = () => {
      setImageLoaded(true);
    };

    img.onerror = () => {
      setImageError(true);
      setImageLoaded(false); // 에러 시에도 스켈레톤 유지
    };
  }, [userProfile]);

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
        {imageLoaded && userProfile ? (
          <_.ProfileImg imgUrl={imgUrl} />
        ) : (
          <_.ProfileImgSkeleton />
        )}
        <_.TextBox>
          <_.NickNameContainer>
            {userName && (
              <_.NameWithBadge>
                <_.NickName>{displayName}</_.NickName>
                {isOfficial && (
                  <_.VerifiedBadge
                    src={verificationBadge}
                    alt="인증 뱃지"
                  />
                )}
              </_.NameWithBadge>
            )}
            <_.UserId>@{displayUserId}</_.UserId>
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
                {isOwner && !isPending && (
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
