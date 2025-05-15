import { atom } from 'recoil';

export const focusState = atom<string>({
  key: 'focusState',
  default: 'Discover',
});