import styled from "styled-components";
import {Apps} from '@/manager/importManager.tsx';
import {TaskType} from "@/modules/typeModule.tsx";

const Container = styled.section`
    position: absolute;
    left:0;
    bottom:50px;
    height: 500px;
    width: 300px;
    z-index: 998;
    background-color: aquamarine;
`;
const Logo = styled.section`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    top: 0;
    background-color:aqua;
`;
const SnapshotList = styled.ul`
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-direction: column;
    display: flex;
    left: 50px;
    bottom: 0;
    top:0;
    right:0;
`;
const Snapshot = styled.li`
    list-style: none;
    padding-bottom: 5px;
    width: 100%;
    & > button {
        width: 100%;
    }
`
const Observer = (props) => {
  return (
    <Container>
      <Logo>
        
      </Logo>
      <SnapshotList>
        {Apps.map((Application:TaskType)=>{
          return(
            <Snapshot key={Application.id}>
              <button onClick={() => {
                props.addTask(Application);
              }}>{Application.name}</button>
            </Snapshot>
          )
        })}
      </SnapshotList>
    </Container>
  )
}
export default Observer;