import React from 'react';
import * as _ from './style';
import { useState, useRef, useEffect } from 'react';
import ProfileImg from '@/assets/profile/choten.svg';
import Heart from '@/assets/community/heart_line.svg';
import KebabIcon from '@/assets/community/kebab_icon.svg';

interface User {
  name: string;
  userId: string;
  profile?: string;
}
interface Post {
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
  const { body, likesCount, createdAt, updatedAt } = post;
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
      <_.Line></_.Line>
      <_.ProfileImg imgUrl={profile || ProfileImg} />
      <_.PostMain>
        <_.PostHeader>
          <_.PostInfo>
            <_.Name>{name}</_.Name>
            <_.UserId>@{userId}</_.UserId>
            <_.Edited>{createdAt !== updatedAt ? '(수정됨)' : ''}</_.Edited>
          </_.PostInfo>
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
        </_.PostHeader>
        <_.PostContent>{body}</_.PostContent>
        <_.PostInfo>
          <_.Icons>
            <_.Icon
              src={Heart}
              alt="PostHeart"
            />
            {likesCount}
          </_.Icons>
        </_.PostInfo>
      </_.PostMain>
    </_.Post>
  );
};

export default Posts;
