import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import {
  speechBubbleAtom,
  showSpeechBubbleAtom,
  hideSpeechBubbleAtom,
  updateBubblePositionAtom,
  SpeechBubbleState,
} from '@/atoms/speechBubble';

interface ButtonConfig {
  name: string;
  onClick: () => void;
}

interface UseSpeechBubbleReturn {
  bubble: SpeechBubbleState;
  showBubble: (text: string, buttons: [ButtonConfig, ButtonConfig?, ButtonConfig?], x: number, y: number) => void;
  hideBubble: () => void;
  updatePosition: (x: number, y: number) => void;
}

export const useSpeechBubble = (): UseSpeechBubbleReturn => {
  const [bubble, setBubble] = useAtom(speechBubbleAtom);
  const setShowBubbleFunc = useSetAtom(showSpeechBubbleAtom);
  const setHideBubbleFunc = useSetAtom(hideSpeechBubbleAtom);
  const setUpdatePositionFunc = useSetAtom(updateBubblePositionAtom);

  const showBubble = useCallback(
    (text: string, buttons: [ButtonConfig, ButtonConfig?, ButtonConfig?], x: number, y: number) => {
      setBubble({
        show: true,
        x,
        y,
        text,
        buttons,
      });
    },
    [setBubble],
  );

  const hideBubble = useCallback(() => {
    setBubble((prev) => ({
      ...prev,
      show: false,
    }));
  }, [setBubble]);

  const updatePosition = useCallback(
    (x: number, y: number) => {
      setBubble((prev) => {
        if (!prev.show) return prev;
        return {
          ...prev,
          x,
          y,
        };
      });
    },
    [setBubble],
  );

  // 전역에서 사용할 수 있도록 함수 atom에 등록
  useEffect(() => {
    setShowBubbleFunc(() => showBubble);
    setHideBubbleFunc(() => hideBubble);
    setUpdatePositionFunc(() => updatePosition);

    return () => {
      setShowBubbleFunc(null);
      setHideBubbleFunc(null);
      setUpdatePositionFunc(null);
    };
  }, [showBubble, hideBubble, updatePosition, setShowBubbleFunc, setHideBubbleFunc, setUpdatePositionFunc]);

  return {
    bubble,
    showBubble,
    hideBubble,
    updatePosition,
  };
};

export default useSpeechBubble;
