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

export const PRDetailContainer = styled.div`
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
  gap: 16px;
  align-self: stretch;
  padding: 20px;
  border: 1px solid #000;
  background: #F8F9FA;
`;

export const InfoTitle = styled.h3`
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-self: stretch;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoLabel = styled.span`
  color: #666;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const InfoValue = styled.span`
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const ContentTitle = styled.h3`
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const ContentBox = styled.div`
  align-self: stretch;
  min-height: 300px;
  max-height: 500px;
  padding: 20px;
  border: 1px solid #000;
  background: #FFF;
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-y: auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;