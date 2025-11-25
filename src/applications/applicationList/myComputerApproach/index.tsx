import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useStack } from '@/hooks/dataStructure.tsx';
import { taskSearchAtom } from '@/atoms/taskTransformer.ts';

interface MyComputerApproachProps {
  window: React.CSSProperties;
  setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  setUpHeight: number;
  setUpWidth: number;
  memorialId: number;
  memorialName: string;
  instanceId?: string;
}

const MyComputerApproach = ({
  window,
  setWindow,
  setUpHeight,
  setUpWidth,
  memorialId,
  memorialName,
  instanceId,
}: MyComputerApproachProps) => {
  const taskSearch = useAtomValue(taskSearchAtom);

  const [stack, push, pop, top] = useStack(window, setWindow, setUpHeight, setUpWidth);

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  useEffect(() => {
    if (taskSearch && stack.length === 0) {
      push(taskSearch('memorialPRManager', { ...stackProps, memorialId, memorialName }));
    }
  }, [taskSearch, push, stackProps, memorialId, memorialName, stack.length]);
  return <>{top()?.component}</>;
};
export default MyComputerApproach;
