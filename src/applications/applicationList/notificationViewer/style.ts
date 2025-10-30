import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: var(--LightPrimary, #ffd3fb);
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Container = styled.div`
  display: flex;
  padding: 8px;
  height: fit-content;
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
  height: fit-content;
  align-self: stretch;
  overflow: hidden;
  background: #fff;
  border: 1px solid black;
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

// 상세 뷰
export const DetailView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
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
