import {useEffect, useState} from "react";
import {useStack} from '@/hooks/dataStructureModule.tsx'
import {Main, Wallpaper} from './Pages/settingsPages.tsx'

const Settings = () => {
  const [stack, Push, Pop, Top] = useStack();
  const [signal, setSignal] = useState(null);
  useEffect(() => {
    console.log(stack);
  }, [stack]);
  useEffect(() => {
    if(signal!==null) {
      if(signal==="back") {
        Pop()
      }else {
        Push(signal);
        setSignal(null);
      }
    }
  },  [signal])
    return (
      <>
        <Main number={Top()} setSignal={setSignal}/>
        <Wallpaper number={Top()} setSignal={setSignal}/>
      </>
    )

}
export default Settings;