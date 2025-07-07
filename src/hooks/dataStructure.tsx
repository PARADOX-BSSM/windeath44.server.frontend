import { TaskType } from "@/modules/typeModule";
import {useState} from "react";


const useStack = () => {
  const [stack, setStack] = useState<any[]>([]);

  const push:any = (value:any) => {
    setStack(prev => [...prev, value]);
  }
  const pop = () => {
    setStack(prev => {
      const copy = [...prev];
      copy.pop();
      return copy;
    });
  };
  const top:any = (): TaskType | null => {
    if(stack.length>0)
      return stack[stack.length - 1];
    else
      return null;
  }

  return [stack, push, pop, top];
}

const useQueue = () => {
  const [queue, setQueue] = useState<any[]>([]);
  const push:any = (value:any) => {
    setQueue([...queue, value]);
  }
  const pop:any  = () => {
    if(queue.length>0) {
      let copy:any[] = [...queue];
      copy.splice(0,1);
      setQueue([...copy])
    }
  }
  const top:any = () => {
    if(queue.length>0)
      return queue[queue.length-1];
    else
      return 0;
  }

  return [queue, push, pop, top];
}


export {useStack, useQueue};