import styled from "styled-components";
import {useEffect, useState} from "react";

const Container = styled.section`
    position: absolute;
    left:0;
    bottom:50px;
    height: 500px;
    width: 300px;
    z-index: 998;
    background-color: aquamarine;
`
const Snapshot = styled.section`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    top: 0;
    background-color:aqua;
`
const Observer = (props) => {
  return (
    <Container>
      <Snapshot>

      </Snapshot>
    </Container>
  )
}
export default Observer;