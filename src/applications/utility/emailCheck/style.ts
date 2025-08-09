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
  height: 180px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 180px;
    background-color: #ffffff;
  }
`;

export const tempBulkStyle = styled.div`
  width: 100%;
  height: 10px;
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
  gap: 12px;
  padding: 24px;
`;

export const tempButtonsStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px;
  gap: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
`;
