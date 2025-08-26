import * as _ from './style.ts';
import Inputs from '@/applications/components/inputs';
import { useState } from 'react';
import { data } from './data.ts';

const ChatbotSelect = () => {
  const [inputs, setInputs] = useState<string>('');

  return (
    <_.Container>
      <_.TopContainer>
        {data?.map((item) => (
          <_.TopContainerItem>
            <_.TopContainerItemInfo>
              <_.TopContainerItemImage
                src={item.img}
                alt={`${item.name}의 사진`}
              />
              <_.TopContainerItemText>
                <_.TopContainerItemTitle>{item.name}</_.TopContainerItemTitle>
                <_.TopContainerItemDesc>{item.descript}</_.TopContainerItemDesc>
              </_.TopContainerItemText>
            </_.TopContainerItemInfo>
            <_.TopContainerSubmit>학습</_.TopContainerSubmit>
          </_.TopContainerItem>
        ))}
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
        <_.BottomContainerSubmit>입장</_.BottomContainerSubmit>
      </_.BottomContainer>
    </_.Container>
  );
};
export default ChatbotSelect;
