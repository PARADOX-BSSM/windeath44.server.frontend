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
  gap: 56px;
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

export const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

export const StatItem = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid #000;
  background: #FFF;
`;

export const StatNumber = styled.div`
  color: #2E2E2E;
  text-align: center;
  font-family: Galmuri11;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StatLabel = styled.div`
  color: #2E2E2E;
  text-align: center;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const PullRequestsContainer = styled.div`
  display: flex;
  padding: 10px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

export const ListTitle = styled.h3`
  height: 31px;
  align-self: stretch;
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const LoadingText = styled.div`
  color: #666;
  font-family: Galmuri11;
  font-size: 16px;
  text-align: center;
  padding: 20px;
`;

export const MemorialListBox = styled.div`
  display: flex;
  padding: 0px 12px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

export const MemorialList = styled.div`
  display: flex;
  width: 100%;
  padding: 1px 0px;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  background: rgba(0, 0, 0, 0.20);
`;

export const EmptyMessage = styled.div`
  color: #666;
  font-family: Galmuri11;
  font-size: 16px;
  text-align: center;
  padding: 40px;
  width: 100%;
  background: #F9F9F9;
  border: 1px solid #DDD;
`;

export const MemorialItem = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background: #FFF;
  border: 1px solid #000;
`;

export const MemorialInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
`;

export const MemorialName = styled.h4`
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const MemorialDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const DetailText = styled.span`
  color: #666;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ConflictResolveContainer = styled.div`
  display: flex;
  padding: 20px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-top: 2px solid #FF6B6B;
  margin-top: 20px;
  background: #FFF9F9;
`;

export const ConflictInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: stretch;
  padding: 0 20px;
`;

export const ConflictLabel = styled.div`
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 16px;
  font-weight: 400;
`;

export const ConflictText = styled.div`
  color: #FF6B6B;
  font-family: Galmuri11;
  font-size: 14px;
  padding: 10px;
  background: #FFF;
  border: 1px solid #FF6B6B;
  border-radius: 4px;
  white-space: pre-wrap;
`;

export const ResolveInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: stretch;
  padding: 0 20px;
`;

export const ResolveLabel = styled.div`
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 16px;
  font-weight: 400;
`;

export const ResolveTextarea = styled.textarea`
  font-family: Galmuri11;
  font-size: 14px;
  padding: 10px;
  border: 1px solid #DDD;
  border-radius: 4px;
  resize: vertical;
  min-height: 200px;

  &:focus {
    outline: none;
    border-color: #E774DD;
  }
`;

export const ConflictButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
`;

export const PRDetailContainer = styled.div`
  display: flex;
  padding: 20px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-top: 2px solid #4299E1;
  margin-top: 20px;
  background: #F0F8FF;
`;

export const PRDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: stretch;
  padding: 0 20px;
`;

export const PRContentBox = styled.div`
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: 14px;
  padding: 15px;
  background: #FFF;
  border: 1px solid #4299E1;
  border-radius: 4px;
  white-space: pre-wrap;
  line-height: 1.6;
  max-height: 300px;
  overflow-y: auto;
  min-height: 100px;
`;