import * as _ from './style.ts';
import Inputs from '@/applications/components/inputs';
import Loading from '@/applications/components/loading';
import { useState, useMemo, useEffect } from 'react';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { useAtomValue } from 'jotai';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg.tsx';
import { useGetChatBotsQuery } from '@/api/chatbot/getChatBots.ts';
import { useGetCharacter, CharacterData } from '@/api/anime/getCharacter';
import Hosino from '@/assets/character/hosino.svg';
import { alerterAtom } from '@/atoms/alerter.ts';
import { getCookie } from '@/api/auth/cookie.ts';
import Choten from '@/assets/profile/choten.svg';
import { useProcessManager } from '@/hooks/processManager.tsx';

interface ChatbotItemProps {
  chatbot_id: number;
  name: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const ChatbotItem = ({ chatbot_id, name, description, isSelected, onClick }: ChatbotItemProps) => {
  const [characterData, setCharacterData] = useState<CharacterData>(null);
  const getCharacterMutation = useGetCharacter(setCharacterData);

  useEffect(() => {
    getCharacterMutation.mutate(chatbot_id);
  }, [chatbot_id]);

  // 캐릭터 정보를 불러오기 전까지 렌더링하지 않음
  if (!characterData) {
    return null;
  }

  const characterImage = characterData?.imageUrl || Hosino;

  return (
    <_.TopContainerItem
      $isSelected={isSelected}
      onClick={onClick}
      onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
      onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
    >
      <_.TopContainerItemInfo>
        <_.TopContainerItemImage
          src={characterImage}
          alt={`${name}의 사진`}
        />
        <_.TopContainerItemText>
          <_.TopContainerItemTitle>{name}</_.TopContainerItemTitle>
          <_.TopContainerItemDesc>{description}</_.TopContainerItemDesc>
        </_.TopContainerItemText>
      </_.TopContainerItemInfo>
    </_.TopContainerItem>
  );
};

const ChatbotSelect = () => {
  const [inputs, setInputs] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [, , removeTask] = useProcessManager();
  const taskSearch = useAtomValue(taskSearchAtom);

  const chatBotsQuery = useGetChatBotsQuery({ size: 10 });
  const setAlert = useAtomValue(alerterAtom);
  const token = getCookie('access_token');
  const flattenedChatBots = useMemo(() => {
    if (!chatBotsQuery.data?.data?.values) return [];
    return chatBotsQuery.data.data.values.flat();
  }, [chatBotsQuery.data]);
if(!token && setAlert) {
  const task = taskSearch?.('분신사바');
  if (task) removeTask(task);
  return (
    setAlert(
      Choten,
      <>
        게스트는 분신사바 기능을 이용할 수 없습니다.
        <br />
        로그인 후 사용 가능 합니다.
      </>,
      () => {
        taskTransform?.('경고', '로그인');
      },
    )
  )
};
  return (
    <_.Container>
      <_.TopContainer>
        {chatBotsQuery.isLoading ? (
          <Loading />
        ) : chatBotsQuery.error ? (
          <div>Error loading chatbots</div>
        ) : (
          flattenedChatBots?.map((item) => (
            <ChatbotItem
              key={item.chatbot_id}
              chatbot_id={item.chatbot_id}
              name={item.name}
              description={item.description as string}
              isSelected={selectedItem === item.chatbot_id.toString()}
              onClick={() => setSelectedItem(item.chatbot_id.toString())}
            />
          ))
        )}
      </_.TopContainer>
      <_.BottomContainer>
        <Inputs
          width="80%"
          fontSize="1rem"
          flex={false}
          value={inputs}
          type="text"
          setValue={setInputs}
          placeHold="검색"
        ></Inputs>
        <_.BottomContainerSubmit
          disabled={selectedItem === null}
          onClick={(e) => {
            e.stopPropagation();
            if (selectedItem !== null) {
              taskTransform?.('분신사바', '빙의', {
                chatbotId: Number(selectedItem),
              });
            }
          }}
          onMouseEnter={() => {
            setCursorImage(CURSOR_IMAGES.hand);
          }}
          onMouseLeave={() => {
            setCursorImage(CURSOR_IMAGES.default);
          }}
        >
          빙의
        </_.BottomContainerSubmit>
        <_.BottomContainerSubmit
          disabled={selectedItem === null}
          onClick={() => {
            if (selectedItem !== null) {
              taskTransform?.('분신사바', '분신사바 메인', {
                chatbotId: Number(selectedItem),
              });
            }
          }}
          onMouseEnter={() => {
            setCursorImage(CURSOR_IMAGES.hand);
          }}
          onMouseLeave={() => {
            setCursorImage(CURSOR_IMAGES.default);
          }}
        >
          입장
        </_.BottomContainerSubmit>
      </_.BottomContainer>
    </_.Container>
  );
};
export default ChatbotSelect;
