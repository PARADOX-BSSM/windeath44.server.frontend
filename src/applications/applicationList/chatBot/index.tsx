import { useState, useRef, useEffect } from 'react';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import * as _ from './style';
import ChatMessage from '@/applications/components/chatMessage';
import Loading from '@/applications/components/loading';
import Ame from '@/assets/profile/ame.svg';
import Hosino from '@/assets/character/hosino.svg';
import { useDoChat } from '@/api/chatbot/chat';
import { useGetChatBotQuery } from '@/api/chatbot/getChatBot';
import { useGetChatbotHistory, type ChatHistoryItem } from '@/api/chatbot/getChatbotHistory';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom, taskSearchAtom } from '@/atoms/taskTransformer';
import { useGetUserMutation } from '@/api/user/getUser';
import { useGetCharacter, CharacterData } from '@/api/anime/getCharacter';
import { useProcessManager } from '@/hooks/processManager';
import { useGetMemorialsCharacterFilteredQuery } from '@/api/memorial/getMemorialsCharacterFiltered';
import { useGetUsersQuery } from '@/api/user/getUsersByIds';

interface Message {
  id: string;
  avatar: string;
  author: string;
  handle?: string;
  text: string;
}

interface WordSet {
  question: string;
  answer: string;
  contributor: string;
}

interface Contributor {
  id: string;
  avatar: string;
  alt: string;
  userId: string;
  wordsets: WordSet[];
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
  const [messages, setMessages] = useState<Message[]>([]);

  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [hasNextHistory, setHasNextHistory] = useState<boolean>(false);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState<boolean>(false);

  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [showAllContributors, setShowAllContributors] = useState(false);
  const [hoveredContributorId, setHoveredContributorId] = useState<string | null>(null);
  const [characterData, setCharacterData] = useState<CharacterData>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const getChatBot = useGetChatBotQuery({ chatbot_id: chatbotId });
  const { mutate: getUser, data: userData } = useGetUserMutation();
  const getCharacterMutation = useGetCharacter(setCharacterData);
  const mutationGetChatHistory = useGetChatbotHistory(setChatHistory, setHasNextHistory, false);

  // contributor 유저 정보 가져오기
  const contributorIds = getChatBot.data?.data?.contributor || [];
  const { data: contributorsData } = useGetUsersQuery(contributorIds);

  // 캐릭터 ID로 추모관 조회
  const { data: memorialsData } = useGetMemorialsCharacterFilteredQuery({
    orderBy: 'recently-updated',
    page: 1,
    characters: [chatbotId],
    enabled: true,
  });

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

    // 채팅 기록 불러오기
    mutationGetChatHistory.mutate(
      { chatbotId, size: 20 },
      {
        onSuccess: () => {
          setIsHistoryLoaded(true);
        },
        onError: () => {
          console.error('채팅 기록을 불러오는 중 오류가 발생했습니다.');
          setIsHistoryLoaded(true); // 에러가 나도 계속 진행
        },
      },
    );
  }, [chatbotId]);

  // 채팅 기록을 Message 형식으로 변환
  useEffect(() => {
    if (isHistoryLoaded && userData && characterData && getChatBot.data) {
      if (chatHistory && chatHistory.length > 0) {
        const historyMessages: Message[] = [];

        // 역순으로 처리 (가장 오래된 것부터 표시)
        const reversedHistory = [...chatHistory].reverse();

        reversedHistory.forEach((item, index) => {
          // User message (input_text)
          historyMessages.push({
            id: `history-${item._id}-user`,
            avatar: userImg,
            author: userName,
            handle: `@${userId}`,
            text: item.input_text,
          });

          // Assistant message (output_text)
          historyMessages.push({
            id: `history-${item._id}-assistant`,
            avatar: characterImage,
            author: character,
            text: item.output_text,
          });
        });

        setMessages(historyMessages);
      } else {
        // 히스토리가 없으면 빈 배열로 설정
        setMessages([]);
      }
    }
  }, [
    isHistoryLoaded,
    chatHistory,
    userData,
    characterData,
    getChatBot.data,
    userImg,
    userName,
    userId,
    characterImage,
    character,
  ]);

  useEffect(() => {
    const contributeData = getChatBot.data?.data?.contributor;
    const wordsetData = getChatBot.data?.data?.chatbot_wordset;

    if (contributeData && Array.isArray(contributeData) && contributeData.length > 0) {
      // contributorsData가 있으면 프로필 이미지를 매핑
      const contributorList: Contributor[] = contributeData.map((userId: string, index: number) => {
        // contributorsData에서 해당 userId의 프로필 찾기
        const userProfile = contributorsData?.data?.find((user) => user.userId === userId);

        // 해당 contributor의 wordset 필터링
        const userWordsets =
          wordsetData?.filter((wordset: WordSet) => wordset.contributor === userId) || [];

        return {
          id: (index + 1).toString(),
          avatar: userProfile?.profile || Ame, // 프로필이 있으면 사용, 없으면 기본 이미지
          alt: userId,
          userId: userId,
          wordsets: userWordsets,
        };
      });

      setContributors(contributorList);
    } else {
      setContributors([]);
    }
  }, [getChatBot.data, contributorsData]);

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
        onError: (error: any) => {
          setIsLoading(false);

          // 서버에서 온 에러 메시지 추출
          const errorMessage = error?.response?.data?.message || '채팅 중 오류가 발생했습니다.';

          setAlert?.(
            <>
              {errorMessage}
              <br />
              절하기를 통해 토큰을 모아보세요!
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
        },
      },
    );

    addMessage();
  };

  const handleMemorialClick = () => {
    // API 응답 구조 확인: memorialsData?.data?.values 또는 memorialsData?.data
    const memorials = memorialsData?.data?.values || memorialsData?.data || [];

    if (!Array.isArray(memorials) || memorials.length === 0) {
      setAlert?.(
        <>
          해당 캐릭터의 추모관을 찾을 수 없습니다.
          <br />
          추모관이 존재하는지 확인해주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    }

    // 첫 번째 추모관 사용 (캐릭터 ID로 필터링된 추모관)
    const firstMemorial = memorials[0];

    if (!firstMemorial || !firstMemorial.memorialId) {
      setAlert?.(
        <>
          추모관 데이터를 찾을 수 없습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    }

    const memorialId = firstMemorial.memorialId;

    // taskTransform 사용 (search/viewer와 동일한 방식)
    taskTransform?.('', '추모관 뷰어', {
      memorialId: memorialId,
      characterId: chatbotId,
    });
  };

  const handleContributorsCountClick = () => {
    setShowAllContributors(!showAllContributors);
  };

  const displayedContributors = showAllContributors ? contributors : contributors.slice(0, 5);

  // 캐릭터 정보와 히스토리를 불러오기 전까지 로딩 컴포넌트 표시
  if (getChatBot.isLoading || !characterData || !isHistoryLoaded) {
    return <Loading />;
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
              <_.ContributorsTitle>영매사 목록</_.ContributorsTitle>
              <_.ContributorsList>
                {displayedContributors.map((contributor) => (
                  <_.ContributorAvatarWrapper
                    key={contributor.id}
                    onMouseEnter={() => {
                      setHoveredContributorId(contributor.id);
                      setCursorImage(CURSOR_IMAGES.hand);
                    }}
                    onMouseLeave={() => {
                      setHoveredContributorId(null);
                      setCursorImage(CURSOR_IMAGES.default);
                    }}
                  >
                    <_.ContributorAvatar
                      src={contributor.avatar}
                      alt={contributor.alt}
                    />
                    <_.ContributorCard show={hoveredContributorId === contributor.id}>
                      <_.ContributorCardUserId>@{contributor.userId}</_.ContributorCardUserId>
                      {contributor.wordsets.length > 0 ? (
                        contributor.wordsets.map((wordset, index) => (
                          <_.ContributorCardItem key={index}>
                            <_.ContributorCardQuestion>
                              Q: {wordset.question}
                            </_.ContributorCardQuestion>
                            <_.ContributorCardAnswer>A: {wordset.answer}</_.ContributorCardAnswer>
                          </_.ContributorCardItem>
                        ))
                      ) : (
                        <_.ContributorCardAnswer>
                          아직 등록된 질문/답변이 없습니다.
                        </_.ContributorCardAnswer>
                      )}
                    </_.ContributorCard>
                  </_.ContributorAvatarWrapper>
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
              {isLoading && (
                <Loading
                  text="영혼과 이어지는 중입니다..."
                  imageSize="60px"
                />
              )}
              <div ref={messagesEndRef} />
            </_.ChatMessagesContainer>
          </_.ChatArea>

          <_.InputSection>
            <_.InputForm onSubmit={handleSubmit}>
              <_.MessageInput
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isLoading ? '영혼과 이어지는 중입니다...' : '메시지 입력'}
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
