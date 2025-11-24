import styled from '@emotion/styled';

export const AppContainer = styled.div<{ isSelected?: boolean }>`
  width: 5.5rem;
  height: 6.5rem;
  padding-top: .5rem;
  background-color: ${({ isSelected }) => (isSelected ? '#FFD3FB70' : 'transparent')};
  box-shadow: ${({ isSelected }) => (isSelected ? '0 0 0 2px #FFD3FB' : 'none')};
  box-sizing: border-box;
`;

export const AppBtn = styled.div<{ url?: string }>`
  height: ${64 / 16}rem;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  background-image: url('${({ url }) => url}');
  background-position: center;
  background-repeat: no-repeat;
`;

export const AppName = styled.p`
  margin: 0.675rem auto;
  color: var(--primary-black);
  text-align: center;
  font-family: Galmuri11;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const SelectionBox = styled.div<{
  left: number;
  top: number;
  width: number;
  height: number;
}>`
  position: fixed;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: rgba(255, 142, 246, 0.3);
  border: 1px solid rgba(231, 116, 221, 0.8);
  pointer-events: none;
  z-index: 0;
`;
