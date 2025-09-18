import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useStack } from '@/hooks/dataStructure.tsx';
import { taskSearchAtom } from '@/atoms/taskTransformer.ts';

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
  const [stack, push, pop, top] = useStack(window, setWindow, setUpHeight, setUpWidth);
  const taskSearch = useAtomValue(taskSearchAtom);

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
