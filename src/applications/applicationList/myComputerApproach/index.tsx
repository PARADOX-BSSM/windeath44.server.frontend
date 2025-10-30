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
}

const MyComputerApproach = ({
                            window,
                            setWindow,
                            setUpHeight,
                            setUpWidth,
                              memorialId,
                              memorialName,
                          }: MyComputerApproachProps) => {
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
    push(taskSearch?.('memorialPRManager', {...stackProps,memorialId,memorialName}));
  }, []);
  return <>{top()?.component}</>;
};
export default MyComputerApproach;
