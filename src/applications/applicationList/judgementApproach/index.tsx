import { useEffect, useMemo, useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useStack } from '@/hooks/dataStructure.tsx';
import { taskSearchAtom } from '@/atoms/taskTransformer.ts';
import { currentStackTopAtom } from '@/atoms/memorialManager.ts';

interface JudgementApproachProps {
  window: React.CSSProperties;
  setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  setUpHeight: number;
  setUpWidth: number;
}

const JudgementApproach = ({
  window,
  setWindow,
  setUpHeight,
  setUpWidth,
}: JudgementApproachProps) => {
  const [stack, push, pop, top] = useStack(window, setWindow, setUpHeight, setUpWidth);
  const taskSearch = useAtomValue(taskSearchAtom);
  const setCurrentStackTop = useSetAtom(currentStackTopAtom);

  const stackProps = useMemo(() => ({
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  }), [stack, push, pop, top]);

  useEffect(() => {
    // console.log("stack: ", stack);
    // console.log("top: ", top());
    const currentTop = top();
    setCurrentStackTop(currentTop);
  }, [stack, top, setCurrentStackTop]);

  useEffect(() => {
    if (taskSearch && stack.length === 0) {
      push(taskSearch('재판 목록', stackProps));
    }
  }, [taskSearch, push, stackProps, stack.length]);
  return <>{top()?.component}</>;
};
export default JudgementApproach;
