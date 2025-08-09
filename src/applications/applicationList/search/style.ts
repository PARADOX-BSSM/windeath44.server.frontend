import styled from '@emotion/styled';

export const main = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: var(--light-primary-color);
  font-family: 'Galmuri11';
  font-size: 16px;
  width: 100%;
  height: 100%;
  padding: 15px 26px 6px 26px;
`;

export const main_serve = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 6px;
`;

export const search_task = styled.div<{ isColumn: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  min-height: 0;
  flex-direction: ${({ isColumn }) => (isColumn ? 'column' : 'row')};
  gap: ${({ isColumn }) => (isColumn ? '10px' : '10px')};
`;

export const object = styled.div`
  border-width: 1px 0 0 1px;
  flex: 0 0 auto;
  border-style: solid;
  border-color: #808080;
  box-sizing: border-box;
  & > div {
    width: 100%;
    height: fit-content;
    border-width: 0 1px 1px 0;
    border-style: solid;
    border-color: #ffffff;
    box-sizing: border-box;
    background-color: var(--dark-primary-color);
    display: flex;
    align-items: center;
    gap: 6px;
    padding-left: 4px;
    & > div {
      margin: auto 0;
      font-size: 16px;
    }
    & > img {
      width: 24px;
      height: 24px;
    }
  }
`;
