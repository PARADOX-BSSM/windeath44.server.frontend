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
  background: var(--LightPrimary, #ffd3fb);
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  overflow: hidden;
  background: #fff;
  border: 1px solid black;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ContentContainer = styled.div`
  display: flex;
  padding: 27px 23px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  flex: 1 0 0;
  width: 100%;
`;

export const NotificationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  padding: 20px;
  border: 1px solid var(--Stroke, #e774dd);
  background: #fff;
`;

export const Title = styled.h2`
  color: var(--Black, #2e2e2e);
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
  align-self: stretch;
`;

export const Content = styled.p`
  color: var(--Black, #2e2e2e);
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  align-self: stretch;
  white-space: pre-wrap;
`;

export const Date = styled.p`
  color: #999;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;
