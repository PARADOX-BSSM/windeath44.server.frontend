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
  height: 11.25rem;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    height: 6.75rem;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    img {
        width: 100%;
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

export const inputs = styled.div`
  font-family: 'Galmuri11';
  font-size: 0.9rem;
  line-height: 3.375rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const inputStyle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const outside = styled.div`
  width: 2.75rem;
  height: 3rem;
  background-color: #000;
  border-width: 0 0.094rem 0.094rem 0;
  border-style: solid;
  border-color: #fff;
`;

export const inside = styled.input`
  width: 2.375rem;
  height: 2.625rem;
  margin: 0.094rem 0 0 0.094rem;
  text-align: center;
  font-family: 'Galmuri11';
  font-size: 1.5rem;
  border: #dcafdd solid 0.125rem;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const note = styled.div`
  font-family: 'Galmuri11';
  font-size: 0.75rem;
  padding: 0 7rem;
  color: #e774dd;
`;
