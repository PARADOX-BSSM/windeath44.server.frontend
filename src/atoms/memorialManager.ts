import { atom } from 'jotai';
import { contentProps } from '@/modules/typeModule.tsx';

export const memorialIdAtom = atom<number>(5);
export const characterIdAtom = atom<number>(11);

export const memorialContentAtom = atom<contentProps>({
  characterId: '',
  content: '',
});
