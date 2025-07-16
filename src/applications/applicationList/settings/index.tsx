import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useStack } from '@/hooks/dataStructure.tsx';
import { taskSearchAtom } from '@/atoms/taskTransformer.ts';

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

  useEffect(() => {
    // console.log("stack: ", stack);
    // console.log("top: ", top());
  }, [stack]);
  useEffect(() => {
    push(taskSearch?.('memorialMenu', stack, push, pop, top));
  }, []);
  return <>{top()?.component}</>;
};
export default MemorialApproach;
