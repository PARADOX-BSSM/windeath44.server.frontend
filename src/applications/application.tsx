import {useEffect, useState} from 'react';
import {useDrag} from 'react-use-gesture';
import styled from "styled-components";

const Window = styled.article`
    border: 1px solid black;
    border-radius: 5px;
`
const WindowHeader = styled.header`
    background-color: darkolivegreen;
    border-radius: 4px 4px 0 0;
    position : absolute;
    display : flex;
    align-items: center;
    top : 0;
    left : 0;
    right : 0;
    height : 30px;
`;
const HeaderButton = styled.button`
    height : 20px;
    width : 20px;
    margin-left: 5px;
`;
const MinimizeButton = styled(HeaderButton)`
    background-color: orange;
    border: 1px solid darkorange;
    border-radius: 2px;
    &:hover {
        background-color: darkorange;
        border: 1px solid darkgoldenrod;
    }
`;
const FullScreenButton = styled(HeaderButton)`
    background-color: greenyellow;
    border: 1px solid green;
    border-radius: 2px;
    &:hover {
        background-color: green;
        border: 1px solid darkgreen;
    }
`;
const ExitButton = styled(HeaderButton)`
    background-color: red;
    border: 1px solid darkred;
    border-radius: 2px;
    &:hover {
        background-color: darkred;
        border: 1px solid #600000;
    }
`;
const WindowContent = styled.section`
    position : absolute;
    top : 30px;
    left : 0;
    right : 0;
    bottom : 0;
    padding : 0 5px 5px 5px;
    background-color: lawngreen;
    border-radius: 0 0 4px 4px;
`;
const Shell = styled.article`
    height : 100%;
    width : 100%;
`;
const Application = (props:any) => {
  const windowProps:React.CSSProperties = {
    position : "absolute",
    height : 400,
    width : 300,
    top : (20 * globalThis.innerHeight) / 100,
    left : (30 * globalThis.innerWidth) / 100,
    backgroundColor : "black",
    zIndex: props.layer,
    filter: "dropShadow(gray 0px 0px 15px)",
  }
  const [window, setWindow] = useState<React.CSSProperties>(windowProps);//창 Props
  const [backupWindow, setBackupWindow] = useState<React.CSSProperties>(window);//창 최대화 전 Props 백업
  const [cursor, setCursor] = useState<string[]>(props.cursorVec);//보정 후 커서 위치
  const [beforeSizeParams, setBeforeSizeParams] = useState<number[]>([0,0]);//이전 useDrag params 저장(size)
  const [beforeMoveParams, setBeforeMoveParams] = useState<number[]>([0,0]);//이전 useDrag params 저장(move)
  const [isFirst, setIsFirst] = useState<boolean>(true);//첫 클릭 여부
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);//창 최대 여부
  const [isMinimized, setIsMinimized] = useState<boolean>(false);//창 최소화 여부


  useEffect(() => { //cursorVec 동기화
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
    if(props.focus===props.name) {
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
  },[props.focus])
  useEffect(()=>{ //창 최대화 상태
    if(isFullScreen){
      const container = document.getElementById("display") as HTMLElement;
      const bounds = container.getBoundingClientRect();
      setBackupWindow(window);
      setWindow({
        display: undefined,
        position: window.position,
        height: `calc(100vh - 52px)`,
        width: `calc(100vw - 2px)`,
        top: bounds.top,
        left: 0,
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

    const nearRight = x >= left + width - 10;
    const nearLeft = x <= left + 10;
    const nearBottom = y >= top + height - 10;

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
    return (((props.mouseBeacon[0] <= window.left + 10)
        && (props.mouseBeacon[1] >= window.top + window.height - 10))
      ||(props.mouseBeacon[0] <= window.left + 10))
  }
  const widthLimit = (params:any) => { //가로 최소 크기 조건문
    if (window.width as unknown as number >=props.appSetup.minWidth){
      if ((props.mouseBeacon[0] >= window.left + window.width - 10)
          && (props.mouseBeacon[1] >= window.top + window.height - 10)
        ||(props.mouseBeacon[0] >= window.left + window.width - 10)
        ) {
        return window.width + params.offset[0] - beforeSizeParams[0];
      }else{
        return window.width as unknown as number - params.offset[0] + beforeSizeParams[0];
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
    props.setFocus(props.name);
    if(!isFullScreen) {
      const container = document.getElementById("display") as HTMLElement;
      const bounds = container.getBoundingClientRect();

      let x = parseFloat(cursor[0]);
      let y = parseFloat(cursor[1]);
      setWindow({
        display: undefined,
        position: window.position,
        height: window.height,
        width: window.width,
        left: x <= 0 || x >= bounds.width - 5?
          window.left:
          window.left as unknown as number + params.offset[0] - beforeMoveParams[0],
        top: y <= 0 || y >= bounds.height - 55?
          window.top:
          window.top as unknown as number + params.offset[1] - beforeMoveParams[1],
        zIndex: props.layer - 1,
        backgroundColor: window.backgroundColor,
        filter: "dropShadow(gray 0px 0px 15px)",
      })
    }
    setBeforeMoveParams(params.offset);
  })
  if(props.type==="App") {
    return (
      <Window style={window} onMouseDown={()=>{
        props.setFocus(props.name)
      }}>
        <WindowHeader {...moveManager()}>
          {props.focus === props.name?
            <>
              <ExitButton onClick={() =>
                props.removeTask(props.removeCompnent)
              }></ExitButton>
              <FullScreenButton onClick={()=>
                setIsFullScreen(!isFullScreen)
              }></FullScreenButton>
              <MinimizeButton onClick={()=>
                setIsMinimized(!isMinimized)
              }> </MinimizeButton>
            </>:
            <>
              <HeaderButton onClick={() =>
                props.removeTask(props.removeCompnent)
              }></HeaderButton>
              <HeaderButton onClick={()=>
                setIsFullScreen(!isFullScreen)
              }></HeaderButton>
              <HeaderButton onClick={()=>
                setIsMinimized(!isMinimized)
              }> </HeaderButton>
            </>
          }
        </WindowHeader>
        <WindowContent {...sizeManager()} onMouseUp={()=>setIsFirst(true)}>
          {props.children}
        </WindowContent>
      </Window>
    )
  }else if(props.type==="Shell") {
    return (
      <Shell className="shell" onClick={()=>props.setFocus("Discover")}>
        {props.children}
      </Shell>
    )
  }
}
export default Application;