import styled from '@emotion/styled';

export const Item = styled.div`
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  display: inline-flex;
`;

export const Icon = styled.img`
  width: 2.25rem;
  height: 2.25rem;
`;

export const Name = styled.div`
  align-self: stretch;
  text-align: center;
  color: var(--Black, #2e2e2e);
  font-size: 0.7rem;
  font-family: Galmuri11;
  line-height: 0.8rem;
  word-wrap: break-word;
  max-width: 2.5rem;
`;
