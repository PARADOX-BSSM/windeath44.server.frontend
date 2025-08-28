import { TaskType } from '@/modules/typeModule';
import { atom } from 'jotai';

export const taskTransformerAtom = atom<((from: string, to: string, props?: any) => void) | null>(
  null,
);
export const taskSearchAtom = atom<
  ((i_want_to_find_it: string, props?: any) => TaskType | null) | null
>(null);
