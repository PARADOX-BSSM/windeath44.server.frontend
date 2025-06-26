import {useEffect} from "react";
import { useAtomValue } from 'jotai';
import {useStack} from '@/hooks/dataStructure.tsx'
import { taskSearchAtom } from "@/atoms/taskTransformer.ts";

const Settings = () => {
  const [stack, Push, Pop, Top] = useStack();
  const taskSearch = useAtomValue(taskSearchAtom);
  // const [signal, setSignal] = useState(null);
  useEffect(() => {
    console.log(stack);
    console.log(Top());
  }, [stack]);
  useEffect(() => {
    Push(taskSearch?.("memorial", stack, Push, Pop, Top));
  }, [])
    return (
      <>
        {Top().component}
      </>
    )

}
export default Settings;