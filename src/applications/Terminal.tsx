import {useState} from "react";
import {styled} from "styled-components";

const Input = styled.input`
    background-color: none;
    padding: 0;
    margin: 0;
    border: none;
    width: 100%;
    height: 2rem;
    bottom: 5px;
`;
const TerminalContent = styled.div`
    display: flex;
    align-items: flex-end;
    background-color: black;
    height: 100%;
    width: 100%;
`

const Terminal = () =>{
  const [command,setCommand] = useState("");
  return (
    <TerminalContent>
      <Input onKeyDown={(e)=>{
        if(e.key==="Enter") {
          console.log("enter");
          e.target.value = "";
        }
        setCommand(e.target.value);
        }}></Input>
    </TerminalContent>
  )
}
export default Terminal