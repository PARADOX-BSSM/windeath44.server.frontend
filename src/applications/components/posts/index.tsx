import React from 'react';
import * as _ from './style';
import { useState, useRef, useEffect } from 'react';
import Heart from '@/assets/community/heart_line.svg';
import HeartFill from '@/assets/community/heart_fill.svg';
import CommentIcon from '@/assets/community/comment.svg';
import KebabIcon from '@/assets/community/kebab_icon.svg';
import Seori from '@/assets/seori/seori_mini.png';
import { parseCustomContent } from '@/lib/customTag/parseCustomContent';
import { useGetUserMutation } from '@/api/user/getUser';
import { usePostDelete } from '@/api/community/postDelete';
import { usePostLike } from '@/api/community/postLike';
import { usePostLikeDelete } from '@/api/community/postLikeDelete';
import { useIsPostLiked } from '@/api/community/isPostLiked';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

interface User {
  name: string;
  userId: string;
  profile?: string;
}
interface Post {
  postId: number;
  title: string;
  body: string;
  commentCount: number;
  likesCount: number;
  createdAt: string;
}
interface PostsProps {
  user: User;
  post: Post;
  postDelete: () => void;
  refetchPost: () => void;
  postEdit?: () => void;
}

const Posts = ({ user, post, postDelete, refetchPost, postEdit }: PostsProps) => {
  const parsedContent = parseCustomContent([], post.body);
  const [isOpen, setIsOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 로그인한 유저 정보 가져오기
  const { mutate: getUser, data: userData } = useGetUserMutation();
  const currentUserId = userData?.data?.userId;
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  const postDeleteMutation = usePostDelete();
  const postLikeMutation = usePostLike();
  const postLikeDeleteMutation = usePostLikeDelete();
  const { data: likedData } = useIsPostLiked(post.postId, currentUserId || '');

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

  useEffect(() => {
    if (likedData?.data) {
      setIsLike(likedData.data);
    }
  }, [likedData]);

  const handleKebabClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    if (postEdit) {
      postEdit();
    }
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (setAlert) {
      setAlert(<>정말 삭제하시겠습니까?</>, () => {
        if (!post.postId) {
          console.log('게시글 ID가 없습니다');
          return;
        }
        postDeleteMutation.mutate(post.postId, {
          onSuccess: () => {
            taskTransform?.('경고', '');
            postDelete();
          },
          onError: (error) => {
            console.error('게시글 삭제 실패:', error);
            if (setAlert) {
              setAlert(
                <>
                  게시글이 삭제되지 않았습니다.
                  <br />
                  잠시 후 다시 시도해주세요
                </>,
                () => {
                  taskTransform?.('경고', '');
                },
              );
            }
          },
        });
        setIsOpen(false);
      });
    }
  };
  const likeHandle = () => {
    if (!currentUserId) {
      setAlert?.(<>로그인이 필요합니다.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    if (isLike) {
      postLikeDeleteMutation.mutate(
        { post_id: post.postId, user_id: currentUserId },
        {
          onSuccess: () => {
            setIsLike(false);
            refetchPost();
          },
          onError: () => {},
        },
      );
    } else {
      postLikeMutation.mutate(
        { post_id: post.postId, user_id: currentUserId },
        {
          onSuccess: () => {
            setIsLike(true);
            refetchPost();
          },
          onError: () => {},
        },
      );
    }
  };

  // 로그인한 유저가 게시글 작성자인지 확인
  const isOwner = currentUserId && currentUserId === user.userId;

  return (
    <_.Post>
      <_.Main>
        <_.ProfileImg imgUrl={user.profile || Seori} />
        <_.PostMain>
          <_.PostInfo>
            <_.Name>{user.name}</_.Name>
            <_.UserId>@{user.userId}</_.UserId>
          </_.PostInfo>
          <_.Content>
            <_.PostTitle>{post.title}</_.PostTitle>
            <_.PostContent>{parsedContent}</_.PostContent>
          </_.Content>
          <_.Datetime>{post.createdAt}</_.Datetime>
          <_.PostInfo>
            <_.Icons>
              <_.Icon
                src={isLike ? HeartFill : Heart}
                alt="PostHeart"
                width="10px"
                height="10px"
                onClick={likeHandle}
                onMouseDown={() => setCursorImage(CURSOR_IMAGES.click)}
                onMouseUp={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              />
              {post.likesCount}
            </_.Icons>
            <_.Icons>
              <_.Icon
                src={CommentIcon}
                alt="PostComment"
                width="10px"
                height="10px"
              />
              {post.commentCount}
            </_.Icons>
          </_.PostInfo>
        </_.PostMain>
      </_.Main>
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
    </_.Post>
  );
};

export default Posts;
