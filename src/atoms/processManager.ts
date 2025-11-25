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
    height: number;
  };
  desktopIndex?: number;
  stackKey?: string;
  stackData?: any;
};

const loadLastTaskList = (): SavedTaskType[][] => {
  try {
    const raw = localStorage.getItem('lastTaskList');
    if (!raw) return [[]]; // null/undefined 처리

    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      // 이미 올바른 2차원 배열
      if (parsed.length > 0 && Array.isArray(parsed[0])) {
        return parsed as SavedTaskType[][];
      }
      // 기존 1차원 배열이면 2차원 배열로 감싸기
      if (parsed.length === 0 || typeof parsed[0] === 'object') {
        return [parsed as SavedTaskType[]];
      }
    }
    // malformed 데이터 처리
    return [[]];
  } catch (e) {
    console.warn('Failed to load lastTaskList from storage, falling back to default', e);
    return [[]];
  }
};

export const taskManagerAtom = atom<TaskType[]>([]);
export const lastTaskListAtom = atomWithStorage<SavedTaskType[][]>('lastTaskList', loadLastTaskList());
export const windowPositionsAtom = atom<Record<string, { top: number; left: number; width: number; height: number }>>({});

export const virtualDesktopIndexAtom = atom<number>(0);
export const virtualTaskListsAtom = atom<TaskType[][]>([[]]);
export const virtualWindowPositionsAtom = atom<Record<string, { top: number; left: number; width: number; height: number }>[]>([{}]);
