import {TaskType} from "@/modules/typeModule.tsx"
import {useProcessManager} from "@/hooks/processManager/processManager";
import {Apps} from '@/applications/data/importManager'
import { useRecoilState } from 'recoil';
import { focusState } from '@/recoil/focusState';
import TaskBar from "@/applications/components/taskBar";
import React from "react";
import Seori from "@/applications/seori";

interface TaskBarProps {
  startOption: boolean;
  setStartOption: React.Dispatch<React.SetStateAction<boolean>>;
  focus : string;
  setFocus: React.Dispatch<React.SetStateAction<string>>;
  backUpFocus: string;
  setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
  setTabDownInterrupt : React.Dispatch<React.SetStateAction<string>>;
}

const Discover = ({startOption, setStartOption, backUpFocus, setBackUpFocus, setTabDownInterrupt }:TaskBarProps) => {
  const [, addTask, ] = useProcessManager();
  const [focus, setFocus] = useRecoilState(focusState);

  console.log(focus, 1);
  return(
    <>
      <Seori/>
      {Apps.map((Application:TaskType) => {
        return (
          <div key={Application.name} className="app-button" style={{zIndex: "0"}}>
            <button onDoubleClick={() => {
              addTask(Application);
            }}>
            </button>
            <span className="app-title">{Application.name}</span>
          </div>
        )
      })}
      <TaskBar startOption={startOption} setStartOption={setStartOption} focus={focus} setFocus={setFocus} backUpFocus={backUpFocus} setBackUpFocus={setBackUpFocus} setTabDownInterrupt={setTabDownInterrupt} />
    </>
  )
}
export default Discover;