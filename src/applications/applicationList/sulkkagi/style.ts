import styled from '@emotion/styled';

interface CurrentPlayerProps {
  player: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: linear-gradient(to bottom, #fef3c7, #fde68a);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #92400e;
  margin-bottom: 16px;
`;

export const GameInfo = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  font-weight: 600;
`;

export const CurrentPlayer = styled.span<CurrentPlayerProps>`
  margin-left: 8px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 16px;
  background-color: ${(props) => (props.player === 1 ? '#f3f4f6' : '#1f2937')};
  color: ${(props) => (props.player === 1 ? '#1f2937' : 'white')};
`;

export const WinMessage = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #10b981;
`;

export const StoneCount = styled.div`
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
`;

export const CanvasContainer = styled.div`
  position: relative;
`;

export const GameCanvas = styled.canvas`
  border: 4px solid #92400e;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  cursor: crosshair;
  background-color: #fef08a;
`;

export const AnimatingIndicator = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #3b82f6;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

export const Controls = styled.div`
  margin-top: 16px;
  text-align: center;
`;

export const ResetButton = styled.button`
  padding: 8px 24px;
  background-color: #d97706;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b45309;
  }
`;

export const Instructions = styled.div`
  font-size: 14px;
  color: #4b5563;
  max-width: 400px;
  margin-top: 16px;
  line-height: 1.5;

  strong {
    color: #374151;
    display: block;
    margin-bottom: 8px;
  }

  p {
    margin: 4px 0;
  }
`;
