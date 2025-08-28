import * as _ from './style.ts';
import Inputs from '@/applications/components/inputs';
import { useState } from 'react';
import { data } from './data.ts';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { useAtomValue } from 'jotai';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg.tsx';

const ChatbotSelect = () => {
  const [inputs, setInputs] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const taskTransform = useAtomValue(taskTransformerAtom);

  return (
    <_.Container>
      <_.TopContainer>
        {data?.map((item) => (
          <_.TopContainerItem
            key={item.id}
            $isSelected={selectedItem === item.id}
            onClick={() => {
              setSelectedItem(item.id);
            }}
            onMouseEnter={() => {
              setCursorImage(CURSOR_IMAGES.hand);
            }}
            onMouseLeave={() => {
              setCursorImage(CURSOR_IMAGES.default);
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
        <_.BottomContainerSubmit
          disabled={selectedItem === null}
          onClick={(e) => {
            e.stopPropagation();
            if (selectedItem !== null) {
              taskTransform?.('분신사바', '챗봇 학습');
            }
          }}
        >
          학습
        </_.BottomContainerSubmit>
        <_.BottomContainerSubmit
          disabled={selectedItem === null}
          onClick={() => {
            if (selectedItem !== null) {
              taskTransform?.('분신사바', '분신사바 메인');
            }
          }}
        >
          입장
        </_.BottomContainerSubmit>
      </_.BottomContainer>
    </_.Container>
  );
};
export default ChatbotSelect;
