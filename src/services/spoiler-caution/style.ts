import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
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
  align-items: flex-start;
  justify-content: center;
  position: relative;
`;
export const CationImage = styled.img`
  height: 100%;
`;
const blink = keyframes`
  0% { opacity: 1; } 
  75% { opacity: 1; }
  76% { opacity: 0; } 
  100% { opacity: 0; }
`;
export const ClickText = styled.div`
  padding: 0 0 12% 20%;
  font-family: Galmuri11;
  font-size: 4.5vmin;
  color: #fff;
  position: absolute;
  bottom: 0;
  text-decoration: underline;
  animation: ${blink} 2s steps(1, end) infinite;
`;
