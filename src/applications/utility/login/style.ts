import styled from "styled-components";

export const tempImage = styled.div`
    width: 100%;
    height: 180px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    img{
        width: 100%;
    }
`;

export const tempBulk = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ffbbf5;
`;

export const tempMain = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const tempMainStyle = styled.div`
    background-color: #FFD3FB;
    width: 100%;
    height: 100%;
    position: relative;
`;
export const tempInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 20px;
`;

export const tempButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px;
    gap: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
`;
