import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  padding: 8px;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
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
  padding: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  flex: 1 0 0;
  width: 100%;
`;

// 리스트 아이템
export const NotificationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f9f9f9;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

export const ItemTitle = styled.h3`
  color: var(--Black, #2e2e2e);
  font-family: Galmuri11;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
  flex: 1;
`;

export const ItemDate = styled.span`
  color: #999;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
`;

// 상세 뷰
export const DetailView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

export const BackButton = styled.button`
  color: var(--Stroke, #e774dd);
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const DetailTitle = styled.h2`
  color: var(--Black, #2e2e2e);
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
  padding: 24px 24px 0 24px;
`;

export const DetailContent = styled.p`
  color: var(--Black, #2e2e2e);
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  white-space: pre-wrap;
  padding: 24px;
`;

export const DetailImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  display: block;
`;

export const DetailDate = styled.p`
  color: #999;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
  padding: 16px 24px 24px 24px;
  margin-top: 16px;
  border-top: 1px solid #e0e0e0;
`;
