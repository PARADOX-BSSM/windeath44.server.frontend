import styled from '@emotion/styled';

export const TTaskBar = styled.footer`
  position: absolute;
  bottom: 0;
  width: inherit;
  height: ${48 / 16}rem;
  z-index: 998;
  background-color: var(--light-primary-color);
  border-bottom: 0.063rem black solid;
  border-top: 0.063rem black solid;
  display: flex;
  padding: 0.25rem 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
`;

export const TaskList = styled.ul`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  list-style: none;
  display: flex;
  gap: 0.375rem;
  align-content: center;
  box-sizing: border-box;
  max-width: 100%;
`;

export const TaskItem = styled.div`
  display: flex;
  width: 11.25rem;
  padding: 0.25rem 0.375rem;
  align-items: center;
  gap: 0.375rem;
  height: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
`;

export const VirtualDesktopItem = styled(TaskItem)`
  width: 2.5rem;
  justify-content: center;
`;

export const ImgContainer = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const TaskName = styled.p`
  color: var(--primary-black);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Galmuri11;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  height: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const taskButtonStyle = {
  height: '100%',
  backgroundColor: 'var(--light-primary-color)',
  boxShadow:
    '-0.0625rem -0.0625rem 0px 0px var(--secondary-color) inset, ' +
    '0.0625rem  0.0625rem 0px 0px #FFF inset, ' +
    '-0.125rem -0.125rem 0px 0px #DCAFDD inset',
};
export const taskSelectButtonStyle = {
  height: '100%',
  boxShadow:
    '-0.0625rem -0.0625rem 0px 0px #FFF inset, 1.5px 1.5px 0px 0px var(--primary-black) inset, ' +
    '-0.125rem -0.125rem 0px 0px var(--secondary-color) inset, ' +
    '0.125rem 0.125rem 0px 0px var(--dark-primary-color) inset',
};

export const Observer = styled.div<{ selected?: boolean }>`
  display: flex;
  width: fit-content;
  padding: 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  box-shadow: ${({ selected }) =>
    !selected
      ? '-0.0625rem -0.0625rem 0px 0px var(--secondary-color) inset, ' +
      '0.0625rem  0.0625rem 0px 0px #FFF inset, ' +
      '-0.125rem -0.125rem 0px 0px #DCAFDD inset'
      : '-0.0625rem -0.0625rem 0px 0px #FFF inset, 1.5px 1.5px 0px 0px var(--primary-black) inset, ' +
      '-0.125rem -0.125rem 0px 0px var(--secondary-color) inset, ' +
      '0.125rem 0.125rem 0px 0px var(--dark-primary-color) inset'};
`;

export const StartImg = styled.img`
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const AlarmCenterContainer = styled.div`
  height: 100%;
  margin-left: auto;
  box-shadow:
    -0.0625rem -0.0625rem 0px 0px #FFF inset, 1.5px 1.5px 0px 0px var(--primary-black) inset,
    -0.125rem -0.125rem 0px 0px var(--secondary-color) inset,
    0.125rem 0.125rem 0px 0px var(--dark-primary-color) inset;
  display: flex;
  align-items: center;
`;

export const BackgroundAppsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  margin-left: auto;
  border-left: 1px solid var(--primary-black);
  height: 80%;
`;

export const BackgroundAppItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  
  &:hover {
    background-color: var(--secondary-color);
    border-radius: 4px;
  }
`;

export const NotificationBubble = styled.div<{ index: number; total: number }>`
  position: absolute;
  bottom: 42px;
  left: 50%;
  transform: translateX(calc(-50% - ${({ index, total }) => (total - 1 - index) * 20}px));
  background: var(--light-primary-color);
  border: 1.5px solid var(--primary-black);
  padding: 10px 14px;
  border-radius: 8px;
  min-width: 160px;
  max-width: 300px;
  z-index: ${({ index }) => 1000 + index};
  pointer-events: auto;
  white-space: pre-wrap;
  font-family: Galmuri11;
  font-size: 16px;
  color: var(--primary-black);
  text-align: left;

  /* 꼬리 테두리 (Newest only) */
  ${({ index, total }) => index === total - 1 && `
    &::before {
      content: '';
      position: absolute;
      bottom: -11px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 11px solid transparent;
      border-right: 11px solid transparent;
      border-top: 10px solid var(--primary-black);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid var(--light-primary-color);
    }
  `}
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: transparent;
  border: none;
  font-family: Galmuri11;
  font-size: 10px;
  cursor: pointer;
  color: var(--primary-black);
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: red;
  }
`;