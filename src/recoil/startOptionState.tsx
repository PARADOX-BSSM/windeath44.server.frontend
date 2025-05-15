import { atom } from 'recoil';

export const startOptionState = atom<boolean>({
  key: 'startOptionState',
  default: false,
});