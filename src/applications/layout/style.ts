import styled from '@emotion/styled';

export const Window = styled.article`
  border: ${3 / 16}rem solid #ff8ef6;
  padding: 0.45rem;
  display: flex;
  flex-direction: column;
`;

export const WindowHeader = styled.header`
  background-color: #ffd3fb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.755rem;
  border: ${3 / 16}rem solid #e774dd;
`;

export const HeaderButton = styled.button`
  height: ${25 / 16}rem;
  width: ${25 / 16}rem;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MinimizeButton = styled(HeaderButton)<{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => (isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)')};
  border: none;
  cursor: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const FullScreenButton = styled(HeaderButton)<{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => (isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)')};
  border: none;
  cursor: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const ExitButton = styled(HeaderButton)<{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => (isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)')};
  border: none;
  cursor: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const WindowContent = styled.section`
  position: absolute;
  top: 2.9025rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 0.45rem 0.45rem 0.45rem;
  box-sizing: border-box;
  border: solid ${3 / 16}rem #e774dd;
`;

export const Shell = styled.article`
  height: 100%;
  width: 100%;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${6 / 16}rem;
  padding: ${6 / 16}rem;
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
  font-size: ${24 / 16}rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const HeartImg = styled.img`
  padding: 0px 0.27rem;
  width: ${24 / 16}rem;
`;
