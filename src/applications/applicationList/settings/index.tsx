import {useEffect, useState} from "react";
import {useStack} from '@/hooks/dataStructure.tsx'
import {Main, Wallpaper} from './settingsPages.tsx'
import Memorial from "../memorial/index.tsx";

const Settings = () => {
  const [stack, Push, Pop, Top] = useStack();
  // const [signal, setSignal] = useState(null);
  useEffect(() => {
    console.log(stack);
    console.log(Top());
  }, [stack]);
  useEffect(() => {
    Push((
      <>
        <Memorial />
      </>
    ))
  }, [])
    return (
      <>
        {Top()}
      </>
    )

}
export default Settings;