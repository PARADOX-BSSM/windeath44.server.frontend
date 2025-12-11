import { atom } from 'jotai';
import { TaskType } from '@/modules/typeModule';

export const memorialIdAtom = atom<number>(0);
export const userIdAtom = atom<string>('winshine0326');
export const characterIdAtom = atom<number>(11);
export const currentStackTopAtom = atom<TaskType | null>(null);

// 추모관 뷰어 윈도우 이름 관리
export type MemorialViewerInfo = {
  instanceId: string;
  windowName: string;
  characterId: number;
};

export const memorialViewerListAtom = atom<MemorialViewerInfo[]>([]);
