import { atom } from 'jotai';
import { TaskType } from '@/modules/typeModule.tsx';
import { atomWithStorage } from 'jotai/utils';

// localStorage에 저장할 수 있는 간소화된 태스크 타입
export type SavedTaskType = {
  type: string;
  id: number | undefined;
  instanceId?: string;
  name: string;
};

export const taskManagerAtom = atom<TaskType[]>([]);
export const lastTaskListAtom = atomWithStorage<SavedTaskType[]>('lastTaskList', []);
