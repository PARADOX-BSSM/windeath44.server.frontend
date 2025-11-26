import { atom } from 'jotai';

export const alerterAtom = atom<
  ((text: JSX.Element, onClick: () => void) => void) | null
>(null);
export const reconfirmAlerterAtom = atom<
  ((icon: string, confirmText: string, onClick: () => void) => void) | null
>(null);
