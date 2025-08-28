import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  gap: 1rem;
  box-sizing: border-box;
  background-color: var(--light-primary-color);
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--very-light-primary-color);
  box-shadow:
    -1px -1px 0 0 #fff inset,
    1px 1px 0 0 var(--primary-black) inset,
    -2px -2px 0 0 #dcafdd inset,
    2px 2px 0 0 #dcafdd inset;
  overflow-y: auto;
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 1em;
`;

export const BottomContainerSubmit = styled.button<{ disabled?: boolean }>`
  width: 20%;
  height: 100%;
  color: ${({ disabled }) => (disabled ? 'var(--dark-primary-color)' : 'var(--primary-black)')};
  font-family: Galmuri11;
  font-size: 1em;
  border: none;
  background-color: var(--light-primary-color);
  box-shadow:
    -1px -1px 0 0 var(--primary-black) inset,
    1px 1px 0 0 #fff inset,
    -2px -2px 0 0 var(--dark-primary-color) inset,
    2px 2px 0 0 var(--secondary-color) inset;
  cursor: none;
`;
export const TopContainerItem = styled.div<{ $isSelected?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 5.5rem;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ $isSelected }) => ($isSelected ? '#fbd8fdff' : '#fff')};
  box-shadow: 0 -1px 0 0 #cccccc inset;
  cursor: none;

  &:hover {
    background-color: ${({ $isSelected }) => ($isSelected ? '#fbcafdff' : '#f5f5f5')};
  }
`;
export const TopContainerItemInfo = styled.div`
  display: flex;
`;
export const TopContainerItemImage = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  box-sizing: border-box;
`;
export const TopContainerItemText = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
`;
export const TopContainerItemTitle = styled.div`
  color: #9a5a95;
  font-family: Galmuri11;
  font-size: 0.95rem;
`;
export const TopContainerItemDesc = styled.div`
  color: var(--primary-black);
  font-family: Galmuri11;
  font-size: 0.8rem;
`;
