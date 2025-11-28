import styled from '@emotion/styled';

export const Container = styled.div<{ width?: string; height?: string }>`
  box-sizing: border-box;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  padding: 0 0 2px 0;
`;

export const Shadow = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #000;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: #fff;
  padding: 0 0 1px 0;
`;

export const Inner = styled.div<{ backgroundColor?: string }>`
  display: flex;
  background-color: ${({ backgroundColor }) => backgroundColor || 'var(--light-primary-color)'};
  margin: 1px 0 0 1px;
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: 'Galmuri11';
  outline: none;
  border-color: #dcafdd;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
`;

export const Content = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor || '#ffeefd'};
  width: 100%;
  height: 100%;
`;
