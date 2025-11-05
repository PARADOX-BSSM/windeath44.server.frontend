import React from 'react';
import * as _ from './style';
import ProfileImg from '@/assets/profile/choten.svg';
import Heart from '@/assets/community/heart_line.svg';
import CommentIcon from '@/assets/community/comment.svg';

interface User {
  name: string;
  userId: string;
  profile?: string;
}
interface Post {
  postId: number;
  title: string;
  body: string;
  postImage: string;
  commentCount: number;
  likesCount: number;
  createdAt: string;
}
interface PostsProps {
  user: User;
  post: Post;
  onClick: (() => void) | ((e: React.MouseEvent<HTMLDivElement>) => Promise<void> | void);
}
const PostPreview: React.FC<PostsProps> = ({ user, post, onClick }) => {
  const { name, userId, profile = '' } = user;
  const { title, body, commentCount = 0, likesCount = 0, postImage = '', createdAt } = post;

  return (
    <_.Post onClick={() => onClick()}>
      <_.Main>
        <_.ProfileImg imgUrl={profile || ProfileImg} />
        <_.PostMain>
          <_.PostInfo>
            <_.Name>{name}</_.Name>
            <_.UserId>@{userId}</_.UserId>
          </_.PostInfo>
          <_.Content>
            <_.PostTitle>{title}</_.PostTitle>
            <_.PostContent>{body}</_.PostContent>
          </_.Content>
          <_.Datetime>{createdAt}</_.Datetime>
          <_.PostInfo>
            <_.Icons>
              <_.Icon
                src={Heart}
                alt="PostHeart"
                width="10px"
                height="10px"
              />
              {commentCount}
            </_.Icons>
            <_.Icons>
              <_.Icon
                src={CommentIcon}
                alt="PostComment"
                width="10px"
                height="10px"
              />
              {likesCount}
            </_.Icons>
          </_.PostInfo>
        </_.PostMain>
      </_.Main>
      <_.PostImg imgUrl={postImage} />
    </_.Post>
  );
};

export default PostPreview;
