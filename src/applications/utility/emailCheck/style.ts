import styled from '@emotion/styled';

export const tempMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const tempImage = styled.div`
  width: 100%;
  height: 11.25rem;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 6.75rem;
    background-color: #ffffff;
  }
`;

export const tempBulkStyle = styled.div`
  width: 100%;
  height: 0.625rem;
  background-color: #ffbbf5;
`;

export const tempMainStyle = styled.div`
  background-color: #ffd3fb;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const tempInputsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1rem;
`;

export const tempButtonsStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 1rem;
  gap: 0.35rem;
  position: absolute;
  bottom: 0;
  right: 0;
`;
