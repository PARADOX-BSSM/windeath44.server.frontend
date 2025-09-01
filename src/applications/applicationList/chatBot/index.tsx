import { useState, useRef, useEffect } from 'react';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import * as _ from './style';
import ChatMessage from '@/applications/components/chatMessage';
import Choten from '@/assets/profile/choten.svg';
import Ame from '@/assets/profile/ame.svg';
import Hosino from '@/assets/character/hosino.svg';
import { useDoChat } from '@/api/chatbot/chat';
import { useGetChatBotQuery } from '@/api/chatbot/getChatBot';

interface Message {
  id: string;
  avatar: string;
  author: string;
  handle?: string;
  text: string;
}

interface Contributor {
  id: string;
  avatar: string;
  alt: string;
}

const ChatBot = () => {
  const character = '호시노 아이';
  const [message, setMessage] = useState('');
  const doChatMutation = useDoChat();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    // {
    //   id: '1',
    //   avatar: Ame,
    //   author: '로에나',
    //   handle: '@roena0516',
    //   text: '1화만에 죽은 소감이 어때?',
    // },
  ]);

  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [showAllContributors, setShowAllContributors] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getChatBot = useGetChatBotQuery({ chatbot_id: 1 });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const contributeData = getChatBot.data?.data.contributor;
    console.log(contributeData);

    if (contributeData && Array.isArray(contributeData)) {
      const contributorList: Contributor[] = contributeData.map((name: string, index: number) => ({
        id: (index + 1).toString(),
        avatar: index % 2 === 0 ? Choten : Ame,
        alt: name,
      }));

      setContributors(contributorList);
    }
  }, [getChatBot.data]);

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
    if (isLoading) {
      return;
    }
    e.preventDefault();
    if (!message.trim() || isLoading) {
      return;
    }

    setIsLoading(true);

    // API 호출
    doChatMutation.mutate(
      {
        chatbotId: 1,
        content: message.trim(),
        userId: 'pdh0128',
      },
      {
        onSuccess: (response) => {
          const tempData: Message = {
            id: Date.now().toString(),
            avatar: Hosino,
            author: character,
            text: response.data.answer,
          };
          // console.log(response);
          setMessages((prev) => [...prev, tempData]);
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      },
    );

    addMessage();
  };

  const handleMemorialClick = () => {
    console.log('Navigate to memorial');
  };

  const handleContributorsCountClick = () => {
    setShowAllContributors(!showAllContributors);
  };

  const displayedContributors = showAllContributors ? contributors : contributors.slice(0, 5);

  return (
    <_.Container>
      <_.MainContent>
        <_.LeftPanel>
          <_.ProfileSection>
            <_.ProfileTop>
              <_.CharacterImageContainer>
                <_.CharacterImage
                  src={Hosino}
                  alt={character}
                />
              </_.CharacterImageContainer>
              <_.CharacterName>{character}</_.CharacterName>
            </_.ProfileTop>

            <_.ContributorsSection>
              <_.ContributorsTitle>챗봇 기여자</_.ContributorsTitle>
              <_.ContributorsList>
                {displayedContributors.map((contributor) => (
                  <_.ContributorAvatar
                    key={contributor.id}
                    src={contributor.avatar}
                    alt={contributor.alt}
                  />
                ))}
              </_.ContributorsList>
              <_.ContributorsCount
                onClick={handleContributorsCountClick}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseOut={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                {showAllContributors
                  ? `${contributors.length}명의 기여자`
                  : `+ ${contributors.length - 5}명의 기여자`}
              </_.ContributorsCount>
            </_.ContributorsSection>
          </_.ProfileSection>

          <_.MemorialButton
            onClick={handleMemorialClick}
            onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
            onMouseOut={() => setCursorImage(CURSOR_IMAGES.default)}
          >
            추모관 바로가기
          </_.MemorialButton>
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
              {isLoading ? <_.LoadingMessage>답변을 기다리는 중입니다.</_.LoadingMessage> : ''}
              <div ref={messagesEndRef} />
            </_.ChatMessagesContainer>
          </_.ChatArea>

          <_.InputSection>
            <_.InputForm onSubmit={handleSubmit}>
              <_.MessageInput
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isLoading ? '답변을 기다리는 중입니다..' : '메시지 입력'}
                readOnly={isLoading}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag)}
                onMouseOut={() => setCursorImage(CURSOR_IMAGES.default)}
              />
            </_.InputForm>
            <_.SendButton
              type="button"
              onClick={() => {
                const fakeEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>;
                handleSubmit(fakeEvent);
              }}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseOut={() => setCursorImage(CURSOR_IMAGES.default)}
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
