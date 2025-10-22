import { currentStackTopAtom } from "@/atoms/memorialManager";
import { taskSearchAtom } from "@/atoms/taskTransformer";
import { useStack } from "@/hooks/dataStructure";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useMemo } from "react";

interface CommunityApproachProps {
  window: React.CSSProperties;
  setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  setUpHeight: number;
  setUpWidth: number;
}

const CommunityApproach = ({window, setWindow, setUpHeight, setUpWidth}: CommunityApproachProps)=>{
    const taskSearch = useAtomValue(taskSearchAtom);
const [stack, push, pop, top] = useStack(window, setWindow, setUpHeight, setUpWidth);
const setCurrentStackTop = useSetAtom(currentStackTopAtom);

const stackProps = useMemo(() => ({
  stack: stack,
  push: push,
  pop: pop,
  top: top,
}), [stack, push, pop, top]);
  
useEffect(() => {
    const currentTop = top();
    setCurrentStackTop(currentTop);
  }, [stack, top, setCurrentStackTop]);

  useEffect(() => {
    if (taskSearch && stack.length === 0) {
      push(taskSearch('communityMain', stackProps));
    }
  }, [taskSearch, push, stackProps, stack.length]);
  return <>{top()?.component}</>;
}

export default CommunityApproach;