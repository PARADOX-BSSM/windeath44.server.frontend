import { TaskType } from '@/modules/typeModule.tsx';
import { useProcessManager } from '@/hooks/processManager';
import useApps from '@/applications/data/importManager';
import TaskBar from '@/applications/components/taskBar';
import React from 'react';
// import Seori from '@/applications/seori'; 
import * as _ from './style';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { useAtom } from 'jotai';
import { focusAtom } from '@/atoms/windowManager'; 
import { IconContainer } from '../layout/components/AppHandles';
import { initializeGridAtom, resizeGridAtom, iconPositionsAtom } from '@/atoms/gridManager'; 

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
  const [iconPositions] = useAtom(iconPositionsAtom); // 아이콘 위치를 읽어옵니다.

  // TaskBar positioning states (Original logic retained)
  const [displayWidth, setDisplayWidth] = React.useState<number>(0);
  const [displayLeft, setDisplayLeft] = React.useState<number>(0);

  // 아이콘 컨테이너의 크기를 측정하기 위한 ref
  const containerRef = React.useRef<HTMLElement>(null);

  // Grid Initialization and Responsive Resizing Logic
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const appIds = visibleApps.map(app => app.name);
    
    // 1. 초기화: 앱 목록과 컨테이너 크기로 그리드를 설정합니다.
    initializeGrid({ appIds, containerWidth: container.clientWidth, containerHeight: container.clientHeight });

    // 2. ResizeObserver: 컨테이너 크기 변경 감지 시 그리드 리사이징
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries.find(e => e.target === container);
      if (entry) {
        const { width, height } = entry.contentRect;
        // Jotai 액션 호출
        resizeGrid({ containerWidth: width, containerHeight: height });
      }
      
      // TaskBar dimension logic (assuming 'cursorContainer' is a root element)
      const cursorContainer = document.getElementById('cursorContainer');
      if (cursorContainer) {
        const bounds = cursorContainer.getBoundingClientRect();
        setDisplayWidth(bounds.width);
        setDisplayLeft(bounds.left);
      }
    });

    resizeObserver.observe(container);
    
    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [initializeGrid, resizeGrid, visibleApps.length]); // 앱 목록이 바뀌면 초기화 재실행

  // 위치가 할당된 아이콘만 필터링하여 렌더링
  const visibleAndPlacedApps = visibleApps.filter(app => iconPositions[app.name]);

  return (
    <section ref={containerRef} className="discover" style={{ position: "relative", width: '100%', height: '100%', overflow: 'hidden', margin: "1.5rem", boxSizing: "border-box" }}>
      {visibleAndPlacedApps.map((Application: TaskType) => {
        const position = iconPositions[Application.name];
        
        // 위치 정보는 이미 필터링되어 있으므로 항상 존재합니다.
        return (
          <IconContainer
            key={Application.name}
            appId={Application.name}      // Jotai Key
            position={position}           // Jotai Position
            className="app-button"
            // useIcon 제거됨
            onDoubleClick={() => {
              addTask(Application);
              setFocus(Application.name); // 포커스 설정
            }}
          >
            <_.AppBtn
              url={Application.appSetup?.Image}
              // Double click 핸들러는 IconContainer로 옮겨졌습니다.
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            ></_.AppBtn>
            <_.AppName>{Application.name}</_.AppName>
          </IconContainer>
        );
      })}
      
      {/* TaskBar Component */}
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