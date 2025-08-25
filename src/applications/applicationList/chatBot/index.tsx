import { useState } from 'react';
import * as _ from './style';
import Choten from '@/assets/profile/choten.svg';
import Ame from '@/assets/profile/ame.svg';
import Hosino from '@/assets/character/hosino.svg';

const ChatBot = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    // TODO: Implement message sending logic
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleMemorialClick = () => {
    // TODO: Navigate to memorial
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
              <_.ChatMessage>
                <_.MessageAvatar src={Ame} />
                <_.MessageContent>
                  <_.MessageHeader>
                    <_.MessageAuthor>로에나</_.MessageAuthor>
                    <_.MessageHandle>@roena0516</_.MessageHandle>
                  </_.MessageHeader>
                  <_.MessageText>1화만에 죽은 소감이 어때?</_.MessageText>
                </_.MessageContent>
              </_.ChatMessage>

              <_.ChatMessage>
                <_.MessageAvatar src={Hosino} />
                <_.MessageContent>
                  <_.MessageHeader>
                    <_.MessageAuthor>호시노 아이</_.MessageAuthor>
                  </_.MessageHeader>
                  <_.MessageText>뒤질래?</_.MessageText>
                </_.MessageContent>
              </_.ChatMessage>

              <_.ChatMessage>
                <_.MessageAvatar src={Ame} />
                <_.MessageContent>
                  <_.MessageHeader>
                    <_.MessageAuthor>로에나</_.MessageAuthor>
                    <_.MessageHandle>@roena0516</_.MessageHandle>
                  </_.MessageHeader>
                  <_.MessageText>ㅜㅜㅜㅜㅜ</_.MessageText>
                </_.MessageContent>
              </_.ChatMessage>
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
              type="submit"
              form="chatForm"
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
