import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--light-primary-color);
  padding: 8px;
  box-sizing: border-box;
`;

export const MainContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ItemsList = styled.div`
  flex: 1;
  background: var(--chatbot-white);
  display: flex;
  flex-direction: column;
  padding: 2px 2px;
  box-shadow:
    -1px -1px 0px 0px inset var(--chatbot-white),
    1px 1px 0px 0px inset var(--primary-black),
    -2px -2px 0px 0px inset var(--dark-primary-color),
    2px 2px 0px 0px inset var(--dark-primary-color);
`;

export const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 14px;
  cursor: none;

  &:hover {
    background-color: var(--very-light-primary-color);
  }
`;

export const ItemIcon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
`;

export const ItemLabel = styled.p`
  font-family: 'Galmuri11', sans-serif;
  font-size: 18px;
  color: var(--primary-black);
  margin: 0;
  line-height: 18.75px;
`;

export const StatusBar = styled.div`
  height: 24px;
  background: var(--dark-primary-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4.5px;
  box-shadow:
    -1.5px -1.5px 0px 0px inset var(--chatbot-white),
    1.5px 1.5px 0px 0px inset var(--stroke);
  position: relative;
`;

export const StatusContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4.5px;
`;

export const StatusIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
`;

export const StatusText = styled.p`
  font-family: 'Galmuri11', sans-serif;
  font-size: 16.5px;
  color: var(--primary-black);
  margin: 0;
  line-height: 15px;
`;

export const DragSizeIcon = styled.img`
  width: 19.5px;
  height: 19.5px;
  object-fit: contain;
`;
