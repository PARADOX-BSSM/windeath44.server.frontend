import React from 'react';
import * as _ from './style';

interface MoreCommentProps {
  num: number;
  onClick: () => void;
  isExpanded?: boolean;
}

const MoreComment: React.FC<MoreCommentProps> = ({ num, onClick, isExpanded = false }) => {
  return (
    <_.Container onClick={onClick}>
      <_.More>{isExpanded ? '- 접기' : `+ 더보기 ${num}개`}</_.More>
    </_.Container>
  );
};

export default MoreComment;
