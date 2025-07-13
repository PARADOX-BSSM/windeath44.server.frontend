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
  margin-top: 5vmin;
  position: relative;
  background-color: var(--light-primary-color);
  font-family: 'Galmuri11';
  overflow: hidden;
`;
export const Fill = styled.div`
  height: 100%;
  background-color: var(--primary-color);
  width: 0;
  transition: width 0.04s;
`;
export const Gauge = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: black;
  font-size: 2.5vmin;
`;

export const Info = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Image = styled.img`
  width: 70%;
  height: 70%;
  margin-bottom: -7%;
`;
export const Title = styled.div`
  width: fit-content;
  height: fit-content;
  margin-left: -20%;
  font-family: 'Pretendard';
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const Sub = styled.div`
  margin-bottom: -5%;
  font-size: clamp(7vmin, 7vmin, 7vmin);
  font-weight: 400;
  letter-spacing: -0.3vmin;
  color: var(--light-primary-color);
`;
export const MainTexts = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 10%;
  display: flex;
  justify-content: center;
`;
export const Text = styled.div`
  font-size: clamp(15vmin, 15vmin, 15vmin);
  letter-spacing: -1vmin;
  font-weight: 900;
  color: #2e2e2e;
`;
export const Number = styled.div`
  font-size: clamp(15vmin, 15vmin, 15vmin);
  letter-spacing: -1vmin;
  font-weight: 400;
  color: var(--light-primary-color);
`;
