import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #ffd3fb;
  padding: 0.125rem;
  box-sizing: border-box;
`;

export const MainWindow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ffd3fb;
  gap: 0.25rem;
`;

export const ItemContainer = styled.div`
  flex: 1;
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.35rem;
  overflow: hidden;
  align-items: flex-start;
  align-content: flex-start;
  box-shadow:
    -1px -1px 0px 0px #ffffff inset,
    1px 1px 0px 0px #2e2e2e inset,
    -2px -2px 0px 0px #dcafdd inset,
    2px 2px 0px 0px #dcafdd inset;
`;

export const GameItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5.39rem;
  gap: 0.563rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const GameIcon = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: contain;
`;

export const GameName = styled.div`
  color: #2e2e2e;
  font-family: 'Galmuri11', sans-serif;
  font-size: 1.031rem;
  font-style: normal;
  line-height: 1.125rem;
  text-align: center;
  min-width: 100%;
  white-space: pre-line;
`;

export const StatusBar = styled.div`
  height: 1.5rem;
  background-color: #dcafdd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.281rem;
  position: relative;
  box-shadow:
    -1.5px -1.5px 0px 0px #ffffff inset,
    1.5px 1.5px 0px 0px #808080 inset;
`;

export const StatusContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.281rem;
`;

export const FolderIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const StatusText = styled.div`
  color: #2e2e2e;
  font-family: 'Galmuri11', sans-serif;
  font-size: 1.031rem;
  line-height: 0.938rem;
  white-space: pre;
`;

export const DragSizeIcon = styled.img`
  width: 1.219rem;
  height: 1.219rem;
`;
