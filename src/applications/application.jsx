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
const Application = (props) => {
  const windowProps = {
    position : "absolute",
    height : 400,
    width : 300,
    top : (20 * globalThis.innerHeight) / 100,
    left : (30 * globalThis.innerWidth) / 100,
    backgroundColor : "black",
    zIndex: props.layer,
    filter: "dropShadow(gray 0px 0px 15px)",
  }

  const shellProps = {
    height : "100%",
    width : "100%",
  }
  const [window, setWindow] = useState(windowProps);
  const [backupWindow, setBackupWindow] = useState(window);
  const [cursorX, setCursorX] = useState(props.cursorLeft);
  const [cursorY, setCursorY] = useState(props.cursorTop);
  const [beforeSizeParams, setBeforeSizeParams] = useState([0,0]);
  const [beforeMoveParams, setBeforeMoveParams] = useState([0,0]);
  const [isFirst, setIsFirst] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    setCursorX(props.cursorLeft);
    setCursorY(props.cursorTop);
  }, [props.cursorLeft, props.cursorTop]);
  useEffect(()=>{
    props.setFocus(props.name);
  },[window])
  useEffect(()=>{
    if(props.focus===props.name) {
      props.setLayer(props.layer + 1);
      setWindow({
        position: window.position,
        height: 400,
        width: 300,
        top: window.top,
        left: window.left,
        zIndex: props.layer,
        filter: "dropShadow(gray 0px 0px 15px)",
      })
    }
  },[props.focus])
  useEffect(()=>{
    if(isFullScreen){
      const container = document.getElementById("container");
      const bounds = container.getBoundingClientRect();
      setBackupWindow(window);
      setWindow({
        position: window.position,
        height: `calc(${bounds.height}px - 52px)`,
        width: `calc(${bounds.width}px - 2px)`,
        top: bounds.top,
        left: 0,
        zIndex: props.layer-1,
      })
    }else if(!isFullScreen){
      setWindow(backupWindow);
    }
  }, [isFullScreen]);
  const moveManager = useDrag((params)=>{
    props.setFocus(props.name);
    if(!isFullScreen) {
      const container = document.getElementById("container");
      const bounds = container.getBoundingClientRect();

      let x = parseFloat(cursorX);
      let y = parseFloat(cursorY);

      if (x <= 0 || x >= bounds.width - 5) {
        setWindow({
          position: window.position,
          height: window.height,
          width: window.width,
          left: window.left,
          top: window.top + params.offset[1] - beforeMoveParams[1],
          zIndex: props.layer - 1,
          filter: "dropShadow(gray 0px 0px 15px)",
        })
      } else if (y <= 0 || y >= bounds.height - 55) {
        setWindow({
          position: window.position,
          height: window.height,
          width: window.width,
          left: window.left + params.offset[0] - beforeMoveParams[0],
          top: window.top,
          filter: "dropShadow(gray 0px 0px 15px)",
          zIndex: props.layer - 1
        })
      } else {
        setWindow({
          position: window.position,
          height: window.height,
          width: window.width,
          top: window.top + params.offset[1] - beforeMoveParams[1],
          left: window.left + params.offset[0] - beforeMoveParams[0],
          filter: "dropShadow(gray 0px 0px 15px)",
          zIndex: props.layer - 1
        })
      }
    }
    setBeforeMoveParams(params.offset);
  })
  const sizeManager = useDrag((params)=>{
    if(isFirst && !isFullScreen) {
      if ((props.mouseBeacon[0] >= window.left + window.width - 10)
        && (props.mouseBeacon[1] >= window.top + window.height - 10))
      {
        setWindow({
          position: window.position,
          height: window.height>=props.appSetup.minHeight?
            window.height + params.offset[1] - beforeSizeParams[1]:
            props.appSetup.minHeight,
          width: window.width>=props.appSetup.minWidth?
            window.width + params.offset[0] - beforeSizeParams[0]:
            props.appSetup.minWidth,
          top: window.top,
          filter: "dropShadow(gray 0px 0px 15px)",
          left: window.left,
          zIndex: props.layer - 1
        })
      } else if ((props.mouseBeacon[0] <= window.left + 10)
        && (props.mouseBeacon[1] >= window.top + window.height - 10))
      {
        setWindow({
          position: window.position,
          height: window.height>=props.appSetup.minHeight?
            window.height + params.offset[1] - beforeSizeParams[1]:
            props.appSetup.minHeight,
          width: window.width>=props.appSetup.minWidth?
            window.width - params.offset[0] + beforeSizeParams[0]:
            props.appSetup.minWidth,
          top: window.top,
          filter: "dropShadow(gray 0px 0px 15px)",
          left: window.width>=props.appSetup.minWidth?
            window.left + params.offset[0] - beforeSizeParams[0]:
            window.left,
          zIndex: props.layer - 1
        })
      } else if (props.mouseBeacon[0] >= window.left + window.width - 10)
      {
        setWindow({
          position: window.position,
          height: window.height,
          width: window.width>=props.appSetup.minWidth?
            window.width + params.offset[0] - beforeSizeParams[0]:
            props.appSetup.minWidth,
          top: window.top,
          left: window.left,
          filter: "dropShadow(gray 0px 0px 15px)",
          zIndex: props.layer - 1
        })
      }else if(props.mouseBeacon[0] <= window.left + 10)
      {
        setWindow({
          position: window.position,
          height: window.height,
          width: window.width>=props.appSetup.minWidth?
            window.width - params.offset[0] + beforeSizeParams[0]:
            props.appSetup.minWidth,
          top: window.top,
          filter: "dropShadow(gray 0px 0px 15px)",
          left: window.width>=props.appSetup.minWidth?
            window.left + params.offset[0] - beforeSizeParams[0]:
            window.left,
          zIndex: props.layer - 1
        })
      } else if (props.mouseBeacon[1] >= window.top + window.height - 10)
      {
        setWindow({
          position: window.position,
          height: window.height>=props.appSetup.minHeight?
            window.height + params.offset[1] - beforeSizeParams[1]:
            props.appSetup.minHeight,
          width: window.width,
          top: window.top,
          filter: "dropShadow(gray 0px 0px 15px)",
          left: window.left,
          zIndex: props.layer - 1
        })
      }
      else{
        setIsFirst(false);
      }
    }
    setBeforeSizeParams(params.offset);
  })

  if(props.type==="App") {
    return (
      <Window style={window} onMouseDown={()=>{
        props.setFocus(props.name)
      }}>
        <WindowHeader {...moveManager()}>
          <HeaderButton onClick={() =>
            props.removeTask(props.removeCompnent)
          }></HeaderButton>
          <HeaderButton onClick={()=>{}}>
          </HeaderButton>
          <HeaderButton onClick={()=>
            setIsFullScreen(!isFullScreen)
          }></HeaderButton>
        </WindowHeader>
        <WindowContent {...sizeManager()} onMouseUp={()=>setIsFirst(true)}>
          {props.children}
        </WindowContent>
      </Window>
    )
  }else if(props.type==="Shell") {
    return (
      <article style={shellProps} className="shell">
        {props.children}
      </article>
    )
  }
}
export default Application;