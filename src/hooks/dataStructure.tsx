import { TaskType } from "@/modules/typeModule";
import {useEffect, useRef, useState} from "react";


const useStack = (window?: React.CSSProperties, setWindow?: React.Dispatch<React.SetStateAction<React.CSSProperties>>, setUpHeight?: number, setUpWidth?: number) => {
  const [stack, setStack] = useState<any[]>([]);
  const windowRef = useRef<React.CSSProperties>(window!);

  useEffect(() => {
    if (window) {
      windowRef.current = window;
    }
  }, [window])

  const push:any = (value:any) => {
    setStack(prev => [...prev, value]);
    const latestWindow = windowRef.current;
    if (setWindow && latestWindow) {
      setWindow({
        ...latestWindow,
        top: latestWindow.top!,
        left: latestWindow.left!,
        height: value.appSetup.setUpHeight,
        width: value.appSetup.setUpWidth,
      });
    }
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