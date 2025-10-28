import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
`;

const GameFrame = styled.iframe`
  width: 100%;
  max-height: 100%;
  aspect-ratio: 16 / 9;
  border: none;
`;

const RhythmGame = () => {
  // Use R2 URL if configured (for production), fallback to local path (for development)
  const gameUrl = import.meta.env.VITE_UNITY_GAME_URL || '/unity/Project_HG/index.html';

  return (
    <Container>
      <GameFrame
        src={gameUrl}
        title="Rhythm Game"
        allow="autoplay; fullscreen"
      />
    </Container>
  );
};

export default RhythmGame;
