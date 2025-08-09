import styled from '@emotion/styled';

// *검색결과창
export const view = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  align-self: stretch;
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const inputs = styled.div`
  display: flex;
  gap: 24px;
  background-color: var(--light-primary-color);
  margin: 1px 0 0 1px;
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex-wrap: wrap;
  font-family: 'Galmuri11';
  padding: 16px;
  outline: none;
  border-color: #dcafdd;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
`;

export const Shadow = styled.div`
  display: flex;
  height: 100%;
  background-color: #000;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: #fff;
  padding: 0 0 1px 0;
`;

export const viewer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 0 2px 0;
`;
