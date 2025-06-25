import { atom } from 'jotai';

export const changeToSignUpAtom = atom<(() => void) | null>(null);