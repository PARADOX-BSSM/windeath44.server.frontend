import * as _ from './style';
import seori from '@/assets/seori/seori_mini.png';
import Inputs from '@/applications/components/inputs';
import { useEffect, useState } from 'react';
import { dummyQuestion } from './data';
import { useAddWordSet } from '@/api/chatbot/addChatBotWordSet';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { useGetChatBotQuery } from '@/api/chatbot/getChatBot';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';

interface TeachingChatBotProps {
  chatbotId?: number;
}

const TeachingChatBot = ({ chatbotId = 1 }: TeachingChatBotProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const chatBotQuery = useGetChatBotQuery({ chatbot_id: chatbotId });
  const character = chatBotQuery.data?.data?.name || '호시노 아이';
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);

  const addWordSetMutation = useAddWordSet();
  const randomQuestion = (): number => {
    return Math.floor(Math.random() * dummyQuestion.length);
  };

  const handleRefresh = () => {
    const random = randomQuestion();
    setQuestion(dummyQuestion[random]);
  };

  useEffect(() => {
    const random = randomQuestion();
    setQuestion(dummyQuestion[random]);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addWordSetMutation.mutate(
      {
        characterId: chatbotId,
        userId: '1234',
        question: question,
        answer: inputValue,
      },
      {
        onSuccess: () => {
          setInputValue('');
          const random = randomQuestion();
          setQuestion(dummyQuestion[random]);
          setAlert?.(<>캐릭터의 대사 한마디에 당신의 생명을 불어넣었습니다.</>, () => {
            taskTransform?.('경고', '');
          });
        },
      },
    );
  };

  return (
    <_.Container>
      <_.TopContainer>
        <_.TopInnerFirst>
          <_.TopInnerFirstBox>
            <_.TopInnerFirstP>
              {chatBotQuery.isLoading ? '로딩 중...' : `'${character}'가 되어 대답해줘!`}
            </_.TopInnerFirstP>
          </_.TopInnerFirstBox>
          <_.TopInnerFirstImg src={seori} />
        </_.TopInnerFirst>
        <_.TopInnerSecond>
          <_.TopInnerSecondP>{question}</_.TopInnerSecondP>
          <_.RefreshButton
            onClick={handleRefresh}
            onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
            onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
          >
            R
          </_.RefreshButton>
        </_.TopInnerSecond>
      </_.TopContainer>
      <_.BottomContainer>
        <_.InputForm onSubmit={handleSubmit}>
          <Inputs
            width="80%"
            fontSize="1rem"
            flex={false}
            value={inputValue}
            type="text"
            setValue={setInputValue}
            placeHold="캐릭터에 이입하여 답변해주세요!"
          ></Inputs>
          <_.BottomContainerSubmit
            onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
            onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
          >
            입력
          </_.BottomContainerSubmit>
        </_.InputForm>
      </_.BottomContainer>
    </_.Container>
  );
};

export default TeachingChatBot;
