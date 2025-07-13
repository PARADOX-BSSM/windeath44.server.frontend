import styled from '@emotion/styled';
import bgImg from '@/assets/Background.svg';
import '@/assets/font.css';

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
  cursor: none;
  background-color: var(--dark-primary-color);
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Bar = styled.div`
  width: 60%;
  height: 4%;
  margin-top: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-primary-color);
  font-family: 'Galmuri11';
`;
export const Info = styled.div`
  width: fit-content;
  height: fit-content;
`;
export const Title = styled.div`
  width: fit-content;
  height: fit-content;
  font-family: 'Pretendard';
`;
export const Sub = styled.div`
  font-size: 270%;
  font-weight: 400;
  color: var(--light-primary-color);
`;
export const MainTexts = styled.div`
  width: fit-content;
  height: fit-content;
`;
export const Text = styled.div`
  font-size: 600%;
  font-weight: 900;
  letter-spacing: -6px;
  color: #2e2e2e;
`;
