import { atom } from 'recoil';

export const focusState = atom<string>({
  key: 'focusState',
  default: 'Discover',
});

export const backUpFocusState = atom<string>({
    key: 'backUpFocusState',
    default: 'Discover',
  });