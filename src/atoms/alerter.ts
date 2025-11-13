import { atom } from 'jotai';

export const alerterAtom = atom<
  ((icon: string, text: JSX.Element, onClick: () => void) => void) | null
>(null);
export const reconfirmAlerterAtom = atom<
  ((icon: string, confirmText: string, onClick: () => void) => void) | null
>(null);
