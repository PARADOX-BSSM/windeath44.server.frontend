import {useEffect, useState} from "react";
import useStack from '../manager/DataStructureManager.jsx'

const Settings = () => {
  const [stack, Push, Pop, Top] = useStack();
  useEffect(() => {
    console.log(stack);
  }, [stack]);
  if(Top()===0)
    return (
      <>
        <button onClick={() => {
          Push(1)
        }}>
          Wallpaper
        </button>
        <button onClick={() => {
          Push(2)
        }}>
          Account
        </button>
      </>
    )
  else if (Top() === 1)
    return (
      <>
        <header>
          <button onClick={() => {
            Pop()
          }}>Back
          </button>
          wallpaper
        </header>
      </>
    )
  else if (Top() === 2)
    return (
      <>
        <button onClick={() => {
          Pop()
        }}>Back
        </button>
        Account
      </>
    )
}
export default Settings;