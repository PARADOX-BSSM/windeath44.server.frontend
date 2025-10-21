import { useState, useRef, useEffect } from 'react';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import * as _ from './style';
import ChatMessage from '@/applications/components/chatMessage';
import Choten from '@/assets/profile/choten.svg';
import Ame from '@/assets/profile/ame.svg';
import Hosino from '@/assets/character/hosino.svg';
import { useDoChat } from '@/api/chatbot/chat';
import { useGetChatBotQuery } from '@/api/chatbot/getChatBot';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useGetUserMutation } from '@/api/user/getUser';
import { useGetCharacter, CharacterData } from '@/api/anime/getCharacter';

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

interface ChatBotProps {
  chatbotId?: number;
}

const ChatBot = ({ chatbotId = 1 }: ChatBotProps) => {
  const [message, setMessage] = useState('');
  const doChatMutation = useDoChat();
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
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
  const [characterData, setCharacterData] = useState<CharacterData>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getChatBot = useGetChatBotQuery({ chatbot_id: chatbotId });
  const { mutate: getUser, data: userData } = useGetUserMutation();
  const getCharacterMutation = useGetCharacter(setCharacterData);

  // API에서 가져온 챗봇 정보
  const character = getChatBot.data?.data?.name || '챗봇';
  const characterImage = characterData?.imageUrl || Hosino;

  // 사용자 정보
  const userName = userData?.data?.name || '사용자';
  const userId = userData?.data?.userId || 'user';
  const userImg = userData?.data?.profile || Ame;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    // chatbotId와 characterId가 같으므로 chatbotId로 캐릭터 정보 가져오기
    getCharacterMutation.mutate(chatbotId);
  }, [chatbotId]);

  useEffect(() => {
    const contributeData = getChatBot.data?.data?.contributor;
    // console.log(contributeData);

    if (contributeData && Array.isArray(contributeData) && contributeData.length > 0) {
      const contributorList: Contributor[] = contributeData.map((name: string, index: number) => ({
        id: (index + 1).toString(),
        avatar: index % 2 === 0 ? Choten : Ame,
        alt: name,
      }));

      setContributors(contributorList);
    } else {
      setContributors([]);
    }
  }, [getChatBot.data]);

  const addMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      avatar: userImg,
      author: userName,
      handle: `@${userId}`,
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
        chatbotId: chatbotId,
        content: message.trim(),
        userId: userId,
      },
      {
        onSuccess: (response) => {
          const tempData: Message = {
            id: Date.now().toString(),
            avatar: characterImage,
            author: character,
            text: response.data.answer,
          };
          // console.log(response);
          setMessages((prev) => [...prev, tempData]);
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
          setAlert?.(Choten, <>채팅 중 오류가 발생했습니다.</>, () => {
            taskTransform?.('경고', '');
          });
        },
      },
    );

    addMessage();
  };

  const handleMemorialClick = () => {
    // console.log('Navigate to memorial');
  };

  const handleContributorsCountClick = () => {
    setShowAllContributors(!showAllContributors);
  };

  const displayedContributors = showAllContributors ? contributors : contributors.slice(0, 5);

  // 캐릭터 정보를 불러오기 전까지 렌더링하지 않음
  if (getChatBot.isLoading || !characterData) {
    return null;
  }

  return (
    <_.Container>
      <_.MainContent>
        <_.LeftPanel>
          <_.ProfileSection>
            <_.ProfileTop>
              <_.CharacterImageContainer>
                <_.CharacterImage
                  src={characterImage}
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
              {contributors.length > 5 && (
                <_.ContributorsCount
                  onClick={handleContributorsCountClick}
                  onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                  onMouseOut={() => setCursorImage(CURSOR_IMAGES.default)}
                >
                  {showAllContributors
                    ? `${contributors.length}명의 기여자`
                    : `+ ${contributors.length - 5}명의 기여자`}
                </_.ContributorsCount>
              )}
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
