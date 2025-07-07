import {useEffect} from "react";
import { useAtomValue } from 'jotai';
import {useStack} from '@/hooks/dataStructure.tsx'
import { taskSearchAtom } from "@/atoms/taskTransformer.ts";

const Settings = () => {
  const [stack, push, pop, top] = useStack();
  const taskSearch = useAtomValue(taskSearchAtom);

  useEffect(() => {
    console.log("stack: ", stack);
    console.log("top: ", top());
  }, [stack]);
  useEffect(() => {
    push(taskSearch?.("추모관", stack, push, pop, top));
  }, [])
    return (
      <>
        {top()?.component}
      </>
    )

}
export default Settings;