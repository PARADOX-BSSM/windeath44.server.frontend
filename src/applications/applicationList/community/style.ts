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
  height: 30px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;
export const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;
export const sortInput = styled.div`
  width: 90px;
  font-family: 'Galmuri11', sans-serif;
  font-size: 16px;
`;

export const InputArea = styled.div`
  display: flex;
  width: 100%;
  gap: 14px;
`;
export const PostArea = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #ffeefd;
  overflow-y: scroll;
`;
