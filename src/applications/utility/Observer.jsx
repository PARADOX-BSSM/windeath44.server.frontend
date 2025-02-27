import styled from "styled-components";
import {useEffect, useState} from "react";
import {Apps} from '/src/manager/importManager.jsx';

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
const Snapshot = styled.ul`
    position: absolute;
    left: 50;
    bottom: 0;
    top:0;
    right:0;
`;
const Observer = (props) => {
  return (
    <Container>
      <Logo>

      </Logo>
      <Snapshot>
        {Apps.map((Application)=>{
          return(
            <li key={Application.id}>
              <button onClick={() => {
                props.addTask(Application);
              }}>{Application.name}</button>
            </li>
          )
        })}
      </Snapshot>
    </Container>
  )
}
export default Observer;