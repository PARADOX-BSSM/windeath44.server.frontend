import * as _ from './style';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

interface ButtonConfig {
  name: string;
  onClick: () => void;
}

interface SpeechBubbleProps {
  x: number;
  y: number;
  text: string;
  buttons: [ButtonConfig, ButtonConfig];
  show: boolean;
}

const SpeechBubble = ({ x, y, text, buttons, show }: SpeechBubbleProps) => {
  if (!show) return null;

  return (
    <_.BubbleContainer x={x} y={y}>
      <_.BubbleText>{text}</_.BubbleText>
      <_.ButtonContainer>
        {buttons.map((button, index) => (
          <_.ClippyButton
            key={index}
            onClick={button.onClick}
            onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
            onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
          >
            {button.name}
          </_.ClippyButton>
        ))}
      </_.ButtonContainer>
    </_.BubbleContainer>
  );
};

export default SpeechBubble;
