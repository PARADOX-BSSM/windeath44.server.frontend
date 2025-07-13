import { getPixelFromPercent } from '@/lib/getPixelFromPercent';
import styled from '@emotion/styled';

export const Window = styled.article`
  border: ${getPixelFromPercent('width', 0.25)}px solid #ff8ef6;
  padding: ${getPixelFromPercent('width', 0.5)}px;
  display: flex;
  flex-direction: column;
`;
export const WindowHeader = styled.header`
  background-color: #ffd3fb;
  padding: 0 ${getPixelFromPercent('width', 0.275)}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${getPixelFromPercent('height', 2.6)}px;
  border: ${getPixelFromPercent('width', 0.25)}px solid #e774dd;
`;
export const HeaderButton = styled.button`
  height: ${getPixelFromPercent('height', 2.6)}px;
  width: ${getPixelFromPercent('width', 2.6)}px;
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
  top: ${getPixelFromPercent('height', 4.3)}px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 ${getPixelFromPercent('width', 0.5)}px ${getPixelFromPercent('width', 0.5)}px
    ${getPixelFromPercent('width', 0.5)}px;
  box-sizing: border-box;
  border: solid ${getPixelFromPercent('width', 0.25)}px #e774dd;
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
  gap: ${getPixelFromPercent('width', 0.5)}px;
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
  padding: 0px ${getPixelFromPercent('width', 0.3)}px;
  width: 1em;
`;
