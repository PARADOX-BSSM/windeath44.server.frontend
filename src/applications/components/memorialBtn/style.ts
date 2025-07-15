import styled from '@emotion/styled';

export const Btn = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  display: flex;
  width: ${({ width }) => width || '11.25rem'}; /* 180px */
  height: ${({ height }) => height || '2.625rem'}; /* 42px */
  padding: 0.563rem 0; /* 9px 24px */
  justify-content: center;
  align-items: center;
  background: var(--light-primary-color);
  box-shadow:
    -0.094rem -0.094rem 0px 0px var(--primary-black) inset,
    0.094rem 0.094rem 0px 0px #fff inset,
    -0.188rem -0.188rem 0px 0px var(--dark-primary-color) inset,
    0.188rem 0.188rem 0px 0px var(--secondary-color) inset;
  color: var(--primary-black);
  border: none;
  text-align: center;
  font-family: Galmuri11;
  font-size: ${({ fontSize }) => fontSize || '1.25rem'}; /* 20px */
  font-style: normal;
  font-weight: 400;
  line-height: 0.938rem; /* 15px */
  cursor: none;
`;

export const SelectedBtn = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  display: flex;
  width: ${({ width }) => width || '11.25rem'};
  height: ${({ height }) => height || '2.625rem'};
  padding: 0.563rem 0;
  justify-content: center;
  align-items: center;
  background: var(--LightPrimary, #ffd3fb);
  box-shadow:
    -0.094rem -0.094rem 0px 0px #fff inset,
    0.094rem 0.094rem 0px 0px var(--primary-black) inset,
    -0.188rem -0.188rem 0px 0px var(--secondary-color) inset,
    0.188rem 0.188rem 0px 0px var(--dark-primary-color) inset;
  color: var(--primary-black);
  text-align: center;
  font-family: Galmuri11;
  font-size: ${({ fontSize }) => fontSize || '1.25rem'};
  font-style: normal;
  font-weight: 400;
  line-height: 0.938rem;
  border: none;
  cursor: none;
`;

export const SubmitDefault = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  display: flex;
  width: ${({ width }) => width || '11.25rem'};
  height: ${({ height }) => height || '2.625rem'};
  padding: 0.563rem 0;
  justify-content: center;
  align-items: center;
  background: var(--LightPrimary, #ffd3fb);
  box-shadow:
    -0.094rem -0.094rem 0px 0px var(--primary-black) inset,
    0.094rem 0.094rem 0px 0px #fff inset,
    -0.188rem -0.188rem 0px 0px var(--dark-primary-color) inset,
    0.188rem 0.188rem 0px 0px var(--secondary-color) inset;
  color: var(--dark-primary-color);
  text-align: center;
  font-family: Galmuri11;
  font-size: ${({ fontSize }) => fontSize || '1.25rem'};
  font-style: normal;
  font-weight: 400;
  line-height: 0.938rem;
  border: none;
  cursor: none;
`;

export const SubmitActive = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  width: ${({ width }) => width || '11.25rem'};
  height: ${({ height }) => height || '2.625rem'};
  padding: 0.563rem 0;
  justify-content: center;
  align-items: center;
  background: var(--LightPrimary, #ffd3fb);
  box-shadow:
    -0.094rem -0.094rem 0px 0px var(--primary-black) inset,
    0.094rem 0.094rem 0px 0px #fff inset,
    -0.188rem -0.188rem 0px 0px var(--dark-primary-color) inset,
    0.188rem 0.188rem 0px 0px var(--secondary-color) inset;
  color: var(--Black, #2e2e2e);
  text-align: center;
  font-family: Galmuri11;
  font-size: ${({ fontSize }) => fontSize || '1.25rem'};
  font-style: normal;
  font-weight: 400;
  line-height: 0.938rem;
  border: none;
  cursor: none;
`;
