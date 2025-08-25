import { useState } from 'react';
import * as _ from './style';
import ChatMessage from '@/applications/components/chatMessage';
import Choten from '@/assets/profile/choten.svg';
import Ame from '@/assets/profile/ame.svg';
import Hosino from '@/assets/character/hosino.svg';

interface Message {
  id: string;
  avatar: string;
  author: string;
  handle?: string;
  text: string;
}

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      avatar: Ame,
      author: '로에나',
      handle: '@roena0516',
      text: '1화만에 죽은 소감이 어때?',
    },
    {
      id: '2',
      avatar: Hosino,
      author: '호시노 아이',
      text: '뒤질래?',
    },
    {
      id: '3',
      avatar: Ame,
      author: '로에나',
      handle: '@roena0516',
      text: 'ㅜㅜㅜㅜㅜ',
    },
  ]);

  const addMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      avatar: Ame,
      author: '사용자',
      handle: '@user',
      text: message.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage();
  };

  const handleMemorialClick = () => {
    console.log('Navigate to memorial');
  };

  return (
    <_.Container>
      <_.MainContent>
        <_.LeftPanel>
          <_.ProfileSection>
            <_.ProfileTop>
              <_.CharacterImageContainer>
                <_.CharacterImage
                  src={Hosino}
                  alt="호시노 아이"
                />
              </_.CharacterImageContainer>
              <_.CharacterName>호시노 아이</_.CharacterName>
            </_.ProfileTop>

            <_.ContributorsSection>
              <_.ContributorsTitle>챗봇 기여자</_.ContributorsTitle>
              <_.ContributorsList>
                <_.ContributorAvatar
                  src={Ame}
                  alt="기여자"
                />
                <_.ContributorAvatar
                  src={Choten}
                  alt="기여자"
                />
                <_.ContributorAvatar
                  src={Choten}
                  alt="기여자"
                />
                <_.ContributorAvatar
                  src={Ame}
                  alt="기여자"
                />
                <_.ContributorAvatar
                  src={Ame}
                  alt="기여자"
                />
              </_.ContributorsList>
              <_.ContributorsCount>+ 18932명의 기여자</_.ContributorsCount>
            </_.ContributorsSection>
          </_.ProfileSection>

          <_.MemorialButton onClick={handleMemorialClick}>추모관 바로가기</_.MemorialButton>
        </_.LeftPanel>

        <_.RightPanel>
          <_.ChatArea>
            <_.ChatMessagesContainer>
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  avatar={msg.avatar}
                  author={msg.author}
                  handle={msg.handle}
                  text={msg.text}
                />
              ))}
            </_.ChatMessagesContainer>
          </_.ChatArea>

          <_.InputSection>
            <_.InputForm onSubmit={handleSubmit}>
              <_.MessageInput
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지 입력"
              />
            </_.InputForm>
            <_.SendButton
              type="button"
              onClick={addMessage}
            >
              전송
            </_.SendButton>
          </_.InputSection>
        </_.RightPanel>
      </_.MainContent>
    </_.Container>
  );
};

export default ChatBot;
