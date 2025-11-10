import React from 'react';
import * as _ from './style';
import { useState, useRef, useEffect } from 'react';
import Seori from '@/assets/seori/seori_mini.png';
import ProfileImg from '@/assets/profile/choten.svg';
import Heart from '@/assets/community/heart_line.svg';
import HeartFill from '@/assets/community/heart_fill.svg';
import KebabIcon from '@/assets/community/kebab_icon.svg';
import { useGetUserMutation } from '@/api/user/getUser';
import { usePostCommentDelete } from '@/api/community/postCommentDelete';
import { usePostCommentLike } from '@/api/community/postCommentLike';
import { usePostCommentLikeDelete } from '@/api/community/postCommentLikeDelete';
import { alerterAtom } from '@/atoms/alerter';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';

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
}
const Posts: React.FC<PostsProps> = ({ user, post }) => {
  const { name, userId, profile = '' } = user;
  const { commentId, body, likesCount, createdAt, updatedAt } = post;
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);
  const [isLike, setIsLike] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);

  const { mutate: getUser, data: userData } = useGetUserMutation();
  const currentUserId = userData?.data?.userId;
  const commentDeleteMutation = usePostCommentDelete();
  const commentLikeMutation = usePostCommentLike();
  const commentLikeDeleteMutation = usePostCommentLikeDelete();

  useEffect(() => {
    getUser();
  }, [getUser]);

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

  const handleEditSave = () => {};

  const handleDelete = () => {
    if (setAlert) {
      setAlert(Seori, <>댓글을 삭제하시겠습니까?</>, () => {
        if (!post.commentId || !post.commentId) {
          console.log('게시글 ID, 혹은 댓글 ID가 없습니다');
          return;
        }
        commentDeleteMutation.mutate(
          { post_id: post.postId, comment_id: post.commentId },
          {
            onSuccess: () => {},
            onError: (error) => {
              console.error('댓글 삭제 실패:', error);
              setAlert(
                Seori,
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
    if (isLike) {
      commentLikeDeleteMutation.mutate(
        { comment_id: post.commentId, user_id: user.userId },
        {
          onSuccess: () => setIsLike(false),
          onError: () => {},
        },
      );
    } else {
      commentLikeMutation.mutate(
        { comment_id: post.commentId, user_id: user.userId },
        {
          onSuccess: () => setIsLike(true),
          onError: () => {},
        },
      );
    }
  };

  // 로그인한 유저가 댓글 작성자인지 확인
  // const isOwner = currentUserId && currentUserId === userId;
  const isOwner = true; // 테스트용: 항상 수정/삭제 가능

  return (
    <_.Post>
      <_.Line></_.Line>
      <_.ProfileImg imgUrl={profile || ProfileImg} />
      <_.PostMain>
        <_.PostHeader>
          <_.PostInfo>
            <_.Name>{name}</_.Name>
            <_.UserId>@{userId}</_.UserId>
            <_.Edited>{createdAt !== updatedAt ? '(수정됨)' : ''}</_.Edited>
          </_.PostInfo>
          {isOwner && (
            <_.KebabContainer ref={menuRef}>
              <_.KebabBtn onClick={handleKebabClick}>
                <_.Icon
                  src={KebabIcon}
                  alt="메뉴"
                />
              </_.KebabBtn>
              {isOpen && (
                <_.ContextMenu>
                  <_.MenuItem onClick={handleEdit}>수정</_.MenuItem>
                  <_.MenuItem onClick={handleDelete}>삭제</_.MenuItem>
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
              />
            </_.EditInputArea>
            <_.EditBtnGroup>
              <_.EditBtn onClick={handleEditSave}>저장</_.EditBtn>
              <_.EditBtn onClick={handleEditCancel}>취소</_.EditBtn>
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
            />
            {likesCount}
          </_.Icons>
        </_.PostInfo>
      </_.PostMain>
    </_.Post>
  );
};

export default Posts;
