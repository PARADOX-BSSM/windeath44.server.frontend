import * as _ from './style';
import { useEffect, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import Exit from "@/assets/headerButton/exit.svg";
import Full from "@/assets/headerButton/full.svg";
import Min from "@/assets/headerButton/min.svg";
import { useAtom } from 'jotai';
import {
  isLogInedAtom,
  focusAtom,
  layerAtom,
  tabDownInterruptAtom,
} from '@/atoms/windowManager.ts';
import {
  getCorner,
  widthCondition,
  heightCondition,
  leftCondition,
  DragParams,
  ApplicationProps,
} from './utils';

const Application = (props: ApplicationProps) => {
  // jotai 상태 사용
  const [layer, setLayer] = useAtom(layerAtom); // 창의 z-index(레이어)
  const [focus, setFocus] = useAtom(focusAtom); // 현재 포커스된 창 이름 (전역)
  const [tabDownInterrupt, setTabDownInterrupt] = useAtom(tabDownInterruptAtom); // 단축키 등으로 창 최소화 등 인터럽트 신호 (전역)
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom); // 로그인 여부 (전역)

  const windowProps: React.CSSProperties = {
    position: "absolute",
    height: props.setUpHeight,
    width: props.setUpWidth,
    top: (20 * globalThis.innerHeight) / 100,
    left: (30 * globalThis.innerWidth) / 100,
    backgroundColor: "#fff",
    zIndex: layer,
    filter: "dropShadow(gray 0px 0px 15px)",
  };
  const [window, setWindow] = useState<React.CSSProperties>(windowProps); // 현재 창의 상태 (위치, 크기, 스타일 등)
  const [backupWindow, setBackupWindow] = useState<React.CSSProperties>(window); // 전체화면 진입 전 창의 상태 백업
  const [cursor, setCursor] = useState<number[]>(props.cursorVec); // 커서 위치(컨테이너 기준)
  const [beforeSizeParams, setBeforeSizeParams] = useState<number[]>([0, 0]); // 리사이즈 시작 시점의 좌표
  const [beforeMoveParams, setBeforeMoveParams] = useState<number[]>([0, 0]); // 드래그 시작 시점의 좌표
  const [isFirst, setIsFirst] = useState<boolean>(true); // 리사이즈 첫 진입 여부
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false); // 전체화면 여부
  const [isMinimized, setIsMinimized] = useState<boolean>(false); // 최소화 여부


  // 커서 위치 동기화 : props로 받은 커서 위치(props.cursorVec)를 로컬 상태(cursor)로 동기화
  useEffect(() => {
    setBeforeMoveParams(cursor);
    setCursor(props.cursorVec);
  }, [props.cursorVec]);


  // UX 개선 : 현재 창의 상태가 바뀌면 focus를 현재 창으로 변경
  useEffect(() => {
    if (!isMinimized && (focus !== props.name)) {
      setFocus(props.name);
    }
  }, [window]);


  // 최소화 처리 : 최소화 시 창을 숨기고, 포커스를 "Discover"로 이동
  useEffect(() => {
    if (isMinimized) {
      setWindow({
        ...window,
        display: "none",
      });
      setFocus("Discover");
    }
  }, [isMinimized]);


  // Tab 인터럽트 처리 : tabDownInterrupt가 내 창이면 최소화 후 인터럽트 상태 초기화
  useEffect(() => {
    if (tabDownInterrupt === props.name) {
      setIsMinimized(true);
      setTabDownInterrupt("empty");
    }
  }, [tabDownInterrupt]);


  // 포커스 관리 : 창이 최소화되지 않았고, 포커스가 내 창이 아니면 내 창으로 포커스 이동
  useEffect(() => {
    if (props.type !== "Shell" && focus === props.name) {
      setLayer(layer + 1);
      setIsMinimized(false);
      setWindow({
        ...window,
        display: undefined,
        zIndex: layer,
      });
    }
  }, [focus]);


  
  // 전체화면 처리 : 전체화면 진입 시 창 상태 백업 후 화면 전체로 확장, 해제 시 복원
  useEffect(() => {
    if (isFullScreen) {
      const container = document.getElementById("cursorContainer") as HTMLElement;
      const bounds = container.getBoundingClientRect();
      setBackupWindow(window);
      setWindow({
        ...window,
        height: `calc(100vh - 52px)`,
        width: bounds.width,
        top: bounds.top,
        left: bounds.left,
        zIndex: layer - 1,
        filter: undefined
      });
    } else if (!isFullScreen) {
      setWindow(backupWindow);
    }
  }, [isFullScreen]);

  // 유틸 함수 사용
  const corner = getCorner(props.cursorVec, window);

  const widthLimit = (params: DragParams) => {
    const [nearRight] = corner;
    if (window.width as unknown as number >= props.appSetup.minWidth) {
      if (nearRight) {
        return Number(window.width) + params.offset[0] - beforeSizeParams[0];
      } else {
        return Number(window.width) - params.offset[0] + beforeSizeParams[0];
      }
    }
    return props.appSetup.minWidth;
  };
  const heightLimit = (params: DragParams) => {
    if (window.height as unknown as number >= props.appSetup.minHeight) {
      return Number(window.height) + params.offset[1] - beforeSizeParams[1];
    }
    return props.appSetup.minHeight;
  };
  const leftLimit = (params: DragParams) => {
    if (window.width as unknown as number >= props.appSetup.minWidth) {
      return Number(window.left) + params.offset[0] - beforeSizeParams[0];
    }
    return window.left;
  };

  const sizeManager = useDrag((params) => {
    if (isFirst && !isFullScreen && (heightCondition(corner) || widthCondition(corner) || leftCondition(corner))) {
      setWindow({
        ...window,
        height: heightCondition(corner) ? heightLimit(params) : window.height,
        width: widthCondition(corner) ? widthLimit(params) : window.width,
        left: leftCondition(corner) ? leftLimit(params) : window.left,
        zIndex: layer - 1,
      });
    } else {
      setIsFirst(false);
    }
    setBeforeSizeParams(params.offset);
  });

  const moveManager = useDrag(() => {
    if (!isFullScreen) {
      let x = cursor[0];
      let y = cursor[1];
      setWindow({
        ...window,
        left: Number(window.left) + (x - beforeMoveParams[0]),
        top: Number(window.top) + (y - beforeMoveParams[1]),
        zIndex: layer - 1,
      });
    }
  });

  if (props.type === "App") {
    return (
      <_.Window style={window} onMouseDown={() => setFocus(props.name)}>
        <_.WindowHeader {...moveManager()}>
          {focus === props.name ?
            <>
              <_.FullScreenButton onClick={() =>
                setIsFullScreen(!isFullScreen)
              }>
                <img src={Full} alt="" />
              </_.FullScreenButton>
              <_.MinimizeButton onClick={() =>
                setIsMinimized(!isMinimized)
              }>
                <img src={Min} alt="" />
              </_.MinimizeButton>
              <_.ExitButton onClick={() => {
                props.removeTask(props.removeCompnent);
                if (!isLogIned) {
                  setIsLogIned(true);
                }
              }}>
                <img src={Exit} alt="" />
              </_.ExitButton>
            </> :
            <>
              <_.HeaderButton onClick={() =>
                props.removeTask(props.removeCompnent)
              }></_.HeaderButton>
              <_.HeaderButton onClick={() =>
                setIsFullScreen(!isFullScreen)
              }></_.HeaderButton>
              <_.HeaderButton onClick={() =>
                setIsMinimized(!isMinimized)
              }> </_.HeaderButton>
            </>
          }
        </_.WindowHeader>
        <_.WindowContent {...sizeManager()} onMouseUp={() => setIsFirst(true)}>
          {props.children}
        </_.WindowContent>
      </_.Window>
    );
  } else if (props.type === "Shell") {
    return (
      <_.Shell className="shell" onClick={() => setFocus("Discover")}>
        {props.children}
      </_.Shell>
    );
  }
};
export default Application;