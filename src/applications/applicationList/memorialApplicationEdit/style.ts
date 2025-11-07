import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 28px 24px 36px 24px;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
  flex: 1 0 0;
  background: #fff;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  overflow-x: hidden;
`;

export const Section1 = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  box-sizing: border-box;
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

export const AuthorshipFrom = styled.p`
  color: var(--Stroke, #e774dd);
  text-align: right;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CharacterNameText = styled.h2`
  display: flex;
  width: 100%;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-self: stretch;
`;

export const Status = styled.p`
  align-self: stretch;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const TextAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;
  gap: 32px;
  padding: 0 16px;
  box-sizing: border-box;
`;

export const SubmitBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitBtn = styled.button`
  color: var(--Stroke, #e774dd);
  text-align: center;
  font-family: Galmuri11;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  background: transparent;
  border: none;
  cursor: none;
  padding: 12px 24px;

  &:hover {
    opacity: 0.8;
  }
`;

export const LoadingText = styled.p`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 20px;
  text-align: center;
  padding: 40px;
`;

export const ErrorText = styled.p`
  color: #ff0000;
  font-family: Galmuri11;
  font-size: 20px;
  text-align: center;
  padding: 40px;
`;
