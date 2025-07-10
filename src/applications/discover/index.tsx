import { TaskType } from "@/modules/typeModule.tsx"
import { useProcessManager } from "@/hooks/processManager";
import useApps from "@/applications/data/importManager";
import TaskBar from "@/applications/components/taskBar";
import React from "react";
import Seori from "@/applications/seori";
import * as _ from './style';
import { setCursorImage,CURSOR_IMAGES } from '@/lib/setCursorImg';
import { useAtom } from "jotai";
import { focusAtom } from "@/atoms/windowManager";

interface TaskBarProps {
  backUpFocus: string;
  setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
}

const Discover = ({ backUpFocus, setBackUpFocus }: TaskBarProps) => {
  const [, addTask,] = useProcessManager();
  const [, setFocus] = useAtom(focusAtom);
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
            }}
              onMouseEnter={()=>setCursorImage(CURSOR_IMAGES.hand)}
              onMouseLeave={()=>setCursorImage(CURSOR_IMAGES.default)}
            >
            </_.AppBtn>
            <_.AppName>{Application.name}</_.AppName>
          </_.AppContainer>
        )
      })}
      <TaskBar backUpFocus={backUpFocus} setBackUpFocus={setBackUpFocus} />
    </>
  )
}
export default Discover;