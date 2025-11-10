import styled from '@emotion/styled';

export const Main = styled.main`
  display: flex;
  padding: 12px;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  background: var(--LightPrimary, #ffd3fb);
  height: 100%;
  box-sizing: border-box;
  position: relative; /* 모달의 기준점으로 사용 */
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  border: 1px black solid;
`;

export const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  flex: 1 0 0;
  background: #fff;
  box-sizing: border-box;
`;

export const Section1 = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  align-self: stretch;
  position: relative;
  z-index: 100;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

export const Title = styled.h1`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-self: stretch;
`;

export const Subtitle = styled.p`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const LikeButton = styled.button<{ $isLiked: boolean }>`
  color: ${(props) => (props.$isLiked ? 'var(--off, #fd51a7)' : 'var(--Stroke, #e774dd)')};
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: none;
  border: none;
  cursor: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    opacity: 0.7;
  }
`;

export const BackButton = styled.button`
  color: var(--Stroke, #e774dd);
  text-align: right;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: none;
  border: none;
  cursor: none;
  pointer-events: auto;
  position: relative;
  z-index: 101;
  padding: 4px 8px;

  &:hover {
    opacity: 0.7;
  }
`;

export const ApproveButton = styled.button`
  color: var(--Stroke, #e774dd);
  text-align: right;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: none;
  border: none;
  cursor: none;
  pointer-events: auto;
  position: relative;
  z-index: 101;
  padding: 4px 8px;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const RejectButton = styled.button`
  color: #999;
  text-align: right;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: none;
  border: none;
  cursor: none;
  pointer-events: auto;
  position: relative;
  z-index: 101;
  padding: 4px 8px;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  align-self: stretch;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;
`;

export const ProfileContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const ProfileInnerContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
`;

export const Ribbon = styled.img`
  position: absolute;
  top: 0;
  width: 144px;
  z-index: 1;
`;

export const Picture = styled.div<{ imgUrl?: string }>`
  display: flex;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 12px solid #000;
  background: #fff;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  width: 144px;
  flex-shrink: 0;
`;

export const Name = styled.p`
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -1px;
  border: 1px solid var(--Stroke, #e774dd);
`;

export const Row = styled.div`
  display: flex;
  width: 328px;
  align-items: flex-start;
  gap: -1px;
`;

export const Attribute = styled.div`
  display: flex;
  width: 100px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid var(--Stroke, #e774dd);
  background: var(--LightPrimary, #ffd3fb);
  color: var(--off, #fd51a7);
  text-align: center;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 100%;
  box-sizing: border-box;
`;

export const Value = styled.div`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  border: 1px solid var(--Stroke, #e774dd);
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Section2 = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const ArticleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const ArticleTitle = styled.h1`
  color: var(--Black, #2e2e2e);
  font-family: Galmuri11;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ArticleContent = styled.div`
  display: flex;
  padding: 0 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// 거절 사유 모달
export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  border: 2px solid #000;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 400px;
  max-width: 600px;
`;

export const ModalTitle = styled.h2`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const ModalTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 8px;
  border: 1px solid var(--Stroke, #e774dd);
  background: #fff;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  resize: none;
  box-sizing: border-box;
  cursor: none;

  &:focus {
    outline: none;
    border-color: var(--off, #fd51a7);
  }

  &::placeholder {
    color: #999;
  }
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  background: ${(props) => (props.variant === 'primary' ? 'var(--Stroke, #e774dd)' : '#fff')};
  color: ${(props) => (props.variant === 'primary' ? '#fff' : '#2e2e2e')};
  border: 1px solid var(--Stroke, #e774dd);
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: none;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
