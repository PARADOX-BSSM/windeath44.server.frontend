import styled from '@emotion/styled';
import bgImg from '@/assets/Background.svg';
export const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
`;
export const BackgroundDiv = styled.div<{ width: number }>`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: ${({ width }) => `${width}px`};
  z-index: 9999;
  background-image: url('${bgImg}');
  background-size: cover;
`;
export const Main = styled.main`
  height: 100vh;
  aspect-ratio: 4/3;
  inset: 0;
  margin: 0 auto;
  background-color: var(--dark-primary-color);
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const CationImage = styled.img`
  //width: 100%;
  height: 100%;
`;
