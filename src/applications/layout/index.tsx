import * as _ from './style';
import { useEffect, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { toNumber } from "@/modules/typeModule.tsx";
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

const Application = (props: any) => {
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
        display: "none",
        position: window.position,
        height: window.height,
        width: window.width,
        top: window.top,
        left: window.left,
        zIndex: layer,
        backgroundColor: window.backgroundColor,
        filter: "dropShadow(gray 0px 0px 15px)"
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
    if (props.type !== "Shell") {
      if (focus === props.name) {
        setLayer(layer + 1);
        setIsMinimized(false);
        setWindow({
          display: undefined,
          position: window.position,
          height: window.height,
          width: window.width,
          top: window.top,
          left: window.left,
          zIndex: layer,
          backgroundColor: window.backgroundColor,
          filter: "dropShadow(gray 0px 0px 15px)",
        });
      }
    }
  }, [focus]);

  useEffect(() => {
    if (isFullScreen) {
      const container = document.getElementById("cursorContainer") as HTMLElement;
      const bounds = container.getBoundingClientRect();
      setBackupWindow(window);
      setWindow({
        display: undefined,
        position: window.position,
        height: `calc(100vh - 52px)`,
        width: bounds.width,
        top: bounds.top,
        left: bounds.left,
        zIndex: layer - 1,
        backgroundColor: window.backgroundColor,
        filter: undefined
      });
    } else if (!isFullScreen) {
      setWindow(backupWindow);
    }
  }, [isFullScreen]);

  const Corner = () => {
    const [x, y] = props.mouseBeacon;
    const { left, top, width, height } = window;

    const nearRight = x >= toNumber(left) + toNumber(width) - 10;
    const nearLeft = x <= toNumber(left) + 10;
    const nearBottom = y >= toNumber(top) + toNumber(height) - 10;

    return [nearRight, nearLeft, nearBottom];
  };

  const widthCondition = () => {
    const [nearRight, nearLeft, nearBottom] = Corner();
    return ((nearRight && nearBottom) || (nearLeft && nearBottom) || nearRight || nearLeft);
  };
  const heightCondition = () => {
    const [nearRight, nearLeft, nearBottom] = Corner();
    return ((nearRight && nearBottom) || (nearLeft && nearBottom) || nearBottom);
  };
  const leftCondition = () => {
    const [, nearLeft, nearBottom] = Corner();
    return ((nearLeft && nearBottom) || nearLeft);
  };
  const widthLimit = (params: any) => {
    const [nearRight] = Corner();
    if (window.width as unknown as number >= props.appSetup.minWidth) {
      if (nearRight) {
        return toNumber(window.width) + params.offset[0] - beforeSizeParams[0];
      } else {
        return toNumber(window.width) - params.offset[0] + beforeSizeParams[0];
      }
    }
    return props.appSetup.minWidth;
  };
  const heightLimit = (params: any) => {
    if (window.height as unknown as number >= props.appSetup.minHeight) {
      return window.height + params.offset[1] - beforeSizeParams[1];
    }
    return props.appSetup.minHeight;
  };
  const leftLimit = (params: any) => {
    if (window.width as unknown as number >= props.appSetup.minWidth) {
      return window.left + params.offset[0] - beforeSizeParams[0];
    }
    return window.left;
  };
  const sizeManager = useDrag((params) => {
    if (isFirst && !isFullScreen && (heightCondition() || widthCondition() || leftCondition())) {
      setWindow({
        display: undefined,
        position: window.position,
        height: heightCondition() ? heightLimit(params) : window.height,
        width: widthCondition() ? widthLimit(params) : window.width,
        top: window.top,
        left: leftCondition() ? leftLimit(params) : window.left,
        zIndex: layer - 1,
        backgroundColor: window.backgroundColor,
        filter: "dropShadow(gray 0px 0px 15px)"
      });
    } else {
      setIsFirst(false);
    }
    setBeforeSizeParams(params.offset);
  });
  const moveManager = useDrag((params) => {
    if (!isFullScreen) {
      let x = cursor[0];
      let y = cursor[1];
      setWindow({
        display: undefined,
        position: window.position,
        height: window.height,
        width: window.width,
        left: window.left as unknown as number + (x - beforeMoveParams[0]),
        top: window.top as unknown as number + (y - beforeMoveParams[1]),
        zIndex: layer - 1,
        backgroundColor: window.backgroundColor,
        filter: "dropShadow(gray 0px 0px 15px)",
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