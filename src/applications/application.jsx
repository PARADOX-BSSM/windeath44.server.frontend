import {useEffect, useState} from 'react';
import {useDrag} from 'react-use-gesture';
const Application = (props) => {
  const windowProps = {
    position : "fixed",
    height : 400,
    width : 300,
    top : 0,
    left : 0,
    backgroundColor : "black",
    zIndex: props.layer
  }
  const windowHeaderProps = {
    position : "absolute",
    top : 0,
    left : 0,
    right : 0,
    height : 30
  }
  const windowContentProps = {
    position : "absolute",
    top : 30,
    left : 0,
    right : 0,
    bottom : 0,
  }
  const shellProps = {
    position : "fixed",
    top : 0,
    left : 0,
    right : 0,
    bottom : "3.125rem",
    zIndex : 0
  }
  const [window, setWindow] = useState(windowProps);
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
  const move = useDrag((params)=>{
    props.setFocus(props.name);
    setWindow({
      position: "fixed",
      height: 400,
      width: 300,
      top: params.offset[1],
      left: params.offset[0],
      zIndex: props.layer-1
    })
  })
  if(props.type==="App") {
    return (
      <article className="window" style={window} onMouseDown={()=>{
        props.setFocus(props.name)
      }}>
        <header className="window-header" {...move()} style={windowHeaderProps}>
        </header>
        <section className="window-content" style={windowContentProps}>
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