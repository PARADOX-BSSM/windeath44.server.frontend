import styled from "styled-components";

export const Window = styled.article`
    border: 2.5px solid #FF8EF6;
    padding : 0.5rem;
    display : flex;
    flex-direction: column;
`
export const WindowHeader = styled.header`
    background-color: #FFD3FB;
    padding : 0 0.5rem;
    display : flex;
    justify-content: flex-end;
    align-items: center;
    height : 30px;
    border: 2.5px solid #E774DD;
`;
export const HeaderButton = styled.button`
    height : 20px;
    width : 20px;
    margin-left: 5px;
  padding : 0;
  //margin : 0;
`;
export const MinimizeButton = styled(HeaderButton)`
  background-color: rgba(0, 0, 0, 0);
  border: none;
`;
export const FullScreenButton = styled(HeaderButton)`
  background-color: rgba(0, 0, 0, 0);
    border: none;
`;
export const ExitButton = styled(HeaderButton)`
  background-color: rgba(0, 0, 0, 0);
    border: none;
`;
export const WindowContent = styled.section`
    position : absolute;
    top : 40px;
    left : 0;
    right : 0;
    bottom : 0;
    margin : 0.5rem;
    box-sizing: border-box;
    border : solid 2.5px #E774DD;
`;
export const Shell = styled.article`
    height : 100%;
    width : 100%;
`;

