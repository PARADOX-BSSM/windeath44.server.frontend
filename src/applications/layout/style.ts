import styled from '@emotion/styled';

export const Window = styled.article`
  border: 0.225rem solid #ff8ef6;
  padding: 0.45rem;
  display: flex;
  flex-direction: column;
`;

export const WindowHeader = styled.header`
  background-color: #ffd3fb;
  padding: 0 0.2475rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.755rem;
  border: 0.225rem solid #e774dd;
`;

export const HeaderButton = styled.button`
  height: 1.755rem;
  width: 1.755rem;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MinimizeButton = styled(HeaderButton)<{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => (isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)')};
  border: none;
  cursor: none;
`;

export const FullScreenButton = styled(HeaderButton)<{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => (isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)')};
  border: none;
  cursor: none;
`;

export const ExitButton = styled(HeaderButton)<{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => (isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)')};
  border: none;
  cursor: none;
`;

export const WindowContent = styled.section`
  position: absolute;
  top: 2.9025rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 0.45rem 0.45rem 0.45rem;
  box-sizing: border-box;
  border: solid 0.225rem #e774dd;
`;

export const Shell = styled.article`
  height: 100%;
  width: 100%;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.45rem;
`;

export const Title = styled.p`
  color: #e774dd;
  font-family: DOSIyagiBoldface;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const HeartImg = styled.img`
  padding: 0px 0.27rem;
  width: 1em;
`;
