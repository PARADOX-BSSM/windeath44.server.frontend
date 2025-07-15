import { getPixelFromPercent } from '@/lib/getPixelFromPercent';
import styled from '@emotion/styled';

export const filter_block = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const black = styled.div`
  width: 100%;
  height: 1.55rem;
  background-color: #000;
  border-width: 0 0.078rem 0.078rem 0;
  border-style: solid;
  border-color: #fff;
  padding: 0.016rem 0.078rem 0.078rem 0.016rem;
`;

export const white = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  margin: 0.078rem 0 0 0.078rem;
  width: 100%;
  height: 100%;
  font-family: 'Galmuri11';
  padding: 0 0 0 0;
  outline: none;
  border-color: #dcafdd;
  border-style: solid;
  border-width: ${getPixelFromPercent('width', 0.125)}px;
  box-sizing: border-box;
`;

export const Label = styled.label`
  font-size: 0.8rem;
`;

export const option = styled.div`
  margin: auto 0;
  font-size: 0.8rem;
`;

export const Button = styled.div`
  display: flex;
  width: 1rem;
  height: 100%;
  padding: 0 0.25rem;
  flex-direction: column;
  justify-content: center;
  background: var(--light-primary-color);
  box-shadow:
    -0.094rem -0.094rem 0px 0px var(--primary-black) inset,
    0.094rem 0.094rem 0px 0px #fff inset,
    -0.188rem -0.188rem 0px 0px var(--dark-primary-color) inset,
    0.188rem 0.188rem 0px 0px var(--secondary-color) inset;
  color: var(--primary-black);
  border: none;
  cursor: none;
`;

export const button = styled.button`
  height: 90%;
  margin: 0.063rem;
  border: none;
  display: flex;
`;
