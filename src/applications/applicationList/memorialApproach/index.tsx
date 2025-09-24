import { useEffect } from 'react';
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

const MemorialApproach = ({
  window,
  setWindow,
  setUpHeight,
  setUpWidth,
}: MemorialApproachProps) => {
  const [stack, push, pop, top] = useStack(window, setWindow, setUpHeight, setUpWidth);
  const taskSearch = useAtomValue(taskSearchAtom);
  const setCurrentStackTop = useSetAtom(currentStackTopAtom);

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  useEffect(() => {
    // console.log("stack: ", stack);
    // console.log("top: ", top());
    setCurrentStackTop(top());
  }, [stack, setCurrentStackTop]);
  useEffect(() => {
    push(taskSearch?.('memorialMenu', stackProps));
  }, []);
  return <>{top()?.component}</>;
};
export default MemorialApproach;
