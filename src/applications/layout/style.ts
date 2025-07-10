import styled from "@emotion/styled";

export const Window = styled.article`
    border: 2.5px solid #FF8EF6;
    padding : 0.4rem;
    display : flex;
    flex-direction: column;
`
export const WindowHeader = styled.header`
    background-color: #FFD3FB;
    padding : 0 0.2rem;
    display : flex;
    justify-content: space-between;
    align-items: center;
    height : 24px;
    border: 2.5px solid #E774DD;
`;
export const HeaderButton = styled.button`
    height : 20px;
    width : 20px;
    margin-left: 5px;
  padding : 0;
  //margin : 0;
`;
export const MinimizeButton = styled(HeaderButton) <{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)'};
  border: none;
  cursor:none;
`;
export const FullScreenButton = styled(HeaderButton) <{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)'};
  border: none;
  cursor:none;
`;
export const ExitButton = styled(HeaderButton) <{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)'};
    border: none;
    cursor:none;
`;
export const WindowContent = styled.section`
    position : absolute;
    top : 40px;
    left : 0;
    right : 0;
    bottom : 0;
    margin : 0 0.4rem 0.4rem 0.4rem;
    box-sizing: border-box;
    border : solid 2.5px #E774DD;
`;
export const Shell = styled.article`
    height : 100%;
    width : 100%;
    z-index: 9999;
`;

export const BtnContainer = styled.div`
    display : flex;
    justify-content: flex-start;
    align-items: center;
`

export const TitleContainer = styled.div`
    display : flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.4em;
`

export const Title = styled.p`
  color: #E774DD;
  font-family: DOSIyagiBoldface;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

export const HeartImg = styled.img`
  width:1.25em;
`
