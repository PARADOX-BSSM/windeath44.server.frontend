import {useState} from 'react';
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
    bottom : 0,
    zIndex : 0
  }
  const [window, setWindow] = useState(windowProps);
  const move = useDrag((params)=>{
    setWindow({
      position: "fixed",
      height: 400,
      width: 300,
      top: params.offset[1],
      left: params.offset[0],
      zIndex: props.layer
    })
  })
  if(props.type==="App") {
    return (
      <article className="window" style={window} onMouseDown={()=>{
        props.setLayer(props.layer + 1);
        setWindow({
          position: "fixed",
          height: 400,
          width: 300,
          top: window.top,
          left: window.left,
          zIndex: props.layer
        })
      }}>
        <header className="window-header" {...move()} style={windowHeaderProps}>
        </header>
        <section className="window-content" style={windowContentProps}>
          <h1>{props.children}</h1>
        </section>
      </article>
    )
  }else if(props.type==="Shell") {
    return (
      <article style={shellProps}>
        {props.children}
      </article>
    )
  }
}
export default Application;