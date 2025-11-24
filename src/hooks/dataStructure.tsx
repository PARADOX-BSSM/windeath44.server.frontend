import { StackSnapshot, TaskType } from '@/modules/typeModule';
import { useCallback, useEffect, useRef, useState } from 'react';
import { STACK_EXCLUDE_NAMES } from '@/config/stackStorage';

type StackHelpers = {
  stack: TaskType[];
  push: (value?: TaskType | null) => void;
  pop: () => void;
  top: () => TaskType | null;
};

type UseStackOptions = {
  storageKey?: string;
  restoreTask?: (snapshot: StackSnapshot, helpers: StackHelpers) => TaskType | null;
};

const useStack = (
  window?: React.CSSProperties,
  setWindow?: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
  setUpHeight?: number,
  setUpWidth?: number,
  options?: UseStackOptions,
) => {
  const [stack, setStack] = useState<TaskType[]>([]);
  const windowRef = useRef<React.CSSProperties | undefined>(window);
  const windowHistoryRef = useRef<React.CSSProperties[]>([]);
  const storageKey = options?.storageKey;
  const restoreTask = options?.restoreTask;
  const hasHydratedRef = useRef(false);
  const storageReadyRef = useRef(false);

  useEffect(() => {
    if (window) {
      windowRef.current = window;
      // 초기 window 상태를 히스토리에 저장
      if (windowHistoryRef.current.length === 0) {
        windowHistoryRef.current = [window];
      }
    }
  }, [window]);

  const push = useCallback(
    (value?: TaskType | null) => {
      if (!value) return;

      setStack((prev) => [...prev, value]);
      const latestWindow = windowRef.current;

      if (setWindow && latestWindow && value?.appSetup) {
        const newWindowState = {
          ...latestWindow,
          top: latestWindow.top!,
          left: latestWindow.left!,
          height: value.appSetup.setUpHeight || latestWindow.height,
          width: value.appSetup.setUpWidth || latestWindow.width,
          minHeight:
            value.appSetup.minHeight !== undefined
              ? value.appSetup.minHeight
              : latestWindow.minHeight,
          minWidth:
            value.appSetup.minWidth !== undefined ? value.appSetup.minWidth : latestWindow.minWidth,
        };
        windowHistoryRef.current.push(newWindowState);
        windowRef.current = newWindowState;
        setWindow(newWindowState);
      }
    },
    [setWindow],
  );

  const pop = useCallback(() => {
    setStack((prev) => {
      if (prev.length === 0) return prev;
      const copy = prev.slice(0, -1);

      const latestWindow = windowRef.current;
      // 이전 window 상태로 복원
      if (windowHistoryRef.current.length > 1 && setWindow && latestWindow) {
        windowHistoryRef.current.pop(); // 현재 상태 제거
        const previousWindow = windowHistoryRef.current[windowHistoryRef.current.length - 1];
        const newWindowState = {
          ...previousWindow,
          top: latestWindow.top!,
          left: latestWindow.left!,
        };
        windowRef.current = newWindowState;
        setWindow(newWindowState);
      }

      return copy;
    });
  }, [setWindow]);

  const top = useCallback((): TaskType | null => {
    if (stack.length > 0) return stack[stack.length - 1];
    else return null;
  }, [stack]);

  useEffect(() => {
    if (!storageKey || !restoreTask || hasHydratedRef.current) return;

    let restored = false;

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as StackSnapshot[];
        if (Array.isArray(parsed)) {
          parsed.forEach((snapshot) => {
            if (!snapshot?.name) return;

            const task = restoreTask(snapshot, {
              stack,
              push,
              pop,
              top,
            });
            if (task) {
              restored = true;
              push(task);
            }
          });
        } else {
          restored = true; // malformed -> skip further attempts
        }
      } else {
        restored = true; // nothing to restore
      }
    } catch (error) {
      console.warn('Failed to restore stack from storage', error);
      restored = true;
    } finally {
      if (restored) {
        hasHydratedRef.current = true;
      }
      storageReadyRef.current = true;
    }
  }, [storageKey, restoreTask, push, pop, top, stack]);

  useEffect(() => {
    if (!storageKey || !restoreTask || storageReadyRef.current) return;
    storageReadyRef.current = true;
  }, [storageKey, restoreTask]);

  useEffect(() => {
    if (!storageKey || !storageReadyRef.current) return;

    // 제외 대상이 하나라도 포함되어 있으면 저장하지 않고 비움
    if (stack.some((task) => STACK_EXCLUDE_NAMES.has(task.name))) {
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.warn('Failed to clear excluded stack from storage', error);
      }
      return;
    }

    const snapshot = stack.map(
      (task) =>
        task.stackSnapshot ??
        ({
          name: task.name,
          id: task.id,
          type: task.type,
        } as StackSnapshot),
    );

    try {
      if (snapshot.length === 0) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(snapshot));
      }
    } catch (error) {
      console.warn('Failed to save stack to storage', error);
    }
  }, [stack, storageKey]);

  return [stack, push, pop, top] as const;
};

const useQueue = () => {
  const [queue, setQueue] = useState<any[]>([]);
  const push: any = (value: any) => {
    setQueue([...queue, value]);
  };
  const pop: any = () => {
    if (queue.length > 0) {
      let copy: any[] = [...queue];
      copy.splice(0, 1);
      setQueue([...copy]);
    }
  };
  const top: any = () => {
    if (queue.length > 0) return queue[queue.length - 1];
    else return 0;
  };

  return [queue, push, pop, top];
};

export { useStack, useQueue };
