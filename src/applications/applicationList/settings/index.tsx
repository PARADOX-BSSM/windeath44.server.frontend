import {useEffect} from "react";
import { useAtomValue } from 'jotai';
import {useStack} from '@/hooks/dataStructure.tsx'
import { taskSearchAtom } from "@/atoms/taskTransformer.ts";

const Settings = () => {
  const [stack, push, pop, top] = useStack();
  const taskSearch = useAtomValue(taskSearchAtom);
  // const [signal, setSignal] = useState(null);
  useEffect(() => {
    console.log(stack);
    console.log(top());
  }, [stack]);
  useEffect(() => {
    console.log(1, push);
    push(taskSearch?.("memorial", stack, push, pop, top));
  }, [])
    return (
      <>
        {top()?.component}
      </>
    )

}
export default Settings;