import styled from '@emotion/styled';

export const main = styled.div`
  box-sizing: border-box;
  background-color: var(--light-primary-color);
  font-family: 'Galmuri11';
  font-size: 1rem;
  width: 100%;
  height: 100%;
  padding: 2rem 1.5rem;
  position: relative;
`;

export const container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

export const place = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  gap: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;

export const icon = styled.img`
  width: 4rem;
  height: 4rem;
`;

export const text = styled.p`
  color: #2e2e2e;
  font-size: 0.9rem;
  word-wrap: break-word;
`;

export const btnContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;
