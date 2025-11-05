import React from 'react';
import * as _ from './style';
import ProfileImg from '@/assets/profile/choten.svg';
import Heart from '@/assets/community/heart_line.svg';
import CommentIcon from '@/assets/community/comment.svg';
import KebabIcon from '@/assets/community/kebab_icon.svg';
import { parseCustomContent } from '@/lib/customTag/parseCustomContent';

interface PostData {
  postId: number;
  userId: string;
  name: string;
  profile: string;
  title: string;
  body: string;
  createdAt: string;
  likesCount: number;
  commentCount: number;
}

interface PostsProps {
  postData: PostData;
}

const Posts: React.FC<PostsProps> = ({ postData }) => {
  const arr: string[] = [];
  const parsedContent = parseCustomContent(arr, postData.body);

  return (
    <_.Post>
      <_.Main>
        <_.ProfileImg imgUrl={postData.profile || ProfileImg} />
        <_.PostMain>
          <_.PostInfo>
            <_.Name>{postData.name}</_.Name>
            <_.UserId>@{postData.userId}</_.UserId>
          </_.PostInfo>
          <_.Content>
            <_.PostTitle>{postData.title}</_.PostTitle>
            <_.PostContent>{parsedContent}</_.PostContent>
          </_.Content>
          <_.Datetime>{postData.createdAt}</_.Datetime>
          <_.PostInfo>
            <_.Icons>
              <_.Icon
                src={Heart}
                alt="PostHeart"
                width="10px"
                height="10px"
              />
              {postData.likesCount}
            </_.Icons>
            <_.Icons>
              <_.Icon
                src={CommentIcon}
                alt="PostComment"
                width="10px"
                height="10px"
              />
              {postData.commentCount}
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
