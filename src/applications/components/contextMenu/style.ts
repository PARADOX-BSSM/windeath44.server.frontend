import styled from '@emotion/styled';

export const MenuContainer = styled.div<{ x: number; y: number }>`
  position: fixed;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  background: var(--background);
  border: 1px solid;
  border-color: #ffffff var(--dark-primary-color) var(--dark-primary-color) #ffffff;
  box-shadow: 1px 1px 0 var(--primary-black);
  padding: 2px;
  min-width: 180px;
  z-index: 9989;
  font-family: Galmuri11;
  font-size: 12px;
  cursor: none;
`;

export const MenuItem = styled.div`
  padding: 4px 20px;
  color: #000;
  cursor: none;
  user-select: none;
  white-space: nowrap;

  &:hover {
    background: var(--stroke);
    color: #ffffff;
  }

  &:active {
    background: var(--chatbot-author);
  }
`;

export const MenuSeparator = styled.div`
  height: 1px;
  background: var(--dark-primary-color);
  margin: 2px 1px;
  border-bottom: 1px solid #ffffff;
`;
