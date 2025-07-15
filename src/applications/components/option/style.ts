import styled from '@emotion/styled';

export const option_set = styled.div`
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  z-index: 1000000;
`;

export const black = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-width: 0.094rem;
  border-style: solid;
  border-color: var(--primary-black);
  box-sizing: border-box;
  max-height: 10rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const options = styled.div`
  padding: 0.1rem;
  &:hover {
    background-color: #efefef;
  }
`;
