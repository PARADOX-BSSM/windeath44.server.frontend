import React from 'react';
import * as _ from './style';
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
      <_.Icon
        src={KebabIcon}
        alt="moreButton"
        width="20px"
        height="20px"
      />
    </_.Post>
  );
};

export default Posts;
