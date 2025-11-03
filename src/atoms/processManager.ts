import { atom } from 'jotai';
import { TaskType } from '@/modules/typeModule.tsx';
import { atomWithStorage } from 'jotai/utils';

// localStorage에 저장할 수 있는 간소화된 태스크 타입 (위치 정보 포함)
export type SavedTaskType = {
  type: string;
  id: number | undefined;
  instanceId?: string;
  name: string;
  position?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
};

export const taskManagerAtom = atom<TaskType[]>([]);
export const lastTaskListAtom = atomWithStorage<SavedTaskType[]>('lastTaskList', []);
// 현재 실행 중인 창들의 위치 정보 (런타임 상태)
export const windowPositionsAtom = atom<Record<string, { top: number; left: number; width: number; height: number }>>({});

// 현재 데스크탑 번호
export const virtualDesktopIndexAtom = atom<number>(0); 
// 각 데스크탑의 taskList를 배열로 관리
export const virtualTaskListsAtom = atom<TaskType[][]>([[]]);
// 각 데스크탑의 창 위치를 저장
export const virtualWindowPositionsAtom = atom<Record<string, any>[]>([{}]);
