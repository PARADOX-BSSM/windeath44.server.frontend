import styled from '@emotion/styled';
export const main = styled.div`
  box-sizing: border-box;
  background-color: var(--light-primary-color);
  font-family: 'Galmuri11';
  font-size: 16px;
  width: 100%;
  height: 100%;
  padding: 12px 24px;
  overflow-y: scroll;
`;
export const nbow = styled.div`
  margin: 8px 0;
`;
export const place = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
`;
export const imgs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 33%;
`;
export const character = styled.img`
  width: 100%;
  border: 12px solid #000;
`;
export const table = styled.img`
  width: 100%;
  margin-top: 28%;
  position: absolute;
`;
export const PictureContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
`;
export const Ribbon = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
`;
export const bbow = styled.div`
  width: 100%;
  margin: -17% 0 17% 0;
  box-sizing: border-box;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
