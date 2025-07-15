import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 0.75rem;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  width: 100%;
  color: var(--Black, #2e2e2e);
  font-family: Galmuri11;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CommitAreaContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  background: var(--VeryLightPrimary, #ffeefd);
`;

export const CommitArea = styled(TextareaAutosize)`
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  resize: none;
  background: none;
  color: #000;
  font-family: Galmuri11;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  align-self: stretch;
  outline: none;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  width: 1.5rem;
  margin-left: 0.25rem;
`;
