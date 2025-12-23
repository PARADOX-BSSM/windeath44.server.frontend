import React from 'react';
import * as _ from './style';

interface draftPostInterface {
  title: string;
  body: string;
  postId: number;
  onSelect: (postId: number, title: string, body: string) => void;
  onDelete: (postId: number) => void;
}
const DraftPost: React.FC<draftPostInterface> = ({
  title,
  body,
  postId,
  onSelect,
  onDelete,
}) => {
  return (
    <_.Post>
      <_.PostText>
        <_.PostTitle>{title}</_.PostTitle>
        <_.PostContent>{body}</_.PostContent>
      </_.PostText>
      <_.PostBtnArea>
        <_.PostBtn onClick={() => onSelect(postId, title, body)}>선택</_.PostBtn>
        <_.PostBtn onClick={() => onDelete(postId)}>삭제</_.PostBtn>
      </_.PostBtnArea>
    </_.Post>
  );
};

export default DraftPost;
