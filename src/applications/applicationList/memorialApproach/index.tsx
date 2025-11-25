import { useEffect, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useStack } from '@/hooks/dataStructure.tsx';
import { taskSearchAtom } from '@/atoms/taskTransformer.ts';
import { ApplicationProps } from '@/applications/layout/utils';

interface MemorialApplicationListApproachProps {
  window: React.CSSProperties;
  setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  setUpHeight: number;
  setUpWidth: number;
  props?: ApplicationProps;
  instanceId?: string;
}

const MemorialApproach = ({
  window,
  setWindow,
  setUpHeight,
  setUpWidth,
  props,
  instanceId,
}: MemorialApplicationListApproachProps) => {
  const taskSearch = useAtomValue(taskSearchAtom);

  const [stack, push, pop, top] = useStack(window, setWindow, setUpHeight, setUpWidth);

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
