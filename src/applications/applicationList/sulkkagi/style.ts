import styled from '@emotion/styled';

interface CurrentPlayerProps {
  player: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: var(--very-light-primary-color, #ffeefd);
  height: 100%;
  box-sizing: border-box;
  font-family: Galmuri11;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 400;
  color: var(--primary-black, #2e2e2e);
  margin-bottom: 16px;
  font-family: Galmuri11;
`;

export const GameInfo = styled.div`
  background-color: var(--light-primary-color, #ffd1fb);
  border: 1px solid var(--stroke, #e774dd);
  box-shadow:
    -1px -1px 0px 0px var(--primary-black) inset,
    1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px var(--dark-primary-color) inset,
    2px 2px 0px 0px var(--secondary-color) inset;
  padding: 16px;
  margin-bottom: 16px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TurnInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 400;
  font-family: Galmuri11;
  color: var(--primary-black, #2e2e2e);
`;

export const CurrentPlayer = styled.span<CurrentPlayerProps>`
  margin-left: 8px;
  padding: 4px 12px;
  font-size: 16px;
  font-family: Galmuri11;
  background-color: ${(props) =>
    props.player === 1 ? 'var(--secondary-color, #ffbbf5)' : 'var(--primary-black, #2e2e2e)'};
  color: ${(props) => (props.player === 1 ? 'var(--primary-black, #2e2e2e)' : 'white')};
  border: 2px solid var(--stroke, #e774dd);
  box-shadow:
    -1px -1px 0px 0px var(--primary-black) inset,
    1px 1px 0px 0px #fff inset;
`;

export const WinMessage = styled.div`
  font-size: 20px;
  font-weight: 400;
  font-family: Galmuri11;
  color: var(--stroke, #e774dd);
`;

export const StoneCountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

export const PlayerStoneCount = styled.div<CurrentPlayerProps>`
  font-size: 16px;
  font-family: Galmuri11;
  font-weight: 400;
  color: ${(props) => (props.player === 1 ? 'var(--primary-black, #2e2e2e)' : 'white')};
  background-color: ${(props) =>
    props.player === 1 ? 'var(--secondary-color, #ffbbf5)' : 'var(--primary-black, #2e2e2e)'};
  padding: 8px 16px;
  border: 2px solid var(--stroke, #e774dd);
  box-shadow:
    -1px -1px 0px 0px var(--primary-black) inset,
    1px 1px 0px 0px #fff inset;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StoneIcon = styled.div<CurrentPlayerProps>`
  width: 16px;
  height: 16px;
  background-color: ${(props) => (props.player === 1 ? 'white' : 'black')};
  border: 2px solid ${(props) => (props.player === 1 ? 'var(--primary-black, #2e2e2e)' : 'white')};
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`;

export const CanvasContainer = styled.div`
  position: relative;
`;

export const GameCanvas = styled.canvas`
  border: 4px solid var(--stroke, #e774dd);
  box-shadow:
    -2px -2px 0px 0px var(--primary-black) inset,
    2px 2px 0px 0px #fff inset,
    -4px -4px 0px 0px var(--dark-primary-color) inset,
    4px 4px 0px 0px var(--secondary-color) inset;
  cursor: crosshair;
  background-color: var(--light-primary-color, #ffd1fb);
`;

export const AnimatingIndicator = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: var(--stroke, #e774dd);
  color: white;
  padding: 4px 8px;
  font-family: Galmuri11;
  font-size: 12px;
  border: 2px solid var(--primary-black, #2e2e2e);
  box-shadow:
    -1px -1px 0px 0px var(--primary-black) inset,
    1px 1px 0px 0px #fff inset;
`;

export const Controls = styled.div`
  margin-top: 16px;
  text-align: center;
`;

export const ResetButton = styled.button`
  display: flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  background: var(--light-primary-color, #ffd1fb);
  box-shadow:
    -1px -1px 0px 0px var(--primary-black) inset,
    1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px var(--dark-primary-color) inset,
    2px 2px 0px 0px var(--secondary-color) inset;
  border: none;
  cursor: pointer;
  color: var(--primary-black, #2e2e2e);
  font-family: Galmuri11;
  font-size: 16px;
  font-weight: 400;

  &:hover {
    background: var(--secondary-color, #ffbbf5);
  }
`;

export const GameArea = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;

export const NotificationArea = styled.div`
  width: 280px;
  height: 408px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  padding: 16px;
  box-sizing: border-box;
  background: var(--very-light-primary-color, #ffeefd);
  border: 3px solid var(--stroke, #e774dd);
  box-shadow:
    -2px -2px 0px 0px var(--primary-black) inset,
    2px 2px 0px 0px #fff inset,
    -3px -3px 0px 0px var(--dark-primary-color) inset,
    3px 3px 0px 0px var(--secondary-color) inset;
`;

export const NotificationTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  font-family: Galmuri11;
  color: var(--primary-black, #2e2e2e);
  margin-bottom: 8px;
  text-align: center;
  border-bottom: 1px solid var(--stroke, #e774dd);
  padding-bottom: 8px;
`;

export const NotificationItem = styled.div<{ player: number; isNew?: boolean }>`
  padding: 12px;
  font-family: Galmuri11;
  font-size: 13px;
  font-weight: 400;
  background: ${(props) =>
    props.player === 1 ? 'var(--secondary-color, #ffbbf5)' : 'var(--primary-black, #2e2e2e)'};
  color: ${(props) => (props.player === 1 ? 'var(--primary-black, #2e2e2e)' : 'white')};
  border: 2px solid var(--stroke, #e774dd);
  box-shadow:
    -1px -1px 0px 0px var(--primary-black) inset,
    1px 1px 0px 0px #fff inset;
  animation: ${(props) => (props.isNew ? 'slideIn 0.3s ease-out, pulse 2s ease-in-out' : 'none')};
  transform: ${(props) => (props.isNew ? 'scale(1.02)' : 'scale(1)')};
  transition: transform 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 8px;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1.02);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgba(231, 116, 221, 0);
    }
    50% {
      box-shadow: 0 0 0 4px rgba(231, 116, 221, 0.3);
    }
  }
`;

export const NotificationIcon = styled.div<{ player: number }>`
  width: 12px;
  height: 12px;
  background-color: ${(props) => (props.player === 1 ? 'white' : 'black')};
  border: 2px solid ${(props) => (props.player === 1 ? 'var(--primary-black, #2e2e2e)' : 'white')};
  flex-shrink: 0;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`;
