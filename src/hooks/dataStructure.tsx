import { StackSnapshot, TaskType } from '@/modules/typeModule';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const stackRef = useRef<TaskType[]>([]);
  const storageKey = options?.storageKey;
  const restoreTask = options?.restoreTask;
  const hasHydratedRef = useRef(!storageKey);

  useEffect(() => {
    stackRef.current = stack;
  }, [stack]);

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
        // 현재 상태를 히스토리에 먼저 저장 (pop할 때 되돌아갈 상태)
        if (windowHistoryRef.current[windowHistoryRef.current.length - 1] !== latestWindow) {
          windowHistoryRef.current.push(latestWindow);
        }

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
            value.appSetup.minWidth !== undefined
              ? value.appSetup.minWidth
              : latestWindow.minWidth,
        };

        windowRef.current = newWindowState;
        setWindow(newWindowState);
      }
    },
    [setWindow],
  );

  const pop = useCallback(() => {
    setStack((prev) => {
      const copy = [...prev];
      copy.pop();

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
    if (stackRef.current.length > 0) return stackRef.current[stackRef.current.length - 1];
    else return null;
  }, []);

  useEffect(() => {
    if (!storageKey || hasHydratedRef.current || !restoreTask) return;

    hasHydratedRef.current = true;

    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;

      const parsed = JSON.parse(raw) as StackSnapshot[];
      if (!Array.isArray(parsed)) return;

      parsed.forEach((snapshot) => {
        if (!snapshot?.name) return;

        const task = restoreTask(snapshot, {
          stack: stackRef.current,
          push,
          pop,
          top,
        });
        if (task) push(task);
      });
    } catch (error) {
      console.warn('Failed to restore stack from storage', error);
    }
  }, [storageKey, restoreTask, push, pop, top]);

  useEffect(() => {
    if (!storageKey || !hasHydratedRef.current) return;

    const snapshot = stack.map(
      (task) =>
        task.stackSnapshot ?? ({
          name: task.name,
          id: task.id,
          type: task.type,
        } as StackSnapshot),
    );

    try {
      localStorage.setItem(storageKey, JSON.stringify(snapshot));
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
