import { TaskType } from '@/modules/typeModule';
import { atom } from 'jotai';

export const taskTransformerAtom = atom<((from: string, to: string) => void) | null>(null);
export const taskSearchAtom = atom<((i_want_to_find_it: string, stack?: any, push?: any, pop?: any, top?: any) => TaskType | null) | null>(null);