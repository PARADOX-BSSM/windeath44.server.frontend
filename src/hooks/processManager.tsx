import { TaskType } from '@/modules/typeModule.tsx';
import { useAtom, useSetAtom } from 'jotai';
import {
  taskManagerAtom,
  lastTaskListAtom,
  windowPositionsAtom,
  virtualDesktopIndexAtom,
  virtualTaskListsAtom,
  virtualWindowPositionsAtom,
  SavedTaskType,
} from '@/atoms/processManager.ts';
import { focusAtom } from '@/atoms/windowManager';
 import { backgroundTaskListAtom } from '@/atoms/processManager';
import { useEffect, useRef, useState } from 'react';
import { STACK_KEY_MAP, STACK_EXCLUDE_NAMES, STACK_ALL_KEYS } from '@/config/stackStorage';

type Position = { top: number; left: number; width: number; height: number };

export const useProcessManager = (): [
  TaskType[],
  (task: TaskType, position?: Position) => void,
  (task: TaskType) => void,
  (positions: Record<string, Position>, index?: number) => void,
  TaskType[],
] => {
  const [globalTaskList, setGlobalTaskList] = useAtom(taskManagerAtom);
  const [virtualTaskLists] = useAtom(virtualTaskListsAtom);
  const [virtualTaskList, addVirtualTask, removeVirtualTask] = useVirtualProcessManager();
  const [, setLastTaskList] = useAtom(lastTaskListAtom);
  const [windowPositions, setWindowPositions] = useAtom(windowPositionsAtom);
  const [virtualWindowPositions, setVirtualWindowPositions] = useAtom(virtualWindowPositionsAtom);
  const [desktopIndex] = useAtom(virtualDesktopIndexAtom);
  const setFocus = useSetAtom(focusAtom);

 
  const [backgroundTaskList, setBackgroundTaskList] = useAtom(backgroundTaskListAtom);

  const isInitialMount = useRef(true);
  const setVirtualWindowPosition = (positions: Record<string, Position>, index?: number) => {
    setVirtualWindowPositions((prev) => {
      const targetIndex = index ?? desktopIndex;
      const updated = [...prev];
      updated[targetIndex] = { ...updated[targetIndex], ...positions };
      return updated;
    });
  };
  // 데스크탑 전환 시 위치 복원
  useEffect(() => {
    if (desktopIndex !== undefined)
      setWindowPositions({ ...(virtualWindowPositions[desktopIndex] || {}) });
    setWindowPositions(virtualWindowPositions[desktopIndex]);
  }, [desktopIndex, virtualWindowPositions[desktopIndex]]);

  // Task 저장 (lastTaskList)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const excludedPages = [
      'MemorialApply',
      '추모관 수정',
      '미리보기',
      '로그인',
      '회원가입',
      '이메일 인증',
      '인증코드 입력',
      '비밀번호 재설정',
      '공지사항',
      '공지사항 뷰어',
      '경고',
    ];

    const savedTasks: SavedTaskType[][] = virtualTaskLists.map((tasks, idx) =>
      tasks
        .filter((t) => !excludedPages.includes(t.name))
        .map((t) => {
          const isExcluded = STACK_EXCLUDE_NAMES.has(t.name);
          const stackKey = STACK_KEY_MAP[t.name];
          const stackData =
            !isExcluded && stackKey && typeof window !== 'undefined'
              ? localStorage.getItem(stackKey) || undefined
              : undefined;

          return {
            type: t.type,
            id: t.id,
            name: t.name,
            position: virtualWindowPositions[idx]?.[t.name],
            desktopIndex: idx,
            stackKey,
            stackData,
          };
        }),
    );

    setLastTaskList(savedTasks);

    // 현재 유지할 스택 스토리지 키를 추려내고 나머지는 삭제
    const activeKeys = new Set<string>();
    savedTasks.forEach((desktop) =>
      desktop.forEach((task) => {
        if (task.stackKey && task.stackData) activeKeys.add(task.stackKey);
      }),
    );
    STACK_ALL_KEYS.forEach((key) => {
      if (!activeKeys.has(key)) {
        try {
          localStorage.removeItem(key);
        } catch (e) {
          console.warn('Failed to clear stale stack storage', key, e);
        }
      }
    });
  }, [virtualTaskList, windowPositions, virtualWindowPositions, desktopIndex]);

  const addTask = (task: TaskType) => {
    if (task.isBackgrounding) {
      setBackgroundTaskList((prev) => [...prev, task]);
    }else {
      if (task.type === 'Shell') {
        // Shell은 이미 있으면 포커스, 없으면 추가
        const existingTask = globalTaskList.find((t) => t.name === task.name);
        if (existingTask) {
          setFocus(existingTask.instanceId || existingTask.name);
          return;
        }
        setGlobalTaskList((prev) => [...prev, task]);
      } else {
        // App은 현재 가상 데스크탑에서 확인
        const existingTask = virtualTaskList.find(
          (t) => t.name === task.name && t.name !== '추모관 뷰어',
        );
        if (existingTask) {
          setFocus(existingTask.instanceId || existingTask.name);
          return;
        }
        addVirtualTask(task);
      }
    } 
  };

  const removeTask = (task: TaskType) => {
    if (task.isBackgrounded) {
      setBackgroundTaskList((prev) => prev.filter((t) => t.name !== task.name));
    }
    if (task.type === 'Shell') {
      setGlobalTaskList((prev) => prev.filter((t) => t.name !== task.name));
    } else {
      removeVirtualTask(task);
    }
  };

  const taskList = [...globalTaskList, ...virtualTaskList];
  return [taskList, addTask, removeTask, setVirtualWindowPosition, backgroundTaskList] as const;
};

// --- Virtual Process Manager ---
export const useVirtualProcessManager = (): [
  TaskType[],
  (task: TaskType) => void,
  (task: TaskType) => void,
  (task: TaskType, index: number) => void,
] => {
  const [desktopIndex] = useAtom(virtualDesktopIndexAtom);
  const [virtualTaskLists, setVirtualTaskLists] = useAtom(virtualTaskListsAtom);

  const taskList = virtualTaskLists[desktopIndex] || [];

  const addTaskToDesktop = (task: TaskType, index: number) => {
    setVirtualTaskLists((prev) => {
      const updated = [...prev];
      const targetList = updated[index] || [];
      if (targetList.some((t) => t.name === task.name && t.name !== '추모관 뷰어')) return prev;
      updated[index] = [...targetList, task];
      return updated;
    });
  };

  const addTask = (task: TaskType) => addTaskToDesktop(task, desktopIndex);

  const removeTask = (task: TaskType) => {
    setVirtualTaskLists((prev) => {
      const updated = [...prev];
      const currentList = updated[desktopIndex] || [];
      updated[desktopIndex] = currentList.filter((item) =>
        item.instanceId ? item.instanceId !== task.instanceId : item.name !== task.name,
      );
      return updated;
    });
  };
  return [taskList, addTask, removeTask, addTaskToDesktop] as const;
};
