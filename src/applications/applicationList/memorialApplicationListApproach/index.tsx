import { useEffect, useMemo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useStack } from '@/hooks/dataStructure.tsx';
import { taskSearchAtom } from '@/atoms/taskTransformer.ts';
import { currentStackTopAtom } from '@/atoms/memorialManager.ts';

interface MemorialApproachProps {
  window: React.CSSProperties;
  setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  setUpHeight: number;
  setUpWidth: number;
}

const MemorialApplicationListApproach = ({
  window,
  setWindow,
  setUpHeight,
  setUpWidth,
}: MemorialApproachProps) => {
  const [stack, push, pop, top] = useStack(window, setWindow, setUpHeight, setUpWidth);
  const taskSearch = useAtomValue(taskSearchAtom);
  const setCurrentStackTop = useSetAtom(currentStackTopAtom);

  const stackProps = useMemo(
    () => ({
      stack: stack,
      push: push,
      pop: pop,
      top: top,
    }),
    [stack, push, pop, top],
  );

  useEffect(() => {
    // console.log("stack: ", stack);
    // console.log("top: ", top());
    const currentTop = top();
    setCurrentStackTop(currentTop);
  }, [stack, top, setCurrentStackTop]);

  useEffect(() => {
    if (taskSearch && stack.length === 0) {
      push(taskSearch('memorialApplicationListMenu', stackProps));
    }
  }, [taskSearch, push, stackProps, stack.length]);
  return <>{top()?.component}</>;
};
export default MemorialApplicationListApproach;
