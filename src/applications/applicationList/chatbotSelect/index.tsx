import * as _ from './style.ts';
import Inputs from '@/applications/components/inputs';
import { useState } from 'react';

const ChatbotSelect = () => {
  const [inputs, setInputs] = useState<string>('');

  return (
    <_.Container>
      <_.TopContainer></_.TopContainer>
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
        <_.BottomContainerSubmit>입장</_.BottomContainerSubmit>
      </_.BottomContainer>
    </_.Container>
  );
};
export default ChatbotSelect;
