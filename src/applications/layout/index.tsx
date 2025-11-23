import * as _ from './style';
import { Suspense, useEffect, useState } from 'react';
import Exit from '@/assets/headerButton/exit.svg';
import Full from '@/assets/headerButton/full.svg';
import Min from '@/assets/headerButton/min.svg';
import Heart from '@/assets/headerButton/heart.svg';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  isLogInedAtom,
  focusAtom,
  layerAtom,
  tabDownInterruptAtom,
} from '@/atoms/windowManager.ts';
import { isNotClickAtom } from '@/atoms/cursorState.ts';
import { windowPositionsAtom } from '@/atoms/processManager.ts';
import { ApplicationProps } from './utils';
import React from 'react';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { Event_Count, Open_Vote, Sep_window } from '../applicationList/vote/state_manage';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useProcessManager } from '@/hooks/processManager.tsx';
import { useUI } from './hooks/useUI';
import Resize from './components/ResizeHandles';
const Application = (props: ApplicationProps) => {
  // jotai 상태 사용

  const [layer, setLayer] = useAtom(layerAtom);
  const [focus, setFocus] = useAtom(focusAtom);
  const [tabDownInterrupt, setTabDownInterrupt] = useAtom(tabDownInterruptAtom);
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);
  const [windowPositions] = useAtom(windowPositionsAtom);
  const [, , , setVirtualWindowPositions] = useProcessManager();
  const [windowName, setWindowName] = useState<string>(props.name);
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  // UI 상태 관리
  const ui = useUI();
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hasEnabledSave, setHasEnabledSave] = useState<boolean>(false);
  const [zIndex, setZIndex] = useState<number>(layer);

  // 전체화면 백업용 상태
  const [backupPosition, setBackupPosition] = useState<{ x: number; y: number } | null>(null);
  const [backupSize, setBackupSize] = useState<{ width: number; height: number } | null>(null);

  const set_sep_window = useSetAtom(Sep_window);
  const open_vote = useAtomValue(Open_Vote);

  useEffect(() => {
    console.log('isNotClick changed:', isNotClick);
  }, [isNotClick]);

  // 마운트 후 위치 복원
  useEffect(() => {
    if (isFullScreen) {
      return;
    }

    const savedPos = windowPositions[props.name];
    if (savedPos) {
      console.log('[Application] Restoring position for', props.name, savedPos);
      const timer = setTimeout(() => {
        // px를 rem으로 변환 (1rem = 16px)
        ui.setPosition({
          x: savedPos.left / 16,
          y: savedPos.top / 16,
        });
        ui.setSize({
          width: savedPos.width / 16,
          height: savedPos.height / 16,
        });
        setTimeout(() => {
          console.log('[Application] Enabling save for', props.name);
          setHasEnabledSave(true);
        }, 100);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // 초기 크기 설정 (px를 rem으로 변환)
      const widthStr =
        typeof props.setUpWidth === 'string' ? props.setUpWidth : String(props.setUpWidth);
      const heightStr =
        typeof props.setUpHeight === 'string' ? props.setUpHeight : String(props.setUpHeight);
      const initialWidth = parseFloat(widthStr.replace('px', '')) / 16 || 30;
      const initialHeight = parseFloat(heightStr.replace('px', '')) / 16 || 20;
      ui.setSize({ width: initialWidth, height: initialHeight });

      // 초기 위치 설정 (화면 중앙)
      const centerX = (window.innerWidth / 16) * 0.3;
      const centerY = (window.innerHeight / 16) * 0.2;
      ui.setPosition({ x: centerX, y: centerY });

      const timer = setTimeout(() => {
        console.log('[Application] No saved position, enabling save for', props.name);
        setHasEnabledSave(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [props.name, windowPositions, isFullScreen]);

  //재판 화면에서 닫기 버튼을 누르면 뒤로 돌아가야하는데 재판 화면인지 아닌지 판단해야함
  useEffect(() => {
    if (props.name === '재판' && open_vote === true) {
      set_sep_window(true);
    } else {
      set_sep_window(false);
    }
  }, [window]);

  // 창의 위치/크기 저장
  useEffect(() => {
    if (!hasEnabledSave) {
      return;
    }

    if (isFullScreen || isMinimized || props.instanceId || props.type !== 'App') {
      return;
    }

    // rem을 px로 변환하여 저장
    const position = {
      top: (ui.position.y + ui.positionOffset.y) * 16,
      left: (ui.position.x + ui.positionOffset.x) * 16,
      width: (ui.size.width + ui.sizeOffset.width) * 16,
      height: (ui.size.height + ui.sizeOffset.height) * 16,
    };

    console.log('[Application] Saving position for', props.name, position);
    setVirtualWindowPositions({ [props.name]: position });
  }, [
    ui.position.x,
    ui.position.y,
    ui.size.width,
    ui.size.height,
    isFullScreen,
    isMinimized,
    hasEnabledSave,
    props.instanceId,
    props.type,
    props.name,
  ]);

  // 포커스 설정 (마운트 시)
  useEffect(() => {
    if (!isMinimized && focus !== (props.instanceId || props.name)) {
      setFocus(props.instanceId || props.name);
    }
  }, []);

  // 최소화 처리
  useEffect(() => {
    if (isMinimized) {
      setFocus('Discover');
    }
  }, [isMinimized]);

  // Tab 인터럽트 처리
  useEffect(() => {
    if (tabDownInterrupt === (props.instanceId || props.name)) {
      setIsMinimized(true);
      setTabDownInterrupt('empty');
    }
  }, [tabDownInterrupt]);

  // 포커스 관리 (레이어 조정)
  useEffect(() => {
    if (props.type !== 'Shell' && focus === (props.instanceId || props.name)) {
      setLayer(layer + 1);
      setIsMinimized(false);
      setZIndex(layer);
    }
  }, [focus]);

  // 전체화면 처리
  useEffect(() => {
    if (isFullScreen) {
      const container = document.getElementById('cursorContainer') as HTMLElement;
      const bounds = container.getBoundingClientRect();

      // 현재 상태 백업
      setBackupPosition({ x: ui.position.x, y: ui.position.y });
      setBackupSize({ width: ui.size.width, height: ui.size.height });

      // 전체화면 모드: 화면 전체를 차지하도록 설정
      ui.setPosition({ x: bounds.left / 16, y: bounds.top / 16 });

      // calc 값을 실제 rem으로 계산
      const fullHeight = window.innerHeight / 16 - 3 - 0.25;
      const fullWidth = bounds.width / 16 - 0.25;

      ui.setSize({
        height: fullHeight,
        width: fullWidth,
      });
    } else if (!isFullScreen && backupPosition && backupSize) {
      // 전체화면 해제 시 백업된 상태로 복원
      ui.setPosition(backupPosition);
      ui.setSize(backupSize);
      setBackupPosition(null);
      setBackupSize(null);
    }
  }, [isFullScreen]);

  if (props.type === 'App') {
    const setEvent = useSetAtom(Event_Count);

    const open_vote = useAtomValue(Open_Vote);
    const set_open_vote = useSetAtom(Open_Vote);

    const sep_window = useAtomValue(Sep_window);

    const taskTransform = useAtomValue(taskTransformerAtom);

    return (
      <section
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          transform: `translate(${ui.position.x + ui.positionOffset.x}rem, ${ui.position.y + ui.positionOffset.y}rem)`,
          height: `${(ui.size.height + ui.sizeOffset.height).toString()}rem`,
          width: `${(ui.size.width + ui.sizeOffset.width).toString()}rem`,
          zIndex: zIndex,
          display: isMinimized || !hasEnabledSave ? 'none' : 'block',
          backgroundColor: 'white',
          border: `3px solid #ff8ef6`,
        }}
        onMouseDown={() => setFocus(props.instanceId || props.name)}
      >
        <_.Window>
          <Resize.Header
            {...ui}
            title={windowName}
            onDoubleClick={() => setIsFullScreen(!isFullScreen)}
          >
            <_.TitleContainer>
              <_.HeartImg
                src={Heart}
                draggable="false"
              />
              <_.Title>{windowName}</_.Title>
            </_.TitleContainer>
            <_.BtnContainer>
              <_.MinimizeButton
                onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                isFocus={focus === (props.instanceId || props.name)}
              >
                <img
                  src={Min}
                  alt=""
                  draggable="false"
                  width="100%"
                  onMouseEnter={() => {
                    setCursorImage(CURSOR_IMAGES.hand);
                  }}
                  onMouseLeave={() => {
                    setCursorImage(CURSOR_IMAGES.default);
                  }}
                />
              </_.MinimizeButton>
              <_.FullScreenButton
                onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  setIsFullScreen(!isFullScreen);
                }}
                isFocus={focus === (props.instanceId || props.name)}
              >
                <img
                  src={Full}
                  alt=""
                  draggable="false"
                  width="100%"
                  onMouseEnter={() => {
                    setCursorImage(CURSOR_IMAGES.hand);
                  }}
                  onMouseLeave={() => {
                    setCursorImage(CURSOR_IMAGES.default);
                  }}
                />
              </_.FullScreenButton>
              <_.ExitButton
                onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();

                  if (sep_window === true) {
                    setEvent((prev) => prev + 1);
                    set_sep_window(false);
                    set_open_vote(false);
                    return;
                  }

                  props.removeTask(props.removeCompnent);
                  if (!isLogIned) {
                    setIsLogIned('true');
                  }
                }}
                isFocus={focus === (props.instanceId || props.name)}
              >
                <img
                  src={Exit}
                  alt=""
                  width="100%"
                  draggable="false"
                  onMouseEnter={() => {
                    setCursorImage(CURSOR_IMAGES.hand);
                  }}
                  onMouseLeave={() => {
                    setCursorImage(CURSOR_IMAGES.default);
                  }}
                />
              </_.ExitButton>
            </_.BtnContainer>
          </Resize.Header>
          <_.BodyContainer windowType="framed">
            <_.ContentContainer windowType="framed">
              {(() => {
                const original = props.children;
                const internal = original.props.children as React.ReactElement;
                const type = internal.type;

                if (props.name === '추모관' || props.name.startsWith('추모관 뷰어')) {
                  return (
                    <Suspense fallback={null}>
                      {React.createElement(type, {
                        ...internal.props,
                        window: {
                          width: `${(ui.size.width + ui.sizeOffset.width) * 16}px`,
                          height: `${(ui.size.height + ui.sizeOffset.height) * 16}px`,
                        },
                        setWindow: (newWindow: any) => {
                          if (newWindow.width && newWindow.height) {
                            ui.setSize({
                              width: parseFloat(newWindow.width) / 16,
                              height: parseFloat(newWindow.height) / 16,
                            });
                          }
                        },
                        setUpHeight: props.setUpHeight,
                        setUpWidth: props.setUpWidth,
                        props,
                        setWindowName,
                        instanceId: props.instanceId,
                      })}
                    </Suspense>
                  );
                } else {
                  return props.children;
                }
              })()}
            </_.ContentContainer>

            {!isFullScreen && (
              <>
                <Resize.RightSide
                  {...ui}
                  minWidth={props.appSetup?.minWidth}
                />
                <Resize.RightCorner
                  {...ui}
                  minWidth={props.appSetup?.minWidth}
                  minHeight={props.appSetup?.minHeight}
                />
                <Resize.LeftSide
                  {...ui}
                  minWidth={props.appSetup?.minWidth}
                />
                <Resize.LeftCorner
                  {...ui}
                  minWidth={props.appSetup?.minWidth}
                  minHeight={props.appSetup?.minHeight}
                />
                <Resize.Bottom
                  {...ui}
                  minHeight={props.appSetup?.minHeight}
                />
              </>
            )}
          </_.BodyContainer>
        </_.Window>
      </section>
    );
  } else if (props.type === 'Shell') {
    return (
      <_.Shell
        className="shell"
        onClick={() => {
          setFocus('Discover');
        }}
      >
        {props.children}
      </_.Shell>
    );
  }
};

export default Application;
