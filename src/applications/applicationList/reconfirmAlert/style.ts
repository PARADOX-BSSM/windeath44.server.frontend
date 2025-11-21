import styled from '@emotion/styled';

export const overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
`;

export const main = styled.div`
  box-sizing: border-box;
  background-color: var(--light-primary-color);
  font-family: 'Galmuri11';
  font-size: 1rem;
  width: 100%;
  height: 100%;
  padding: 24px 32px;
  position: relative;
  z-index: 1001;
`;

export const container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

export const place = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  gap: 36px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;

export const icon = styled.img`
  width: 64px;
  height: 64px;
`;
export const btnContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  gap: 24px;
`;
export const inputSet = styled.p`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  margin-bottom: 1rem;
`;
export const text = styled.p`
  color: #2e2e2e;
  font-size: 1.2rem;
  word-wrap: break-word;
`;
export const alert = styled.p`
  color: #2e2e2e;
  font-size: 0.8rem;
  word-wrap: break-word;
  position: absolute;
  bottom: 0;
`;
