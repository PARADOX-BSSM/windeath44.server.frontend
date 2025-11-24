import styled from '@emotion/styled';

export const BubbleContainer = styled.div<{ x: number; y: number }>`
  position: fixed;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  transform: translate(-50%, -100%);
  display: flex;
  flex-direction: column;
  align-items: start;
  background: var(--very-light-primary-color);
  border: 2px solid var(--primary-black);
  padding: 12px 12px;
  gap: 12px;
  border-radius: 8px;
  min-width: 150px;
  z-index: 1000;
  pointer-events: auto;

  /* 꼬리 테두리 */
  &::before {
    content: '';
    position: absolute;
    bottom: -11px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-top: 11px solid var(--primary-black);
  }

  /* 꼬리 내부 */
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid var(--very-light-primary-color);
  }
`;

export const BubbleText = styled.p`
  font-family: Galmuri11;
  font-size: 16px;
  color: #333;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
  padding-top: 8px;
  border-top: 1px solid var(--primary-black);
`;

export const ClippyButton = styled.button`
  padding: 4px 12px;
  background: #ffffcc;
  border: 1px solid #000;
  border-radius: 0;
  font-family: Galmuri11;
  font-size: 12px;
  color: #000;
  cursor: pointer;
  box-shadow: 1px 1px 0 #808080;

  &:hover {
    background: #ffff99;
  }

  &:active {
    box-shadow: none;
    transform: translate(1px, 1px);
  }
`;
