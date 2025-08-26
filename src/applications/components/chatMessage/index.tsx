import React from 'react';
import * as _ from './style';

interface ChatMessageProps {
  avatar: string;
  author: string;
  handle?: string;
  text: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ avatar, author, handle, text }) => {
  return (
    <_.ChatMessage>
      <_.MessageAvatar src={avatar} />
      <_.MessageContent>
        <_.MessageHeader>
          <_.MessageAuthor>{author}</_.MessageAuthor>
          {handle && <_.MessageHandle>{handle}</_.MessageHandle>}
        </_.MessageHeader>
        <_.MessageText>{text}</_.MessageText>
      </_.MessageContent>
    </_.ChatMessage>
  );
};

export default ChatMessage;