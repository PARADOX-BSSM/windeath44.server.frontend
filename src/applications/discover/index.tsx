import { TaskType } from "@/modules/typeModule.tsx"
import { useProcessManager } from "@/hooks/processManager";
import useApps from "@/applications/data/importManager";
import TaskBar from "@/applications/components/taskBar";
import React from "react";
import Seori from "@/applications/seori";
import * as _ from './style';

interface TaskBarProps {
  backUpFocus: string;
  setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
}

const Discover = ({ backUpFocus, setBackUpFocus }: TaskBarProps) => {
  const [, addTask,] = useProcessManager();
  const Apps = useApps();
  const visibleApps = Apps.filter((app: TaskType) => app.visible);
  return (
    <>
      <Seori />
      {visibleApps.map((Application: TaskType) => {
        console.log(Application.appSetup?.Image);
        return (
          <_.AppContainer key={Application.name} className="app-button" style={{ zIndex: "0" }}>
            <_.AppBtn url={Application.appSetup?.Image} onDoubleClick={() => {
              addTask(Application);
            }}>
            </_.AppBtn>
            <span className="app-title">{Application.name}</span>
          </_.AppContainer>
        )
      })}
      <TaskBar backUpFocus={backUpFocus} setBackUpFocus={setBackUpFocus} />
    </>
  )
}
export default Discover;