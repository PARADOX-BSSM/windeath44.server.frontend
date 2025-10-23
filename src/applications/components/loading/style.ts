import styled from '@emotion/styled';

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #FDFDFD;
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

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

export const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
