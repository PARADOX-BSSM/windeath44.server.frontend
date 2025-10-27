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
  return (
    <Container>
      <GameFrame
        src="/unity/Project_HG/index.html"
        title="Rhythm Game"
        allow="autoplay; fullscreen"
      />
    </Container>
  );
};

export default RhythmGame;
