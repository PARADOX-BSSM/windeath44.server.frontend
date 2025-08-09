import styled from '@emotion/styled';

export const filter_block = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const black = styled.div`
  width: 100%;
  height: 32px;
  background-color: #000;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: #fff;
  padding: 1px 1px 0 0;
`;

export const white = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  margin: 0 0 0 1px;
  width: 100%;
  height: 100%;
  font-family: 'Galmuri11';
  padding: 0 0 0 0;
  outline: none;
  border-color: #dcafdd;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
`;

export const Label = styled.label`
  font-size: 16px;
`;

export const option = styled.div`
  margin: auto 4px;
  font-size: 16px;
`;

export const Button = styled.div`
  display: flex;
  width: 1rem;
  height: 100%;
  padding: 0 4px;
  flex-direction: column;
  justify-content: center;
  background: var(--light-primary-color);
  box-shadow:
    -1px -1px 0px 0px var(--primary-black) inset,
    1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px var(--dark-primary-color) inset,
    2px 2px 0px 0px var(--secondary-color) inset;
  color: var(--primary-black);
  border: none;
  cursor: none;
`;

export const button = styled.button`
  height: 90%;
  margin: 1px;
  border: none;
  display: flex;
`;
