import styled from '@emotion/styled';
import type { StyleContainerProps } from '@/modules/typeModule';

// Window container
export const Window = styled.article`
  border: ${3 / 16}rem solid #ff8ef6;
  padding: 0.45rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

// Shell container (for non-App type)
export const Shell = styled.article`
  height: 100%;
  width: 100%;
`;

// Header container (draggable area)
export const HeaderContainer = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2rem;
  background-color: #ffd3fb;
  border: ${3 / 16}rem solid #e774dd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  cursor: move;
`;

// Header content containers
export const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.45rem;
  pointer-events: none;
`;

export const HeartImg = styled.img`
  padding: 0px 0.27rem;
  width: ${24 / 16}rem;
`;

export const Title = styled.p`
  color: #e774dd;
  font-family: DosStory;
  font-size: ${24 / 16}rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 0;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${6 / 16}rem;
  padding: ${6 / 16}rem;
  pointer-events: auto;
`;

// Header buttons
const HeaderButton = styled.button`
  height: ${25 / 16}rem;
  width: ${25 / 16}rem;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const MinimizeButton = styled(HeaderButton)<{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => (isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)')};
`;

export const FullScreenButton = styled(HeaderButton)<{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => (isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)')};
`;

export const ExitButton = styled(HeaderButton)<{ isFocus: boolean }>`
  background-color: ${({ isFocus }) => (isFocus ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)')};
`;

// Resize handle containers
export const SideContainer = styled.button`
  position: absolute;
  top: 0;
  bottom: 0.5rem;
  width: 0.5rem;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  &:hover {
    cursor: col-resize;
  }
`;

const CornerContainer = styled.button`
  position: absolute;
  bottom: 0;
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
`;

export const LeftCornerContainer = styled(CornerContainer)`
  &:hover {
    cursor: nesw-resize;
  }
`;

export const RightCornerContainer = styled(CornerContainer)`
  &:hover {
    cursor: nwse-resize;
  }
`;

export const BottomContainer = styled.button`
  position: absolute;
  bottom: 0;
  left: 0.5rem;
  right: 0.5rem;
  height: 0.5rem;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  &:hover {
    cursor: row-resize;
  }
`;

// Body and content containers
export const BodyContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'windowType',
})<StyleContainerProps>`
  position: absolute;
  top: ${({ windowType }) => (windowType !== 'frameless' ? '2rem' : 0)};
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ContentContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'windowType',
})<StyleContainerProps>`
  position: absolute;
  top: 0;
  left: ${({ windowType }) => (windowType !== 'frameless' ? '.5rem' : 0)};
  right: ${({ windowType }) => (windowType !== 'frameless' ? '.5rem' : 0)};
  bottom: ${({ windowType }) => (windowType !== 'frameless' ? '.5rem' : 0)};
  border: solid ${3 / 16}rem #e774dd;
  box-sizing: border-box;
`;
