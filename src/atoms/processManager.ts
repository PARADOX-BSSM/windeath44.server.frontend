import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { TaskType } from '@/modules/typeModule.tsx';

export type SavedTaskType = {
  type: string;
  id: number | undefined;
  instanceId?: string;
  name: string;
  position?: { 
    top: number; 
    left: number; 
    width: number; 
    height: number 
  };
  desktopIndex?: number;
};

export const taskManagerAtom = atom<TaskType[]>([]);
export const lastTaskListAtom = atomWithStorage<SavedTaskType[][]>('lastTaskList',[[]]);
export const windowPositionsAtom = atom<Record<string, { top: number; left: number; width: number; height: number }>>({});

export const virtualDesktopIndexAtom = atom<number>(0);
export const virtualTaskListsAtom = atom<TaskType[][]>([[]]);
export const virtualWindowPositionsAtom = atom<Record<string, { top: number; left: number; width: number; height: number }>[]>([{}]);
