import * as _ from './style';
import seori from '@/assets/seori/seori_mini.png';
import Inputs from '@/applications/components/inputs';
import { useEffect, useState } from 'react';
import { dummyQuestion } from './data';

const TeachingChatBot = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [character] = useState<string>('호시노 아이');

  useEffect(() => {
    const random = Math.floor(Math.random() * dummyQuestion.length);
    setQuestion(dummyQuestion[random]);
  }, []);

  return (
    <_.Container>
      <_.TopContainer>
        <_.TopInnerFirst>
          <_.TopInnerFirstBox>
            <_.TopInnerFirstP>'{character}’가 되어 대답해줘!</_.TopInnerFirstP>
          </_.TopInnerFirstBox>
          <_.TopInnerFirstImg src={seori} />
        </_.TopInnerFirst>
        <_.TopInnerSecond>
          <_.TopInnerSecondP>{question}</_.TopInnerSecondP>
        </_.TopInnerSecond>
      </_.TopContainer>
      <_.BottomContainer>
        <Inputs
          width="80%"
          fontSize="1rem"
          flex={false}
          value={inputValue}
          type="text"
          setValue={setInputValue}
          placeHold="캐릭터에 이입하여 답변해주세요!"
        ></Inputs>
        <_.BottomContainerSubmit>입력</_.BottomContainerSubmit>
      </_.BottomContainer>
    </_.Container>
  );
};

export default TeachingChatBot;
