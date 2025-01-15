import {useState} from "react";
const Terminal = () =>{
  const terminalStyles = {
    backgroundColor: "black",
    height: "100%",
    width: "100%"
  }
  const inputStyles = {
    backgroundColor: "none",
    width : "100%",

  }
  const [command,setCommand] = useState("");
  return (
    <div style={terminalStyles}>
      <input style={inputStyles} onKeyDown={(e)=>{
        if(e.key==="Enter"){
          console.log("enter")
        }}}></input>
    </div>
  )
}
export default Terminal