import styled from '@emotion/styled';

export const tempMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const tempImageStyle = styled.div`
  width: 100%;
  height: 180px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
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
  padding: 20px;
`;

export const tempButtonsStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 20px;
  gap: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const inputs = styled.div`
  font-family: 'Galmuri11';
  font-size: 20px;
  line-height: 54px;
  display: flex;
  gap: 24px;
`;
export const inputStyle = styled.div`
  display: flex;
  gap: 8px;
`;

export const outside = styled.div`
  width: 48px;
  height: 52px;
  background-color: #000;
  border-width: 0 2px 2px 0;
  border-style: solid;
  border-color: #fff;
`;
export const inside = styled.input`
  width: 42px;
  height: 46px;
  margin: 2px 0 0 2px;
  text-align: center;
  font-family: 'Galmuri11';
  font-size: 24px;
  border: #dcafdd solid 2px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
export const note = styled.div`
  font-family: 'Galmuri11';
  font-size: 12px;
  padding: 0 136px;
  color: #e774dd;
`;
