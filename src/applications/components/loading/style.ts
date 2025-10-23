import styled from '@emotion/styled';

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const LoadingImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`;

export const LoadingText = styled.div`
  color: var(--primary-black);
  font-family: Galmuri11;
  font-size: 1.2rem;
`;
