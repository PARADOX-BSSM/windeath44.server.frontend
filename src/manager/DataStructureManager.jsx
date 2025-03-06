import {useState} from "react";


const useStack = () => {
  const [stack, setStack] = useState([0]);
  const Push = (value) => {
    setStack([...stack , value]);
  }
  const Pop = () => {
    if(stack.length>0) {
      let copy = [...stack];
      copy.splice(-1,1)
      setStack([...copy])
    }
  }
  const Top = () => {
    if(stack.length>0)
      return stack[stack.length - 1];
    else
      return 0;
  }

  return [stack, Push, Pop, Top];
}

export default useStack;