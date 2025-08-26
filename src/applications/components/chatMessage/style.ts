import styled from '@emotion/styled';

export const ChatMessage = styled.div`
  background: var(--chatbot-white);
  padding: 12px 15px;
  display: flex;
  gap: 9px;
  align-items: flex-start;
`;

export const MessageAvatar = styled.div<{ src: string }>`
  width: 45px;
  height: 45px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-shrink: 0;
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0 7px;
`;

export const MessageHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 5px 0;
`;

export const MessageAuthor = styled.span`
  font-family: 'Galmuri11', sans-serif;
  font-size: 12px;
  color: var(--chatbot-author);
`;

export const MessageHandle = styled.span`
  font-family: 'Galmuri11', sans-serif;
  font-size: 10px;
  color: var(--dark-primary-color);
`;

export const MessageText = styled.p`
  font-family: 'Galmuri11', sans-serif;
  font-size: 12px;
  color: var(--primary-black);
  margin: 0;
`;