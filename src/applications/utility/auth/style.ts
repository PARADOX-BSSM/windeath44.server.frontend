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

export const inputs = styled.div`
  font-family: 'Galmuri11';
  width: 100%;
  font-size: 20px;
  line-height: 3.375rem;
  display: flex;
  gap: 64px;
  padding: 10px 0;
  align-items: center;
`;

export const inputStyle = styled.div`
  display: flex;
  gap: 24px;
`;

export const outside = styled.div`
  width: 64px;
  height: 72px;
  background-color: #000;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: #fff;
`;

export const inside = styled.input`
  width: 61px;
  height: 69px;
  margin: 1px 0 0 1px;
  text-align: center;
  font-family: 'Galmuri11';
  font-size: 24px;
  border: #dcafdd solid 1px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const note = styled.div`
  font-family: 'Galmuri11';
  font-size: 16px;
  padding: 0 182px;
  color: #e774dd;
`;
