import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  font-family: Galmuri11;
  display: flex;
  padding: 16px 16px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  background: #fff;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  overflow-x: hidden;
`;

export const Board = styled.div`
  width: 100%;
  height: 100%;
  background: var(--VeryLightPrimary, #ffeefd);
  box-shadow: 2px 2px 0px #dcafdd inset;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  display: inline-flex;
  box-sizing: border-box;
`;

export const Rows = styled.div`
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: flex-start;
  display: inline-flex;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: row;
  max-width: 100%;
  // max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 48px 16px;
  cursor: none;
`;

export const Item = styled.div`
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: inline-flex;
  // padding: 16px;
`;

export const Image = styled.img`
  height: 80%;
`;

export const Name = styled.div`
  width: 100%;
  align-self: stretch;
  text-align: center;
  color: var(--Black, #2e2e2e);
  font-size: 1rem;
  font-weight: 400;
  line-height: 18px;
  word-wrap: break-word;
`;
