import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 1rem;
  box-sizing: border-box;
  background-color: var(--light-primary-color);
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2em;
`;

export const TopInnerFirst = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const TopInnerFirstBox = styled.div`
  width: 50%;
  height: 4rem;
  background-color: var(--very-light-primary-color);
  border: var(--primary-black) solid 2px;
  display: flex;
`;

export const TopInnerFirstP = styled.p`
  width: fit-content;
  height: fit-content;
  margin: auto;
  font-family: Galmuri11;
  color: var(--primary-black);
  font-size: 1.25em;
`;

export const TopInnerFirstImg = styled.img`
  width: 10rem;
`;

export const TopInnerSecond = styled.div`
  width: 100%;
  height: 7rem;
  background-color: var(--very-light-primary-color);
  box-shadow:
    -1px -1px 0 0 #fff inset,
    1px 1px 0 0 var(--primary-black) inset,
    -2px -2px 0 0 var(--dark-primary-color) inset,
    2px 2px 0 0 var(--dark-primary-color) inset;
  display: flex;
`;

export const TopInnerSecondP = styled.p`
  width: fit-content;
  height: fit-content;
  margin: auto;
  font-family: Galmuri11;
  color: var(--primary-black);
  font-size: 1.75em;
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

export const InputForm = styled.form`
  width: 100%;
  flex: 1;
  gap: 16px;
  display: flex;
`;
