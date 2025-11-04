import { TaskType } from '@/modules/typeModule.tsx';
import { useAtom } from 'jotai';
import {
  taskManagerAtom,
  lastTaskListAtom,
  windowPositionsAtom,
  virtualDesktopIndexAtom,
  virtualTaskListsAtom,
  virtualWindowPositionsAtom,
  SavedTaskType,
} from '@/atoms/processManager.ts';
import { useEffect, useRef } from 'react';

type Position = { top: number; left: number; width: number; height: number };

export const useProcessManager = (): [
  TaskType[],
  (task: TaskType, position?: Position) => void,
  (task: TaskType) => void,
  (positions: Record<string, Position>) => void
] => {
  const [globalTaskList, setGlobalTaskList] = useAtom(taskManagerAtom);
  const [virtualTaskList, addVirtualTask, removeVirtualTask] = useVirtualProcessManager();
  const [, setLastTaskList] = useAtom(lastTaskListAtom);
  const [windowPositions, setWindowPositions] = useAtom(windowPositionsAtom);
  const [virtualWindowPositions, setVirtualWindowPositions] = useAtom(virtualWindowPositionsAtom);
  const [desktopIndex] = useAtom(virtualDesktopIndexAtom);

  const isInitialMount = useRef(true);
  const setVirtualWindowPosition = (positions: Record<string, Position>) => {
    setVirtualWindowPositions(prev => {
      const updated = [...prev];
      updated[desktopIndex] = { ...updated[desktopIndex], ...positions }; // 기존 값 대체
      return updated;
    });
  };
  // 데스크탑 전환 시 위치 복원
  useEffect(() => {
    if(desktopIndex !== undefined) setWindowPositions({ ...(virtualWindowPositions[desktopIndex] || {}) });
  }, [desktopIndex]);
  useEffect(() => {
    setWindowPositions(virtualWindowPositions[desktopIndex]);
    console.log(virtualWindowPositions[desktopIndex]);
  }, [virtualWindowPositions[desktopIndex]]);

  // Task 저장 (lastTaskList)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const excludedPages = [
      'MemorialApply','추모관 수정','미리보기','로그인','회원가입',
      '이메일 인증','인증코드 입력','비밀번호 재설정',
      '공지사항','공지사항 뷰어',
    ];

    const savedTasks: SavedTaskType[] = [...globalTaskList, ...virtualTaskList]
      .filter(t => t.type === 'App' && !t.instanceId && !excludedPages.includes(t.name))
      .map(t => ({
        type: t.type,
        id: t.id,
        name: t.name,
        position: t.type === 'Shell'
          ? windowPositions[t.name]
          : virtualWindowPositions[desktopIndex]?.[t.name],
      }));

    setLastTaskList(savedTasks);
  }, [globalTaskList, virtualTaskList, windowPositions, virtualWindowPositions, desktopIndex, setLastTaskList]);

  const addTask = (task: TaskType) => {
    if (task.type === 'Shell') {
      setGlobalTaskList(prev => prev.some(t => t.name === task.name) ? prev : [...prev, task]);
    } else {
      addVirtualTask(task);
    }
  };

  const removeTask = (task: TaskType) => {
    if (task.type === 'Shell') {
      setGlobalTaskList(prev => prev.filter(t => t.name !== task.name));
    } else {
      removeVirtualTask(task);
    }
  };

  const taskList = [...globalTaskList, ...virtualTaskList];
  return [taskList, addTask, removeTask, setVirtualWindowPosition] as const;
};

// --- Virtual Process Manager ---
const useVirtualProcessManager = (): [
  TaskType[],
  (task: TaskType) => void,
  (task: TaskType) => void
] => {
  const [desktopIndex] = useAtom(virtualDesktopIndexAtom);
  const [virtualTaskLists, setVirtualTaskLists] = useAtom(virtualTaskListsAtom);

  const taskList = virtualTaskLists[desktopIndex] || [];

  const setTaskList = (newListOrFn: TaskType[] | ((prev: TaskType[]) => TaskType[])) => {
    setVirtualTaskLists(prev => {
      const updated = [...prev];
      updated[desktopIndex] =
        typeof newListOrFn === 'function'
          ? (newListOrFn as (prev: TaskType[]) => TaskType[])([...(updated[desktopIndex] || [])])
          : newListOrFn;
      return updated;
    });
  };

  const addTask = (task: TaskType) => {
    setTaskList(prev => {
      if (prev.some(t => t.name === task.name)) return prev;
      return [...prev, task];
    });
  };

  const removeTask = (task: TaskType) => {
    setTaskList(prev => {
      const filtered = prev.filter(
        (item)=>item.instanceId ? item.instanceId !== task.instanceId : item.name !== task.name,
      );
      return filtered;
    });
  };

  return [taskList, addTask, removeTask];
};
