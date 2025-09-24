import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  padding: 12px;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  overflow: hidden;
  background: var(--LightPrimary, #FFD3FB);
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  overflow: hidden;
  background: #FFF;
  border: 1px solid black;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ContentContainer = styled.div`
  display: flex;
  padding: 27px 23px;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  flex: 1 0 0;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`;

export const InnerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

export const LeftHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

export const Title = styled.h2`
  align-self: stretch;
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const BackButton = styled.p`
  color: var(--Stroke, #E774DD);
  text-align: right;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  margin: 0;
`;

export const ConflictResolveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  align-self: stretch;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  padding: 20px;
  border: 2px solid #FF6B6B;
  background: #FFF9F9;
`;

export const InfoTitle = styled.h3`
  color: #FF6B6B;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const InfoText = styled.p`
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
`;

export const ResolveInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: stretch;
`;

export const ResolveLabel = styled.div`
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 18px;
  font-weight: 400;
`;

export const ResolveTextarea = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: 16px;
  font-family: Galmuri11;
  font-size: 14px;
  line-height: 1.5;
  color: #2E2E2E;
  background-color: #f8f9fa;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #E774DD;
    background-color: #fff;
  }

  &::placeholder {
    color: #6c757d;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

export const LoadingText = styled.div`
  color: #666;
  font-family: Galmuri11;
  font-size: 16px;
  text-align: center;
  padding: 20px;
`;