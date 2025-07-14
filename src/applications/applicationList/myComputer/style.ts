import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--light-primary-color);
  justify-content: flex-start;
  padding: 1.4rem 1.5rem;
  box-sizing: border-box;
`;

export const Btn = styled.div`
  display: flex;
  flex: 1 0 0;
  padding: 0.5rem 1.5rem;
  justify-content: center;
  align-items: center;
  background: var(--light-primary-color);
  box-shadow:
    -0.094rem -0.094rem 0px 0px var(--primary-black) inset,
    0.094rem 0.094rem 0px 0px #fff inset,
    -0.188rem -0.188rem 0px 0px var(--dark-primary-color) inset,
    0.188rem 0.188rem 0px 0px var(--secondary-color) inset;
  color: var(--primary-black);
  border: none;
  cursor: none;
`;
