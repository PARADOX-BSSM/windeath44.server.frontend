import React from 'react';
import * as _ from './style';
import { useState, useRef, useEffect } from 'react';
import Seori from '@/assets/seori/seori_mini.png';
import Heart from '@/assets/community/heart_line.svg';
import HeartFill from '@/assets/community/heart_fill.svg';
import KebabIcon from '@/assets/community/kebab_icon.svg';
import { useGetUserMutation } from '@/api/user/getUser';
import { usePostCommentDelete } from '@/api/community/postCommentDelete';
import { usePostCommentLike } from '@/api/community/postCommentLike';
import { usePostCommentLikeDelete } from '@/api/community/postCommentLikeDelete';
import { useIsPostCommentLiked } from '@/api/community/isPostCommentLiked';
import { usePostCommentUpdate } from '@/api/community/postCommentUpdate';
import { alerterAtom } from '@/atoms/alerter';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

interface User {
  name: string;
  userId: string;
  profile?: string;
}
interface Post {
  postId: number;
  commentId: number;
  body: string;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}
interface PostsProps {
  user: User;
  post: Post;
  refetchComments: () => void;
  parentCommentId?: number | null;
  currentUserName?: string;
  currentUserId?: string;
  currentUserProfile?: string;
  onReplyClick?: () => void;
  showReplyForm?: boolean;
}

const Posts: React.FC<PostsProps> = ({
  user,
  post,
  refetchComments,
  parentCommentId = null,
  onReplyClick,
  showReplyForm = false,
}) => {
  const { name, userId, profile } = user;
  const { commentId, body, likesCount, createdAt, updatedAt } = post;
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);
  const [isLike, setIsLike] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);

  const { mutate: getUser, data: userData } = useGetUserMutation();
  const loggedInUserId = userData?.data?.userId;
  const commentDeleteMutation = usePostCommentDelete();
  const commentUpdateMutation = usePostCommentUpdate();
  const commentLikeMutation = usePostCommentLike();
  const commentLikeDeleteMutation = usePostCommentLikeDelete();

  const { data: commentLikedData } = useIsPostCommentLiked(commentId, loggedInUserId || '');

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (commentLikedData?.data) {
      setIsLike(commentLikedData.data);
    }
  }, [commentLikedData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleKebabClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedBody(body);
  };

  const handleEditSave = () => {
    if (!editedBody.trim()) {
      setAlert?.(<>댓글 내용을 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    commentUpdateMutation.mutate(
      {
        commentId: post.commentId,
        user_id: loggedInUserId!,
        body: editedBody,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          refetchComments();
        },
        onError: (error) => {
          console.error('댓글 수정 실패:', error);
          setAlert?.(
            <>
              댓글이 수정되지 않았습니다.
              <br />
              잠시 후 다시 시도해주세요
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
        },
      },
    );
  };

  const handleDelete = () => {
    if (setAlert) {
      setAlert(<>댓글을 삭제하시겠습니까?</>, () => {
        if (!post.postId || !post.commentId) {
          console.log('게시글 ID, 혹은 댓글 ID가 없습니다');
          taskTransform?.('경고', '');
          return;
        }
        commentDeleteMutation.mutate(
          { comment_id: post.commentId, user_id: loggedInUserId! },
          {
            onSuccess: () => {
              refetchComments();
              taskTransform?.('경고', '');
            },
            onError: (error) => {
              console.error('댓글 삭제 실패:', error);
              setAlert(
                <>
                  댓글이 삭제되지 않았습니다.
                  <br />
                  잠시 후 다시 시도해주세요
                </>,
                () => {
                  taskTransform?.('경고', '');
                },
              );
            },
          },
        );
        setIsOpen(false);
      });
    }
  };

  const likeHandle = () => {
    if (!loggedInUserId) {
      setAlert?.(<>로그인이 필요합니다.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    if (isLike) {
      commentLikeDeleteMutation.mutate(
        { comment_id: post.commentId, user_id: loggedInUserId },
        {
          onSuccess: () => setIsLike(false),
          onError: () => {},
        },
      );
    } else {
      commentLikeMutation.mutate(
        { comment_id: post.commentId, user_id: loggedInUserId },
        {
          onSuccess: () => setIsLike(true),
          onError: () => {},
        },
      );
    }
  };

  // 로그인한 유저가 댓글 작성자인지 확인
  const isOwner = loggedInUserId && loggedInUserId === userId;

  return (
    <_.Post isReply={!!parentCommentId}>
      <_.Line></_.Line>
      <_.ProfileImg imgUrl={profile || Seori} />
      <_.PostMain>
        <_.PostHeader>
          <_.PostInfo>
            <_.Name>{name}</_.Name>
            <_.UserId>@{userId}</_.UserId>
            <_.Edited>
              {createdAt.slice(0, 19) !== updatedAt.slice(0, 19) ? '(수정됨)' : ''}
            </_.Edited>
          </_.PostInfo>
          {isOwner && (
            <_.KebabContainer ref={menuRef}>
              <_.KebabBtn
                onClick={handleKebabClick}
                onMouseDown={() => setCursorImage(CURSOR_IMAGES.click)}
                onMouseUp={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                <_.Icon
                  src={KebabIcon}
                  alt="메뉴"
                />
              </_.KebabBtn>
              {isOpen && (
                <_.ContextMenu>
                  <_.MenuItem
                    onClick={handleEdit}
                    onMouseDown={() => setCursorImage(CURSOR_IMAGES.click)}
                    onMouseUp={() => setCursorImage(CURSOR_IMAGES.hand)}
                    onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                    onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                  >
                    수정
                  </_.MenuItem>
                  <_.MenuItem
                    onClick={handleDelete}
                    onMouseDown={() => setCursorImage(CURSOR_IMAGES.click)}
                    onMouseUp={() => setCursorImage(CURSOR_IMAGES.hand)}
                    onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                    onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                  >
                    삭제
                  </_.MenuItem>
                </_.ContextMenu>
              )}
            </_.KebabContainer>
          )}
        </_.PostHeader>
        {isEditing ? (
          <>
            <_.EditInputArea>
              <_.EditInput
                type="text"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                placeholder="댓글을 수정하세요"
                onMouseDown={() => setCursorImage(CURSOR_IMAGES.click)}
                onMouseUp={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              />
            </_.EditInputArea>
            <_.EditBtnGroup>
              <_.EditBtn
                onClick={handleEditSave}
                onMouseDown={() => setCursorImage(CURSOR_IMAGES.click)}
                onMouseUp={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                저장
              </_.EditBtn>
              <_.EditBtn
                onClick={handleEditCancel}
                onMouseDown={() => setCursorImage(CURSOR_IMAGES.click)}
                onMouseUp={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                취소
              </_.EditBtn>
            </_.EditBtnGroup>
          </>
        ) : (
          <_.PostContent>{body}</_.PostContent>
        )}
        <_.PostInfo>
          <_.Icons>
            <_.Icon
              src={isLike ? HeartFill : Heart}
              alt="PostHeart"
              onClick={likeHandle}
              onMouseDown={() => setCursorImage(CURSOR_IMAGES.click)}
              onMouseUp={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            />
            {likesCount}
          </_.Icons>
          {!parentCommentId && (
            <_.ReplyButton
              onClick={onReplyClick}
              onMouseDown={() => setCursorImage(CURSOR_IMAGES.click)}
              onMouseUp={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            >
              {showReplyForm ? '답글 닫기' : '답글'}
            </_.ReplyButton>
          )}
        </_.PostInfo>
      </_.PostMain>
    </_.Post>
  );
};

export default Posts;
