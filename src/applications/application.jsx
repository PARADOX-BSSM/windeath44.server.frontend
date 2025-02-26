import {useEffect, useState} from 'react';
import {useDrag} from 'react-use-gesture';

const Application = (props) => {
  const windowProps = {
    position : "fixed",
    height : 400,
    width : 300,
    top : (20 * globalThis.innerHeight) / 100,
    left : (30 * globalThis.innerWidth) / 100,
    backgroundColor : "black",
    zIndex: props.layer
  }
  const windowHeaderProps = {
    position : "absolute",
    display : "flex",
    alignItems: "center",
    top : 0,
    left : 0,
    right : 0,
    height : 30
  }
  const headerButtonProps = {
    height : 20,
    width : 20,
    marginLeft: 5,
  }
  const windowContentProps = {
    position : "absolute",
    top : 30,
    left : 0,
    right : 0,
    bottom : 0,
    paddingTop : 0,
    paddingRight : 5,
    paddingBottom: 5,
    paddingLeft: 5,
  }
  const shellProps = {
    position : "fixed",
    top : 0,
    right : 0,
    bottom : "3.125rem",
    zIndex : 0
  }
  const [window, setWindow] = useState(windowProps);
  const [cursorX, setCursorX] = useState(props.cursorLeft);
  const [cursorY, setCursorY] = useState(props.cursorTop);
  const [windowX, setWindowX] = useState(0);
  const [windowY, setWindowY] = useState(0);
  const [beforeParams, setBeforeParams] = useState([0,0]);
  const [isFirst, setIsFirst] = useState(true);
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
        position: "fixed",
        height: 400,
        width: 300,
        top: window.top,
        left: window.left,
        zIndex: props.layer
      })
    }
  },[props.focus])

  const moveWindow = useDrag((params)=>{
    props.setFocus(props.name);

    const container = document.getElementById("container");
    const bounds = container.getBoundingClientRect();

    let x = parseFloat(cursorX);
    let y = parseFloat(cursorY);

    if(x <= 0 || x >= bounds.right - bounds.left) {
      setWindow({
        position: "fixed",
        height: 400,
        width: 300,
        left: windowX,
        top: params.offset[1] + (20 * globalThis.innerHeight) / 100,
        zIndex: props.layer-1
      })
    }
    else if(y <= 0 || y >= bounds.bottom - bounds.top) {
      setWindow({
        position: "fixed",
        height: window.height,
        width: window.width,
        left: params.offset[0] + (30 * globalThis.innerWidth) / 100,
        top: windowY,
        zIndex: props.layer-1
      })
    }
    else {
      setWindow({
        position: "fixed",
        height: window.height,
        width: window.width,
        top: params.offset[1] + (20 * globalThis.innerHeight) / 100,
        left: params.offset[0] + (30 * globalThis.innerWidth) / 100,
        zIndex: props.layer-1
      })
    }
    setWindowX(window.left);
    setWindowY(window.top);
  })
  const dragWindow = useDrag((params)=>{
    if(isFirst) {
      if ((props.mouseBeacon[0] >= window.left + window.width - 10) && (props.mouseBeacon[1] >= window.top + window.height - 10)) {
        setWindow({
          position: "fixed",
          height: window.height + params.offset[1] - beforeParams[1],
          width: window.width + params.offset[0] - beforeParams[0],
          top: window.top,
          left: window.left,
          zIndex: props.layer - 1
        })
      } else if (props.mouseBeacon[0] >= window.left + window.width - 10) {
        setWindow({
          position: "fixed",
          height: window.height,
          width: window.width + params.offset[0] - beforeParams[0],
          top: window.top,
          left: window.left,
          zIndex: props.layer - 1
        })
      } else if (props.mouseBeacon[1] >= window.top + window.height - 10) {
        setWindow({
          position: "fixed",
          height: window.height + params.offset[1] - beforeParams[1],
          width: window.width,
          top: window.top,
          left: window.left,
          zIndex: props.layer - 1
        })
      }else{
        setIsFirst(false);
      }
    }
    setBeforeParams(params.offset);
  })

  if(props.type==="App") {
    return (
      <article id="window" style={window} onMouseDown={()=>{
        props.setFocus(props.name)
      }}>
        <header className="window-header" {...moveWindow()} style={windowHeaderProps}>
          <button style={headerButtonProps} onClick={() =>
            props.removeTask(props.removeCompnent)
          }></button>
          <button style={headerButtonProps}></button>
          <button style={headerButtonProps}></button>
        </header>
        <section className="window-content" {...dragWindow()} style={windowContentProps} onMouseUp={()=>setIsFirst(true)}>
          {props.children}
        </section>
      </article>
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