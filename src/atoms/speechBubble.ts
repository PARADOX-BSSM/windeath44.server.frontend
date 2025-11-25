import { atom } from 'jotai';

interface ButtonConfig {
  name: string;
  onClick: () => void;
}

export interface SpeechBubbleState {
  show: boolean;
  x: number;
  y: number;
  text: string;
  buttons: [ButtonConfig, ButtonConfig?, ButtonConfig?];
}

export const speechBubbleAtom = atom<SpeechBubbleState>({
  show: false,
  x: 0,
  y: 0,
  text: '',
  buttons: [{ name: '', onClick: () => {} }],
});

// 말풍선 표시 함수를 저장하는 atom
export const showSpeechBubbleAtom = atom<
  ((text: string, buttons: [ButtonConfig, ButtonConfig?, ButtonConfig?], x: number, y: number) => void) | null
>(null);

// 말풍선 숨기기 함수를 저장하는 atom
export const hideSpeechBubbleAtom = atom<(() => void) | null>(null);

// 말풍선 위치 업데이트 함수를 저장하는 atom
export const updateBubblePositionAtom = atom<((x: number, y: number) => void) | null>(null);
