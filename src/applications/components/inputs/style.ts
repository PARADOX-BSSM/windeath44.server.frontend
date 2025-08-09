import styled from '@emotion/styled';
import '@/assets/font.css';

export const inputsDiv = styled.div<{ fontSize?: string; flex?: boolean }>`
  font-family: 'Galmuri11';
  font-size: ${({ fontSize }) => fontSize || '32px'};
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: ${({ flex }) => (flex ? 'space-between' : 'flex-start')};
  flex-direction: ${({ flex }) => (flex ? 'row' : 'column')};
  align-items: ${({ flex }) => (!flex ? 'flex-start' : 'center')};
  cursor: none;
`;

export const label = styled.span`
  font-family: 'Galmuri11';
`;

export const inputs = styled.input<{ width: string }>`
  width: 100%;
  height: 100%;
  padding: 0 4px;
  font-size: 16px;
  font-family: 'Galmuri11';
  outline: none;
  border-color: #dcafdd;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  cursor: none;
`;

export const Shadow = styled.div<{ width: string }>`
  width: ${({ width }) => width || '30.688rem'};
  height: 32px;
  background-color: #000;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: #fff;
  padding: 1px 0 0 1px;
`;
