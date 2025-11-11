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
  position: relative; /* 모달의 기준점으로 사용 */
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

export const GoToBackBtn = styled.p`
  color: var(--Stroke, #e774dd);
  text-align: right;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: none;

  &:hover {
    opacity: 0.7;
  }
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
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const SubTitle = styled.p`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ApplicationContainer = styled.div`
  display: flex;
  padding: 10px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

export const ApplicationContainerTitle = styled.h3`
  height: 31px;
  align-self: stretch;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ApplicationBox = styled.div`
  display: flex;
  padding: 0px 12px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

export const ApplicationInnerBox = styled.div`
  display: flex;
  width: 100%;
  padding: 1px 0px;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  background: rgba(0, 0, 0, 0.2);
`;

export const LoadingText = styled.div`
  color: #666;
  font-family: Galmuri11;
  font-size: 16px;
  text-align: center;
  padding: 40px;
  width: 100%;
  background: #fff;
`;

export const EmptyMessage = styled.div`
  color: #666;
  font-family: Galmuri11;
  font-size: 16px;
  text-align: center;
  padding: 40px;
  width: 100%;
  background: #fff;
  border: 1px solid #ddd;
`;

export const LoadMoreBtn = styled.button`
  color: var(--Stroke, #e774dd);
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 12px 24px;
  background: #fff;
  border: 1px solid var(--Stroke, #e774dd);
  cursor: none;
  margin-top: 20px;

  &:hover {
    background: var(--LightPrimary, #ffd3fb);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
