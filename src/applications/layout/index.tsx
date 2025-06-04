import * as _ from './style';
import {useEffect, useState} from 'react';
import {useDrag} from 'react-use-gesture';
import {toNumber} from "@/modules/typeModule.tsx";
import Exit from "@/assets/headerButton/exit.svg";
import Full from "@/assets/headerButton/full.svg";
import Min from "@/assets/headerButton/min.svg";

const Application = (props:any) => {
  const windowProps:React.CSSProperties = {
    position : "absolute",
    height : props.setUpHeight,
    width : props.setUpWidth,
    top : (20 * globalThis.innerHeight) / 100,
    left : (30 * globalThis.innerWidth) / 100,
    backgroundColor : "#fff",
    zIndex: props.layer,
    filter: "dropShadow(gray 0px 0px 15px)",
  }
  const [window, setWindow] = useState<React.CSSProperties>(windowProps);//창 Props
  const [backupWindow, setBackupWindow] = useState<React.CSSProperties>(window);//창 최대화 전 Props 백업
  const [cursor, setCursor] = useState<number[]>(props.cursorVec);//보정 후 커서 위치
  const [beforeSizeParams, setBeforeSizeParams] = useState<number[]>([0,0]);//이전 useDrag params 저장(size)
  const [beforeMoveParams, setBeforeMoveParams] = useState<number[]>([0,0]);//이전 useDrag params 저장(move)
  const [isFirst, setIsFirst] = useState<boolean>(true);//첫 클릭 여부
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);//창 최대 여부
  const [isMinimized, setIsMinimized] = useState<boolean>(false);//창 최소화 여부

  useEffect(() => { //cursorVec 동기화
    setBeforeMoveParams(cursor);
    setCursor(props.cursorVec);

  }, [props.cursorVec]);
  useEffect(()=>{ //창 Props 수정될 시 Focus
    if(!isMinimized && (props.focus !== props.name)) {
      props.setFocus(props.name);
    }
  },[window])
  useEffect(()=>{
    if(isMinimized){
      setWindow({
        display: "none",
        position: window.position,
        height: window.height,
        width: window.width,
        top: window.top,
        left: window.left,
        zIndex: props.layer,
        backgroundColor: window.backgroundColor,
        filter: "dropShadow(gray 0px 0px 15px)"
      })
      props.setFocus("Discover");
    }
  },[isMinimized])
  useEffect(()=>{
    if(props.tabDownInterrupt==props.name) {
      setIsMinimized(true);
      props.setTabDownInterrupt("empty")
    }
  },[props.tabDownInterrupt])
  useEffect(()=>{ //Fucus가 본인이면 가장 높은 Layer로 렌더링
    if(props.type !== "Shell") {
      if (props.focus === props.name) {
        props.setLayer(props.layer + 1);
        setIsMinimized(false);
        setWindow({
          display: undefined,
          position: window.position,
          height: window.height,
          width: window.width,
          top: window.top,
          left: window.left,
          zIndex: props.layer,
          backgroundColor: window.backgroundColor,
          filter: "dropShadow(gray 0px 0px 15px)",
        })
      }
    }
  },[props.focus])
  useEffect(()=>{ //창 최대화 상태
    if(isFullScreen){
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
        zIndex: props.layer-1,
        backgroundColor: window.backgroundColor,
        filter: undefined
      })
    }else if(!isFullScreen){
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
  }

  const widthCondition = () => { //창 가로 크기 조건문
    const [nearRight, nearLeft, nearBottom] = Corner();
    return ((nearRight && nearBottom) || (nearLeft && nearBottom) || nearRight || nearLeft);
  }
  const heightCondition = () => { //창 세로 크기 조건문
    const [nearRight, nearLeft, nearBottom] = Corner();
    return ((nearRight && nearBottom) || (nearLeft && nearBottom) || nearBottom)
  }
  const leftCondition = () => { //창 위치 조건문
    const [, nearLeft, nearBottom] = Corner();
    return ((nearLeft && nearBottom) || nearLeft)
  }
  const widthLimit = (params:any) => { //가로 최소 크기 조건문
    const [nearRight, , ] = Corner();
    if (window.width as unknown as number >=props.appSetup.minWidth){
      if (nearRight) {
        return toNumber(window.width) + params.offset[0] - beforeSizeParams[0];
      }else{
        return toNumber(window.width) - params.offset[0] + beforeSizeParams[0];
      }
    }
    return props.appSetup.minWidth;
  }
  const heightLimit = (params:any) => { //세로 최소 크기 조건문
    if (window.height as unknown as number >=props.appSetup.minHeight){
      return window.height + params.offset[1] - beforeSizeParams[1];
    }
    return props.appSetup.minHeight;
  }
  const leftLimit = (params:any) => { //가로 최소 크기 조건문
    if (window.width as unknown as number >=props.appSetup.minWidth){
      return window.left + params.offset[0] - beforeSizeParams[0];
    }
    return window.left;
  }
  const sizeManager = useDrag((params)=>{ //size 조절
    if(isFirst && !isFullScreen && (heightCondition() || widthCondition() || leftCondition())) {

      setWindow({
        display: undefined,
        position: window.position,
        height: heightCondition()?heightLimit(params):window.height,
          width: widthCondition()?widthLimit(params):window.width,
        top: window.top,
        left: leftCondition()?leftLimit(params):window.left,
        zIndex: props.layer - 1,
        backgroundColor: window.backgroundColor,
        filter: "dropShadow(gray 0px 0px 15px)"
      })
    } else{
        setIsFirst(false);
    }
    setBeforeSizeParams(params.offset);
  })
  const moveManager = useDrag((params)=>{ //위치 조절
    // props.setFocus(props.name);
    if(!isFullScreen) {
      let x = cursor[0];
      let y = cursor[1];
      setWindow({
        display: undefined,
        position: window.position,
        height: window.height,
        width: window.width,
        left: window.left as unknown as number + (x - beforeMoveParams[0]),
        top: window.top as unknown as number + (y - beforeMoveParams[1]),
        zIndex: props.layer - 1,
        backgroundColor: window.backgroundColor,
        filter: "dropShadow(gray 0px 0px 15px)",
      })
    }
  })

  if(props.type==="App") {
    return (
      <_.Window style={window} onMouseDown={()=>{
        props.setFocus(props.name)
      }}>
        <_.WindowHeader {...moveManager()}>
          {props.focus === props.name?
            <>
              <_.FullScreenButton onClick={()=>
                setIsFullScreen(!isFullScreen)
              }>
                <img src={Full} alt=""/>
              </_.FullScreenButton>
              <_.MinimizeButton onClick={()=>
                setIsMinimized(!isMinimized)
              }>
                <img src={Min} alt=""/>
              </_.MinimizeButton>
              <_.ExitButton onClick={() =>
              {
                props.removeTask(props.removeCompnent);
                if (!props.isLogIned) {
                  props.setIsLogIned(true);
                }
              }
              }>
                <img src={Exit} alt=""/>
              </_.ExitButton>
            </>:
            <>
              <_.HeaderButton onClick={() =>
                props.removeTask(props.removeCompnent)
              }></_.HeaderButton>
              <_.HeaderButton onClick={()=>
                setIsFullScreen(!isFullScreen)
              }></_.HeaderButton>
              <_.HeaderButton onClick={()=>
                setIsMinimized(!isMinimized)
              }> </_.HeaderButton>
            </>
          }
        </_.WindowHeader>
        <_.WindowContent {...sizeManager()} onMouseUp={()=>setIsFirst(true)}>
          {props.children}
        </_.WindowContent>
      </_.Window>
    )
  }else if(props.type==="Shell") {
    return (
      <_.Shell className="shell" onClick={()=>props.setFocus("Discover")}>
        {props.children}
      </_.Shell>
    )
  }
}
export default Application;