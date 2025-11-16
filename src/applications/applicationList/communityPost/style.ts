import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  padding: 20px;
  align-items: flex-start;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
  background: var(--LightPrimary, #ffd3fb);
  height: 100%;
  box-sizing: border-box;
`;
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
`;
export const Header = styled.div`
  display: flex;
  height: 28px;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  gap: 20px;

  color: #000;
  text-align: center;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const BtnIcon = styled.button`
  background: none;
  outline: none;
  border: none;
`;
export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
export const PostArea = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #ffeefd;
  overflow-y: scroll;
`;
