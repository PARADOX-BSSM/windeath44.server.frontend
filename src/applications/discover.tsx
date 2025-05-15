import {TaskType} from "@/modules/typeModule.tsx"
import {useProcessManager} from "@/hooks/processManager/processManager";
import {Apps} from '@/applications/data/importManager'
import TaskBar from "@/applications/components/taskBar";
import React from "react";
import Seori from "@/applications/seori";

interface TaskBarProps {
  setTabDownInterrupt : React.Dispatch<React.SetStateAction<string>>;
}

const Discover = ({setTabDownInterrupt }:TaskBarProps) => {
  const [, addTask, ] = useProcessManager();

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
      <TaskBar setTabDownInterrupt={setTabDownInterrupt} />
    </>
  )
}
export default Discover;