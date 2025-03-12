import {useState} from "react";


const useStack = () => {
  const [stack, setStack] = useState<any[]>([0]);
  const Push:any = (value:any) => {
    setStack([...stack , value]);
  }
  const Pop:any  = () => {
    if(stack.length>0) {
      let copy:any[] = [...stack];
      copy.splice(-1,1)
      setStack([...copy])
    }
  }
  const Top:any = () => {
    if(stack.length>0)
      return stack[stack.length - 1];
    else
      return 0;
  }

  return [stack, Push, Pop, Top];
}

export {useStack};