import styled from '@emotion/styled';

export const CommentDiv = styled.div<{ $isReply?: boolean }>`
  display: flex;
  padding: 12px 16px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  background: #fff;
  ${(props) =>
    props.$isReply &&
    `
        padding-left: 58px;
        background: #f9f9f9;
    `}
`;

export const ProfileImg = styled.div<{ imgUrl: string }>`
  width: 48px;
  height: 48px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
`;

export const TextBox = styled.div`
  display: flex;
  padding: 0 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;
export const NickNameContainer = styled.div`
  display: flex;
  padding: 6px 0px;
  align-items: flex-end;
  gap: 8px;
`;

export const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;

export const Content = styled.p`
  color: var(--Black, #2e2e2e);
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  flex: 1;
  margin: 0;
`;

export const NickName = styled.p`
  color: #9a5a95;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const UserId = styled.p`
  color: var(--DarkPrimary, #dcafdd);
  font-family: Galmuri11;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const ReplyButton = styled.button`
  background: none;
  border: none;
  color: var(--Stroke, #e774dd);
  font-family: Galmuri11;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: none;
  padding: 4px 0 0 0;
  margin: 0;
  &:hover {
    text-decoration: underline;
  }
`;

export const ReplyFormContainer = styled.div`
  display: flex;
  padding: 12px 16px;
  padding-left: 58px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: #ffebfd;
`;

export const ReplyForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ReplyInput = styled.input`
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  background: none;
  outline: none;
  box-shadow: none;
  padding: 0;
  border-width: 0;
  flex: 1;
  &::placeholder {
    color: var(--DarkPrimary, #dcafdd);
  }
`;

export const CharCount = styled.span`
  font-family: Galmuri11;
  font-size: 10px;
  color: var(--DarkPrimary, #dcafdd);
  white-space: nowrap;
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-top: 4px;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: var(--Stroke, #e774dd);
  font-family: Galmuri11;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: none;
  padding: 0;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const EditInput = styled.input`
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 1px solid var(--DarkPrimary, #dcafdd);
  background: #fff;
  outline: none;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: var(--Stroke, #e774dd);
  }
`;

export const EditButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
`;

export const EditCancelButton = styled.button`
  background: none;
  border: 1px solid var(--DarkPrimary, #dcafdd);
  color: var(--DarkPrimary, #dcafdd);
  font-family: Galmuri11;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 4px;

  &:hover {
    background: #f5f5f5;
  }
`;

export const EditSubmitButton = styled.button`
  background: var(--Stroke, #e774dd);
  border: none;
  color: #fff;
  font-family: Galmuri11;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 4px;

  &:hover {
    background: var(--off, #fd51a7);
  }
`;
