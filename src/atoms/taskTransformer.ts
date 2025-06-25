import { atom } from 'jotai';

export const taskTransformerAtom = atom<((from: string, to: string) => void) | null>(null);