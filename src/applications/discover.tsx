import {TaskType} from "@/modules/typeModule.tsx"
import {useProcessManager} from "@/hooks/processManager";
import useApps from "@/applications/data/importManager";
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
}

const Discover = ({startOption, setStartOption, focus, setFocus, backUpFocus, setBackUpFocus }:TaskBarProps) => {
  const [, addTask, ] = useProcessManager();
  const Apps = useApps();
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
      <TaskBar startOption={startOption} setStartOption={setStartOption} focus={focus} setFocus={setFocus} backUpFocus={backUpFocus} setBackUpFocus={setBackUpFocus}/>
    </>
  )
}
export default Discover;