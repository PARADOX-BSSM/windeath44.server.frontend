import { useCallback, useEffect, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useStack } from '@/hooks/dataStructure.tsx';
import { taskSearchAtom } from '@/atoms/taskTransformer.ts';
import { StackSnapshot } from '@/modules/typeModule';

interface SulkkagiApproachProps {
  window: React.CSSProperties;
  setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  setUpHeight: number;
  setUpWidth: number;
}

const SulkkagiApproach = ({
  window,
  setWindow,
  setUpHeight,
  setUpWidth,
}: SulkkagiApproachProps) => {
  const taskSearch = useAtomValue(taskSearchAtom);
  const storageKey = useMemo(() => `stack-sulkkagi`, []);

  const restoreTask = useCallback(
    (snapshot: StackSnapshot, helpers: any) =>
      taskSearch?.(snapshot.name, { ...helpers, ...(snapshot.props || {}) }) ?? null,
    [taskSearch],
  );

  const [stack, push, pop, top] = useStack(window, setWindow, setUpHeight, setUpWidth, {
    storageKey,
    restoreTask: taskSearch ? restoreTask : undefined,
  });

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  useEffect(() => {
    // console.log("stack: ", stack);
    // console.log("top: ", top());
  }, [stack]);
  useEffect(() => {
    push(taskSearch?.('sulkkagiMenu', stackProps));
  }, []);
  return <>{top()?.component}</>;
};
export default SulkkagiApproach;
