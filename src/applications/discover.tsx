import {TaskType} from "@/modules/typeModule.tsx"
import {useProcessManager} from "@/hooks/processManager";
import useApps from "@/applications/data/importManager";
import TaskBar from "@/applications/components/taskBar";
import React from "react";
import Seori from "@/applications/seori";

interface TaskBarProps {
  backUpFocus: string;
  setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
}

const Discover = ({ backUpFocus, setBackUpFocus }:TaskBarProps) => {
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
      <TaskBar backUpFocus={backUpFocus} setBackUpFocus={setBackUpFocus}/>
    </>
  )
}
export default Discover;