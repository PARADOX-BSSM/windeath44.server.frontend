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
  border-radius: 4px;
  font-size: 16px;
  font-family: Galmuri11;
  background-color: ${(props) => (props.player === 1 ? 'var(--secondary-color, #ffbbf5)' : 'var(--primary-black, #2e2e2e)')};
  color: ${(props) => (props.player === 1 ? 'var(--primary-black, #2e2e2e)' : 'white')};
  border: 1px solid var(--stroke, #e774dd);
`;

export const WinMessage = styled.div`
  font-size: 20px;
  font-weight: 400;
  font-family: Galmuri11;
  color: var(--stroke, #e774dd);
`;

export const StoneCount = styled.div`
  font-size: 14px;
  font-family: Galmuri11;
  color: var(--primary-black, #2e2e2e);
  margin-bottom: 8px;
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
  border: 1px solid var(--primary-black, #2e2e2e);
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
