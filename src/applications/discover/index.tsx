import { TaskType } from '@/modules/typeModule.tsx';
import { useProcessManager } from '@/hooks/processManager';
import useApps from '@/applications/data/importManager';
import TaskBar from '@/applications/components/taskBar';
import React, { useRef, useCallback } from 'react';
import Seori from '@/applications/seori';
import * as _ from './style';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { useAtom } from 'jotai';
import { focusAtom } from '@/atoms/windowManager';

interface TaskBarProps {
  backUpFocus: string;
  setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
}

interface SelectionRect {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

const Discover = ({ backUpFocus, setBackUpFocus }: TaskBarProps) => {
  const [, addTask] = useProcessManager();
  const [, setFocus] = useAtom(focusAtom);
  const Apps = useApps();
  const visibleApps = Apps.filter((app: TaskType) => app.visible);
  const [displayWidth, setDisplayWidth] = React.useState<number>(0);
  const [displayLeft, setDisplayLeft] = React.useState<number>(0);
  const [selectedApps, setSelectedApps] = React.useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectionRect, setSelectionRect] = React.useState<SelectionRect | null>(null);
  const appRefs = useRef<Map<string, HTMLDivElement>>(new Map());

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

  // 두 사각형이 교차하는지 확인
  const isIntersecting = useCallback(
    (rect1: DOMRect, rect2: { left: number; top: number; right: number; bottom: number }) => {
      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    },
    [],
  );

  // 선택 영역 계산
  const getSelectionBounds = useCallback((rect: SelectionRect) => {
    return {
      left: Math.min(rect.startX, rect.currentX),
      top: Math.min(rect.startY, rect.currentY),
      right: Math.max(rect.startX, rect.currentX),
      bottom: Math.max(rect.startY, rect.currentY),
    };
  }, []);

  // 드래그 선택 로직
  React.useEffect(() => {
    const container = document.getElementById('cursorContainer');
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // 앱 버튼이나 태스크바 클릭 시 드래그 시작 안 함
      if (target.closest('.app-button') || target.closest('[style*="bottom: 0"]')) {
        return;
      }

      setIsDragging(true);
      setSelectionRect({
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
      });
      setSelectedApps(new Set());
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !selectionRect) return;

      // cursorContainer 영역 내로 제한
      const bounds = container.getBoundingClientRect();
      const clampedX = Math.max(bounds.left, Math.min(bounds.right, e.clientX));
      const clampedY = Math.max(bounds.top, Math.min(bounds.bottom, e.clientY));

      const newRect = {
        ...selectionRect,
        currentX: clampedX,
        currentY: clampedY,
      };
      setSelectionRect(newRect);

      // 선택 영역과 교차하는 앱들 찾기
      const selectionBounds = getSelectionBounds(newRect);
      const newSelectedApps = new Set<string>();

      appRefs.current.forEach((element, appName) => {
        const appRect = element.getBoundingClientRect();
        if (isIntersecting(appRect, selectionBounds)) {
          newSelectedApps.add(appName);
        }
      });

      setSelectedApps(newSelectedApps);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setSelectionRect(null);
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, selectionRect, isIntersecting, getSelectionBounds]);

  // 빈 공간 클릭 시 선택 해제 (mousedown 사용으로 드래그 후 click 문제 해결)
  React.useEffect(() => {
    const handleShellMouseDown = (e: Event) => {
      const target = e.target as HTMLElement;
      // app-button 클래스를 가진 요소나 그 자식이 아닌 경우에만 선택 해제
      if (!target.closest('.app-button')) {
        setSelectedApps(new Set());
      }
    };

    const shell = document.querySelector('.shell');
    if (shell) {
      shell.addEventListener('mousedown', handleShellMouseDown);
    }

    return () => {
      if (shell) {
        shell.removeEventListener('mousedown', handleShellMouseDown);
      }
    };
  }, []);

  return (
    <>
      {/* <Seori /> */}
      {visibleApps.map((Application: TaskType) => {
        // console.log(Application.appSetup?.Image);
        return (
          <_.AppContainer
            key={Application.name}
            className="app-button"
            style={{ zIndex: '0' }}
            isSelected={selectedApps.has(Application.name)}
            onClick={(e) => {
              if (e.ctrlKey || e.metaKey) {
                // Ctrl/Cmd 클릭: 토글 선택
                setSelectedApps((prev) => {
                  const newSet = new Set(prev);
                  if (newSet.has(Application.name)) {
                    newSet.delete(Application.name);
                  } else {
                    newSet.add(Application.name);
                  }
                  return newSet;
                });
              } else {
                // 일반 클릭: 단일 선택
                setSelectedApps(new Set([Application.name]));
              }
            }}
            ref={(el) => {
              if (el) {
                appRefs.current.set(Application.name, el);
              } else {
                appRefs.current.delete(Application.name);
              }
            }}
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
          </_.AppContainer>
        );
      })}
      {/* 선택 사각형 */}
      {isDragging && selectionRect && (
        <_.SelectionBox
          left={Math.min(selectionRect.startX, selectionRect.currentX)}
          top={Math.min(selectionRect.startY, selectionRect.currentY)}
          width={Math.abs(selectionRect.currentX - selectionRect.startX)}
          height={Math.abs(selectionRect.currentY - selectionRect.startY)}
        />
      )}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: `${displayLeft}px`,
          width: `${displayWidth}px`,
          zIndex: 998,
        }}
      >
        <TaskBar
          backUpFocus={backUpFocus}
          setBackUpFocus={setBackUpFocus}
        />
      </div>
    </>
  );
};
export default Discover;
