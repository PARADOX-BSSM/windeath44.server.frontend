import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { focusAtom } from '@/atoms/windowManager'; 
import { IconContainer } from '../layout/components/AppHandles';
import { initializeGridAtom, resizeGridAtom, iconPositionsAtom } from '@/atoms/gridManager'; 
import { useProcessManager } from '@/hooks/processManager';
import useApps from '@/applications/data/importManager';
import TaskBar from '@/applications/components/taskBar';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { TaskType } from '@/modules/typeModule.tsx';
import * as _ from './style';

interface TaskBarProps {
  backUpFocus: string;
  setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
}

const Discover = ({ backUpFocus, setBackUpFocus }: TaskBarProps) => {
  const [, addTask] = useProcessManager();
  const [, setFocus] = useAtom(focusAtom);
  const Apps = useApps();
  const visibleApps = Apps.filter((app: TaskType) => app.visible);

  const [, initializeGrid] = useAtom(initializeGridAtom);
  const [, resizeGrid] = useAtom(resizeGridAtom);
  const [iconPositions] = useAtom(iconPositionsAtom);

  const [displayWidth, setDisplayWidth] = React.useState<number>(0);
  const [displayLeft, setDisplayLeft] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const appIds = visibleApps.map(app => app.name);

    if (Object.keys(iconPositions).length === 0)
      initializeGrid({ appIds, containerWidth: container.clientWidth, containerHeight: container.clientHeight });


    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries.find(e => e.target === container);
      if (entry) {
        const { width, height } = entry.contentRect;
        resizeGrid({ containerWidth: width, containerHeight: height });
      }
      const cursorContainer = document.getElementById('cursorContainer');
      if (cursorContainer) {
        const bounds = cursorContainer.getBoundingClientRect();
        setDisplayWidth(bounds.width);
        setDisplayLeft(bounds.left);
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [initializeGrid, resizeGrid, iconPositions, visibleApps.length]);

  const visibleAndPlacedApps = visibleApps.filter(app => iconPositions[app.name]);

  return (
    <section ref={containerRef} className="discover" style={{ position: "relative", width: '100%', height: '100%', overflow: 'hidden', margin: "1.5rem", boxSizing: "border-box" }}>
      {visibleAndPlacedApps.map((Application: TaskType) => {
        const position = iconPositions[Application.name];
        return (
          <IconContainer
            key={Application.name}
            appId={Application.name}
            position={position}
            className="app-button"
            onDoubleClick={() => {
              addTask(Application);
              setFocus(Application.name);
            }}
          >
            <_.AppBtn
              url={Application.appSetup?.Image}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            />
            <_.AppName>{Application.name}</_.AppName>
          </IconContainer>
        );
      })}
      <div style={{ position: 'fixed', bottom: 0, left: `${displayLeft}px`, width: `${displayWidth}px`, zIndex: 998 }}>
        <TaskBar backUpFocus={backUpFocus} setBackUpFocus={setBackUpFocus} />
      </div>
    </section>
  );
};

export default Discover;
