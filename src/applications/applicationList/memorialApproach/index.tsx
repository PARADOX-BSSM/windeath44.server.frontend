import { useEffect, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useStack } from '@/hooks/dataStructure.tsx';
import { taskSearchAtom } from '@/atoms/taskTransformer.ts';

interface MemorialApplicationListApproachProps {
  window: React.CSSProperties;
  setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  setUpHeight: number;
  setUpWidth: number;
}

const MemorialApproach = ({
  window,
  setWindow,
  setUpHeight,
  setUpWidth,
}: MemorialApplicationListApproachProps) => {
  const [stack, push, pop, top] = useStack(window, setWindow, setUpHeight, setUpWidth);
  const taskSearch = useAtomValue(taskSearchAtom);

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
    if (taskSearch && stack.length === 0) {
      push(taskSearch('Search', stackProps));
    }
  }, [taskSearch, push, stackProps, stack.length]);

  return <>{top()?.component}</>;
};

export default MemorialApproach;
