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
  const [layer, setLayer] = useAtom(layerAtom);
  const [focus, setFocus] = useAtom(focusAtom);
  const [tabDownInterrupt, setTabDownInterrupt] = useAtom(tabDownInterruptAtom);
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);

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
  const [window, setWindow] = useState<React.CSSProperties>(windowProps);
  const [backupWindow, setBackupWindow] = useState<React.CSSProperties>(window);
  const [cursor, setCursor] = useState<number[]>(props.cursorVec);
  const [beforeSizeParams, setBeforeSizeParams] = useState<number[]>([0, 0]);
  const [beforeMoveParams, setBeforeMoveParams] = useState<number[]>([0, 0]);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    setBeforeMoveParams(cursor);
    setCursor(props.cursorVec);
  }, [props.cursorVec]);

  useEffect(() => {
    if (!isMinimized && (focus !== props.name)) {
      setFocus(props.name);
    }
  }, [window]);

  useEffect(() => {
    if (isMinimized) {
      setWindow({
        ...window,
        display: "none",
      });
      setFocus("Discover");
    }
  }, [isMinimized]);

  useEffect(() => {
    if (tabDownInterrupt === props.name) {
      setIsMinimized(true);
      setTabDownInterrupt("empty");
    }
  }, [tabDownInterrupt]);

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