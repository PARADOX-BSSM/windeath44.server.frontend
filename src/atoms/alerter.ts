import { atom } from 'jotai';

export const alerterAtom = atom<((icon: string, text: JSX.Element, onClick: () => void) => void) | null>(null);