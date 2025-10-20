import { TaskType } from '@/modules/typeModule';
import { useEffect, useRef, useState } from 'react';

const useStack = (
  window?: React.CSSProperties,
  setWindow?: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
  setUpHeight?: number,
  setUpWidth?: number,
) => {
  const [stack, setStack] = useState<any[]>([]);
  const windowRef = useRef<React.CSSProperties | undefined>(window);
  const windowHistoryRef = useRef<React.CSSProperties[]>([]);

  useEffect(() => {
    if (window) {
      windowRef.current = window;
      // 초기 window 상태를 히스토리에 저장
      if (windowHistoryRef.current.length === 0) {
        windowHistoryRef.current = [window];
      }
    }
  }, [window]);

  const push: any = (value: any) => {
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
          value.appSetup.minWidth !== undefined ? value.appSetup.minWidth : latestWindow.minWidth,
      };

      windowRef.current = newWindowState;
      setWindow(newWindowState);
    }
  };

  const pop = () => {
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
  };
  const top: any = (): TaskType | null => {
    if (stack.length > 0) return stack[stack.length - 1];
    else return null;
  };

  return [stack, push, pop, top];
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
