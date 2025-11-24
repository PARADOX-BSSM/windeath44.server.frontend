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
  color: var(--primary-black);
  text-align: left;
  white-space: pre-line;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid var(--primary-black);
`;

export const ClippyButtonWrapper = styled.span`
  position: relative;
  display: inline-block;

  /* 모서리 픽셀 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      linear-gradient(#000, #000) 1px 1px / 1px 1px no-repeat,
      linear-gradient(#000, #000) calc(100% - 1px) 1px / 1px 1px no-repeat,
      linear-gradient(#000, #000) 1px calc(100% - 1px) / 1px 1px no-repeat,
      linear-gradient(#000, #000) calc(100% - 1px) calc(100% - 1px) / 1px 1px no-repeat;
    pointer-events: none;
    z-index: 1;
  }
`;

export const ClippyButton = styled.button`
  padding: 4px 12px;
  background: var(--very-light-primary-color);
  border: 1px solid #000;
  border-radius: 0;
  font-family: Galmuri11;
  font-size: 12px;
  color: #000;
  cursor: pointer;
  clip-path: polygon(
    0 2px,
    2px 2px,
    2px 0,
    calc(100% - 2px) 0,
    calc(100% - 2px) 2px,
    100% 2px,
    100% calc(100% - 2px),
    calc(100% - 2px) calc(100% - 2px),
    calc(100% - 2px) 100%,
    2px 100%,
    2px calc(100% - 2px),
    0 calc(100% - 2px)
  );

  &:hover {
    background: var(--light-primary-color);
  }
`;
