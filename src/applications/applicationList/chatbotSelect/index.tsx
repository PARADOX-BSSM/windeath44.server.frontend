import * as _ from './style.ts';
import Inputs from '@/applications/components/inputs';
import { useState } from 'react';
import { data } from './data.ts';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { useAtomValue } from 'jotai';

const ChatbotSelect = () => {
  const [inputs, setInputs] = useState<string>('');
  const taskTransform = useAtomValue(taskTransformerAtom);

  return (
    <_.Container>
      <_.TopContainer>
        {data?.map((item) => (
          <_.TopContainerItem
            key={item.id}
            onClick={() => {
              // console.log('클릭됨');
              taskTransform?.('분신사바', '분신사바 메인');
            }}
          >
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
            <_.TopContainerSubmit
              onClick={(e) => {
                e.stopPropagation();
                taskTransform?.('분신사바', '챗봇 학습');
              }}
            >
              학습
            </_.TopContainerSubmit>
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
