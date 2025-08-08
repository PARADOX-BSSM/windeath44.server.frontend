import styled from '@emotion/styled';

export const main = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: var(--light-primary-color);
  font-family: 'Galmuri11';
  font-size: 1rem;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
`;

export const main_serve = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 0.25rem;
`;

export const search_task = styled.div<{ isColumn: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  min-height: 0;
  flex-direction: ${({ isColumn }) => (isColumn ? 'column' : 'row')};
  gap: ${({ isColumn }) => (isColumn ? '0.3rem' : '0.5rem')};
`;

export const object = styled.div`
  border-width: 0.094rem 0 0 0.094rem;
  flex: 0 0 auto;
  border-style: solid;
  border-color: #808080;
  box-sizing: border-box;
  & > div {
    width: 100%;
    height: fit-content;
    border-width: 0 0.094rem 0.094rem 0;
    border-style: solid;
    border-color: #ffffff;
    box-sizing: border-box;
    background-color: var(--dark-primary-color);
    display: flex;
    gap: 0.25rem;
    padding-left: 0.25rem;
    & > div {
      margin: auto 0;
      font-size: 0.8rem;
    }
    & > img {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;
