import { TaskType } from '@/modules/typeModule.tsx';
import { useProcessManager } from '@/hooks/processManager';
import useApps from '@/applications/data/importManager';
import TaskBar from '@/applications/components/taskBar';
import React from 'react';
import Seori from '@/applications/seori';
import * as _ from './style';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { useAtom } from 'jotai';
import { focusAtom } from '@/atoms/windowManager';
import { IconContainer } from '../layout/components/AppHandles';
import { useIcon } from '../layout/hooks/useIcon';

interface TaskBarProps {
  backUpFocus: string;
  setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
}

const Discover = ({ backUpFocus, setBackUpFocus }: TaskBarProps) => {
  const [, addTask] = useProcessManager();
  const [, setFocus] = useAtom(focusAtom);
  const Apps = useApps();
  const visibleApps = Apps.filter((app: TaskType) => app.visible);
  const [displayWidth, setDisplayWidth] = React.useState<number>(0);
  const [displayLeft, setDisplayLeft] = React.useState<number>(0);

  React.useEffect(() => {
    const container = document.getElementById('cursorContainer');
    if (!container) return;

    const updateDimensions = () => {
      const bounds = container.getBoundingClientRect();
      setDisplayWidth(bounds.width);
      setDisplayLeft(bounds.left);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section style={{position: "relative"}}>
      {/* <Seori /> */}
      {visibleApps.map((Application: TaskType) => {
        // console.log(Application.appSetup?.Image);
        const icon = useIcon();
        return (
          <IconContainer
            key={Application.name}
            className="app-button"
            {...icon}
          >
            <_.AppBtn
              url={Application.appSetup?.Image}
              onDoubleClick={() => {
                addTask(Application);
              }}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            ></_.AppBtn>
            <_.AppName>{Application.name}</_.AppName>
          </IconContainer>
        );
      })}
      <div style={{ position: 'fixed', bottom: 0, left: `${displayLeft}px`, width: `${displayWidth}px`, zIndex: 998 }}>
        <TaskBar
          backUpFocus={backUpFocus}
          setBackUpFocus={setBackUpFocus}
        />
      </div>
    </section>
  );
};
export default Discover;
