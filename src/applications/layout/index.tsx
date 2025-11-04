import * as _ from './style';
import { Suspense, useEffect, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import Exit from '@/assets/headerButton/exit.svg';
import Full from '@/assets/headerButton/full.svg';
import Min from '@/assets/headerButton/min.svg';
import Heart from '@/assets/headerButton/heart.svg';
import { useAtom } from 'jotai';
import {
  isLogInedAtom,
  focusAtom,
  layerAtom,
  tabDownInterruptAtom,
} from '@/atoms/windowManager.ts';
import { windowPositionsAtom } from '@/atoms/processManager.ts';
import {
  getCorner,
  widthCondition,
  heightCondition,
  leftCondition,
  ApplicationProps,
} from './utils';

import React from 'react';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

const Application = (props: ApplicationProps) => {
  // jotai 상태 사용
  const [layer, setLayer] = useAtom(layerAtom); // 창의 z-index(레이어)
  const [focus, setFocus] = useAtom(focusAtom); // 현재 포커스된 창 이름 (전역)
  const [tabDownInterrupt, setTabDownInterrupt] = useAtom(tabDownInterruptAtom); // 단축키 등으로 창 최소화 등 인터럽트 신호 (전역)
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom); // 로그인 여부 (전역)
  const [windowPositions, setWindowPositions] = useAtom(windowPositionsAtom); // 창 위치 저장 (전역)
  const [windowName, setWindowName] = useState<string>(props.name); // 현재 창 이름 (로컬)

  const setUpHeight = props.setUpHeight;
  const setUpWidth = props.setUpWidth;

  // 초기값은 항상 기본값 사용
  const windowProps: React.CSSProperties = {
    position: 'absolute',
    height: props.setUpHeight,
    width: props.setUpWidth,
    top: (20 * globalThis.innerHeight) / 100,
    left: (30 * globalThis.innerWidth) / 100,
    backgroundColor: '#fff',
    zIndex: layer,
    filter: 'dropShadow(gray 0px 0px 15px)',
  };
  const [window, setWindow] = useState<React.CSSProperties>(windowProps); // 현재 창의 상태 (위치, 크기, 스타일 등)
  const [backupWindow, setBackupWindow] = useState<React.CSSProperties>(window); // 전체화면 진입 전 창의 상태 백업
  const [cursor, setCursor] = useState<number[]>(props.cursorVec); // 커서 위치(컨테이너 기준)
  const [beforeSizeParams, setBeforeSizeParams] = useState<number[]>([0, 0]); // 리사이즈 시작 시점의 좌표
  const [beforeMoveParams, setBeforeMoveParams] = useState<number[]>([0, 0]); // 드래그 시작 시점의 좌표
  const [isFirst, setIsFirst] = useState<boolean>(true); // 리사이즈 첫 진입 여부
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false); // 전체화면 여부
  const [isMinimized, setIsMinimized] = useState<boolean>(false); // 최소화 여부
  const [hasEnabledSave, setHasEnabledSave] = useState<boolean>(false); // 저장 활성화 여부

  // 커서 위치 동기화 : props로 받은 커서 위치(props.cursorVec)를 로컬 상태(cursor)로 동기화
  useEffect(() => {
    setBeforeMoveParams(cursor);
    setCursor(props.cursorVec);
  }, [props.cursorVec]);

  // 마운트 후 위치 복원 (초기 렌더링 후 짧은 딜레이)
  useEffect(() => {
    if (isFullScreen) {
      return;
    }

    const savedPos = windowPositions[props.name];
    if (savedPos) {
      console.log('[Application] Will restore position for', props.name, 'after delay');
      const timer = setTimeout(() => {
        console.log('[Application] Restoring position for', props.name, savedPos);
        setWindow((prev) => ({
          ...prev,
          height: savedPos.height,
          width: savedPos.width,
          top: savedPos.top,
          left: savedPos.left,
        }));
        // 복원 후 조금 더 기다렸다가 저장 활성화
        setTimeout(() => {
          console.log('[Application] Enabling save for', props.name);
          setHasEnabledSave(true);
        }, 100);
      }, 100); // 초기 렌더링 후 복원
      return () => clearTimeout(timer);
    } else {
      // 저장된 위치가 없으면 바로 저장 활성화
      const timer = setTimeout(() => {
        console.log('[Application] No saved position, enabling save for', props.name);
        setHasEnabledSave(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [props.name, windowPositions, isFullScreen]);

  // 창의 위치/크기 저장 : window state가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    // 저장이 활성화되지 않았으면 무시
    if (!hasEnabledSave) {
      return;
    }

    // 전체화면, 최소화, instanceId가 있는 동적 창은 저장하지 않음
    if (isFullScreen || isMinimized || props.instanceId || props.type !== 'App') {
      return;
    }

    // 유효한 위치 정보가 있을 때만 저장
    if (window.top !== undefined && window.left !== undefined && window.width && window.height) {
      const position = {
        top: Number(window.top),
        left: Number(window.left),
        width: Number(window.width),
        height: Number(window.height),
      };

      console.log('[Application] Saving position for', props.name, position);
      setWindowPositions((prev) => ({
        ...prev,
        [props.name]: position,
      }));
    }
  }, [window.top, window.left, window.width, window.height, isFullScreen, isMinimized, hasEnabledSave, props.instanceId, props.type, props.name, setWindowPositions]);

  // UX 개선 : 현재 창이 클릭되면 focus를 현재 창으로 변경 (마운트 시에만)
  useEffect(() => {
    if (!isMinimized && focus !== (props.instanceId || props.name)) {
      // 초기 마운트 시에만 포커스 설정 (window 의존성 제거로 무한 루프 방지)
      setFocus(props.instanceId || props.name);
    }
  }, []); // 빈 배열: 마운트 시에만 실행

  // 최소화 처리 : 최소화 시 창을 숨기고, 포커스를 "Discover"로 이동
  useEffect(() => {
    if (isMinimized) {
      setWindow((prev) => ({
        ...prev,
        display: 'none',
      }));
      setFocus('Discover');
    }
  }, [isMinimized]);

  // Tab 인터럽트 처리 : tabDownInterrupt가 내 창이면 최소화 후 인터럽트 상태 초기화
  useEffect(() => {
    if (tabDownInterrupt === (props.instanceId || props.name)) {
      setIsMinimized(true);
      setTabDownInterrupt('empty');
    }
  }, [tabDownInterrupt]);

  // 포커스 관리 : 창이 최소화되지 않았고, 포커스가 내 창이 아니면 내 창으로 포커스 이동
  useEffect(() => {
    if (props.type !== 'Shell' && focus === (props.instanceId || props.name)) {
      setLayer(layer + 1);
      setIsMinimized(false);
      setWindow((prev) => ({
        ...prev,
        display: undefined,
        zIndex: layer,
      }));
    }
  }, [focus]);

  // 전체화면 처리 : 전체화면 진입 시 창 상태 백업 후 화면 전체로 확장, 해제 시 복원
  useEffect(() => {
    if (isFullScreen) {
      const container = document.getElementById('cursorContainer') as HTMLElement;
      const bounds = container.getBoundingClientRect();
      setWindow((prev) => {
        setBackupWindow(prev); // 현재 상태를 백업
        return {
          ...prev,
          height: `calc(100vh - ${48 / 16}rem - 1.3rem)`,
          width: `calc(${bounds.width}px - 1.3rem)`,
          top: bounds.top,
          left: bounds.left,
          zIndex: layer - 1,
          filter: undefined,
        };
      });
    } else if (!isFullScreen) {
      setWindow(backupWindow);
    }
  }, [isFullScreen]);

  // 유틸 함수 사용
  const corner = getCorner(props.cursorVec, window);

  const sizeManager = useDrag((params) => {
    if (
      isFirst &&
      !isFullScreen &&
      (heightCondition(corner) || widthCondition(corner) || leftCondition(corner))
    ) {
      setWindow((prev) => {
        const [nearRight] = corner;

        // widthLimit 로직
        const minWidth = (prev.minWidth as number) || props.appSetup.minWidth;
        let newWidth = prev.width;
        if (widthCondition(corner)) {
          if ((prev.width as unknown as number) >= minWidth) {
            if (nearRight) {
              newWidth = Number(prev.width) + params.offset[0] - beforeSizeParams[0];
            } else {
              newWidth = Number(prev.width) - params.offset[0] + beforeSizeParams[0];
            }
          } else {
            newWidth = minWidth;
          }
        }

        // heightLimit 로직
        const minHeight = (prev.minHeight as number) || props.appSetup.minHeight;
        let newHeight = prev.height;
        if (heightCondition(corner)) {
          if ((prev.height as unknown as number) >= minHeight) {
            newHeight = Number(prev.height) + params.offset[1] - beforeSizeParams[1];
          } else {
            newHeight = minHeight;
          }
        }

        // leftLimit 로직
        let newLeft = prev.left;
        if (leftCondition(corner)) {
          if ((prev.width as unknown as number) >= minWidth) {
            newLeft = Number(prev.left) + params.offset[0] - beforeSizeParams[0];
          }
        }

        return {
          ...prev,
          height: newHeight,
          width: newWidth,
          left: newLeft,
          zIndex: layer - 1,
        };
      });
    } else {
      setIsFirst(false);
    }
    setBeforeSizeParams(params.offset);
  });

  const moveManager = useDrag(() => {
    if (!isFullScreen) {
      setWindow((prev) => {
        let x = cursor[0];
        let y = cursor[1];

        // 새로운 위치 계산
        let newLeft = Number(prev.left) + (x - beforeMoveParams[0]);
        let newTop = Number(prev.top) + (y - beforeMoveParams[1]);

        // 화면 경계 제한 (헤더가 최소 30px 이상 보이도록)
        const minTop = 0; // 상단 경계
        const maxTop = globalThis.innerHeight - 90; // 하단 경계 (헤더 높이 30px 고려)
        const minLeft = -Number(prev.width) + 100; // 좌측 경계 (100px 정도는 보이도록)
        const maxLeft = globalThis.innerWidth - 100; // 우측 경계
        // 경계 내로 제한
        newTop = Math.max(minTop, Math.min(maxTop, newTop));
        newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));

        return {
          ...prev,
          left: newLeft,
          top: newTop,
          zIndex: layer - 1,
        };
      });
    }
  });

  if (props.type === 'App') {
    return (
      <_.Window
        style={window}
        onMouseDown={() => setFocus(props.instanceId || props.name)}
      >
        <_.WindowHeader {...moveManager()}>
          <_.TitleContainer>
            <_.HeartImg
              src={Heart}
              draggable="false"
            />
            <_.Title>{windowName}</_.Title>
          </_.TitleContainer>
          <_.BtnContainer>
            <_.MinimizeButton
              onMouseDown={() => setIsMinimized(!isMinimized)}
              isFocus={focus === (props.instanceId || props.name)}
            >
              <img
                src={Min}
                alt=""
                draggable="false"
                width="100%"
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              />
            </_.MinimizeButton>
            <_.FullScreenButton
              onMouseDown={() => setIsFullScreen(!isFullScreen)}
              isFocus={focus === (props.instanceId || props.name)}
            >
              <img
                src={Full}
                alt=""
                draggable="false"
                width="100%"
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              />
            </_.FullScreenButton>

            <_.ExitButton
              onMouseDown={() => {
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
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              />
            </_.ExitButton>
          </_.BtnContainer>
        </_.WindowHeader>
        <_.WindowContent
          {...sizeManager()}
          onMouseUp={() => setIsFirst(true)}
        >
          {(() => {
            const original = props.children;
            const internal = original.props.children as React.ReactElement;
            const type = internal.type;

            if (props.name === '추모관' || props.name.startsWith('추모관 뷰어')) {
              return (
                <Suspense fallback={null}>
                  {React.createElement(type, {
                    ...internal.props,
                    window,
                    setWindow,
                    setUpHeight,
                    setUpWidth,
                    props,
                    setWindowName,
                  })}
                </Suspense>
              );
            } else {
              return props.children;
            }
          })()}
        </_.WindowContent>
      </_.Window>
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
