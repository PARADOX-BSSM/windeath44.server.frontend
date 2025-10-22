import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import * as _ from './style';

interface PropsType {
  name: string;
  selected?: boolean;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void);
  type?: string;
}

const CommunityBtn = ({
  name,
  selected = false,
  onClick,
  type = 'none',
}: PropsType) => {

  if (type === 'submit') {
    return (
      <_.SubmitActive
        onClick={onClick}
        onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
        onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
      >
        {name}
      </_.SubmitActive>
    );
  } else if (type === 'menu') {
    return !selected ? (
      <_.Btn
        onClick={onClick}
        onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
        onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
      >
        {name}
      </_.Btn>
    ) : (
      <_.SelectedBtn
        onMouseEnter={() => setCursorImage(CURSOR_IMAGES.block)}
        onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
      >
        {name}
      </_.SelectedBtn>
    );
  }

  return null;
};

export default CommunityBtn;
