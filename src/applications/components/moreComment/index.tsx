import React from 'react';
import * as _ from './style';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

interface MoreCommentProps {
  num: number;
  onClick: () => void;
  isExpanded?: boolean;
}

const MoreComment: React.FC<MoreCommentProps> = ({ num, onClick, isExpanded = false }) => {
  return (
    <_.Container
      onClick={onClick}
      onMouseDown={() => setCursorImage(CURSOR_IMAGES.click)}
      onMouseUp={() => setCursorImage(CURSOR_IMAGES.hand)}
      onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
      onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
    >
      <_.More>{isExpanded ? '- 접기' : `+ 더보기 ${num}개`}</_.More>
    </_.Container>
  );
};

export default MoreComment;
