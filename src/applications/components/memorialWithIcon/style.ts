import styled from '@emotion/styled';

export const Item = styled.div`
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  display: inline-flex;
`;

export const Icon = styled.img`
  width: 48px;
  height: 48px;
`;

export const Name = styled.div`
  align-self: stretch;
  text-align: center;
  color: var(--Black, #2e2e2e);
  font-size: 16px;
  font-family: Galmuri11;
  line-height: 18px;
  word-wrap: break-word;
  max-width: 64px;
`;
