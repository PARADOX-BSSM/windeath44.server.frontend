import styled from '@emotion/styled';

export const Btn = styled.button`
  display: flex;
  width: auto;
  height: 32px;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  background: var(--light-primary-color);
  box-shadow:
    -1px -1px 0px 0px var(--primary-black) inset,
    1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px var(--dark-primary-color) inset,
    2px 2px 0px 0px var(--secondary-color) inset;
  color: var(--primary-black);
  border: none;
  text-align: center;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  cursor: none;
`;

export const SelectedBtn = styled.button`
  display: flex;
  width: auto;
  height: 32px;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  background: var(--LightPrimary, #ffd3fb);
  box-shadow:
    -1px -1px 0px 0px #fff inset,
    1px 1px 0px 0px var(--primary-black) inset,
    -2px -2px 0px 0px var(--secondary-color) inset,
    2px 2px 0px 0px var(--dark-primary-color) inset;
  color: var(--primary-black);
  text-align: center;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  border: none;
  cursor: none;
`;

export const SubmitActive = styled.button`
  width: auto;
  display: flex;  
  height: 32px;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  background: var(--LightPrimary, #ffd3fb);
  box-shadow:
    -1px -1px 0px 0px var(--primary-black) inset,
    1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px var(--dark-primary-color) inset,
    2px 2px 0px 0px var(--secondary-color) inset;
  color: var(--Black, #2e2e2e);
  text-align: center;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 0.938rem;
  border: none;
  cursor: none;
`;
