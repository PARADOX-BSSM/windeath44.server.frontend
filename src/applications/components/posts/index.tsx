import React from 'react';
import * as _ from './style';
import { useState, useRef, useEffect } from 'react';
import ProfileImg from '@/assets/profile/choten.svg';
import Heart from '@/assets/community/heart_line.svg';
import CommentIcon from '@/assets/community/comment.svg';
import KebabIcon from '@/assets/community/kebab_icon.svg';
import { parseCustomContent } from '@/lib/customTag/parseCustomContent';

interface User {
  name: string;
  userId: string;
  profile?: string;
}
interface Post {
  postId?: number;
  title: string;
  body: string;
  commentCount: number;
  likesCount: number;
  createdAt: string;
}
interface PostsProps {
  user: User;
  post: Post;
}

const Posts: React.FC<PostsProps> = ({ user, post }) => {
  const arr: string[] = [];
  const parsedContent = parseCustomContent(arr, post.body);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    console.log('수정 클릭');
    setIsOpen(false);
  };

  const handleDelete = () => {
    console.log('삭제 클릭');
    setIsOpen(false);
  };

  return (
    <_.Post>
      <_.Main>
        <_.ProfileImg imgUrl={user.profile || ProfileImg} />
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
                src={Heart}
                alt="PostHeart"
                width="10px"
                height="10px"
                onClick={() => {}}
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
    </_.Post>
  );
};

export default Posts;
