import styled from '@emotion/styled';

// *검색결과창
export const view = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  align-self: stretch;
  display: flex;
  gap: 0.125rem;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const inputs = styled.div`
  display: flex;
  gap: 1rem;
  background-color: var(--light-primary-color);
  margin: 0.078rem 0 0 0.078rem;
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex-wrap: wrap;
  font-family: 'Galmuri11';
  padding: 0.6rem;
  outline: none;
  border-color: #dcafdd;
  border-style: solid;
  border-width: 0.1125rem;
  box-sizing: border-box;
`;

export const Shadow = styled.div`
  display: flex;
  height: 100%;
  background-color: #000;
  border-width: 0 0.078rem 0.078rem 0;
  border-style: solid;
  border-color: #fff;
  padding: 0.016rem 0.078rem 0.078rem 0.016rem;
`;

export const viewer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 0 0.156rem 0;
`;

export const Item = styled.div`
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  display: inline-flex;
`;

export const Icon = styled.img`
  width: 2.25rem;
  height: 2.25rem;
`;

export const Name = styled.div`
  align-self: stretch;
  text-align: center;
  color: var(--Black, #2e2e2e);
  font-size: 0.7rem;
  font-family: Galmuri11;
  line-height: 0.8rem;
  word-wrap: break-word;
  max-width: 2.5rem;
`;
