import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 12px 16px;
  background-color: white;
  border: 1px solid var(--light-primary-color);
  cursor: none;

  &:hover {
    background-color: var(--very-light-primary-color);
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  height: fit-content;
  box-sizing: border-box;
`;

export const Icon = styled.div<{ imgUrl: string }>`
  height: 47px;
  width: 47px;
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  gap: 2px;
  padding: 4px 6px;
  box-sizing: border-box;
`;

export const Name = styled.div`
  font-size: 16px;
  color: #9a5a95;
  user-select: none;
`;

export const Animation = styled.div`
  font-size: 12px;
  color: #e774dd;
  user-select: none;
`;
