import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  gap: 1rem;
  box-sizing: border-box;
  background-color: var(--light-primary-color);
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--very-light-primary-color);
  box-shadow:
    -1px -1px 0 0 #fff inset,
    1px 1px 0 0 var(--primary-black) inset,
    -2px -2px 0 0 #dcafdd inset,
    2px 2px 0 0 #dcafdd inset;
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 1em;
`;

export const BottomContainerSubmit = styled.button`
  width: 20%;
  height: 100%;
  color: var(--primary-black);
  font-family: Galmuri11;
  font-size: 1em;
  background-color: var(--light-primary-color);
  box-shadow:
    -1px -1px 0 0 var(--primary-black) inset,
    1px 1px 0 0 #fff inset,
    -2px -2px 0 0 var(--dark-primary-color) inset,
    2px 2px 0 0 var(--secondary-color) inset;
  border: none;
`;
