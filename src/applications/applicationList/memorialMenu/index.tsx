import { Suspense, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import MemorialBtn from '@/applications/components/memorialBtn';
import * as _ from './style.ts';
import { taskSearchAtom } from '@/atoms/taskTransformer.ts';
import { alerterAtom } from '@/atoms/alerter.ts';
import Choten from '@/assets/profile/choten.svg';
import { useProcessManager } from '@/hooks/processManager.tsx';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const btnList = ['추모관 검색', '즐겨찾기', '추모관 신청'];

const MemorialMenu = ({ stack, push, pop, top }: dataStructureProps) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [description, setDescription] = useState<JSX.Element | null>(
    <>
      최애의 사인은 작품 내에서 사망한 애니메이션 캐릭터를 추모하는 공간입니다.
      <br />
      <br />
      오른쪽의 버튼을 눌러 계속 진행할 수 있습니다.
    </>,
  );

  const setAlert = useAtomValue(alerterAtom);
  const taskSearch = useAtomValue(taskSearchAtom);
  const [, addTask, removeTask] = useProcessManager();

  const memorialPreview = taskSearch?.('미리보기')!;

  useEffect(() => {
    if (selectedIdx === 0) {
      setDescription(
        <>
          "추모관 검색"에서 다양한 캐릭터의 추모관을 찾아볼 수 있습니다.
          <br />
          <br />
          <span style={{ fontSize: '0.9rem' }}>
            * 추모관에서 다른 사람들과 함께 캐릭터에 대한 기억을 나눠볼 수 있습니다.
          </span>
        </>,
      );
    }
    if (selectedIdx === 1) {
      setDescription(
        <>
          "즐겨찾기"에서 이전에 즐겨찾기에 등록해놓은 추모관을 볼 수 있습니다.
          <br />
          <br />
          <span style={{ fontSize: '0.9rem' }}>
            * 추모관을 즐겨찾기에 등록하여 편리하게 이동할 수 있습니다.
          </span>
        </>,
      );
    }
    if (selectedIdx === 2) {
      setDescription(
        <>
          "추모관 신청"에서 최애의 사인에 존재하지 않는 추모관을 신청할 수 있습니다.
          <br />
          <br />
          <span style={{ fontSize: '0.9rem' }}>
            * 추모관 신청은 주로 1~2일 내에 받아들여집니다.
          </span>
        </>,
      );
    }
  }, [selectedIdx]);

  const moveTo = (idx: number | null) => {
    if (idx === 0) {
      console.log(taskSearch?.('Search', stack, push, pop, top));
      push(taskSearch?.('Search', stack, push, pop, top));
    }
    if (idx === 1) {
      push(taskSearch?.('memorial', stack, push, pop, top));
    }
    if (idx === 2) {
      if (setAlert) {
        setAlert(
          Choten,
          <>
            알림
            <br />
            최애의 사인에 부적합하다고 판단되는 추모관은
            <br />
            거절될 수 있습니다.
          </>,
          () => {
            push(taskSearch?.('MemorialApply', stack, push, pop, top));
            removeTask(taskSearch?.('경고')!);
            addTask(memorialPreview);
          },
        );
      }
    }
  };

  return (
    <_.Container>
      <_.InnerContainer>
        <_.TextContainer>
          <_.Title>최애의 사인</_.Title>
          <_.Version>ver 0.0.1</_.Version>
        </_.TextContainer>
        <_.MainContainer>
          <_.DescriptionBox>
            <_.Description>{description}</_.Description>
          </_.DescriptionBox>
          <_.BtnWrapper>
            <_.BtnInnerWrapper>
              {btnList.map((name, idx) => (
                <MemorialBtn
                  key={name}
                  name={name}
                  selected={selectedIdx === idx}
                  onClick={() => setSelectedIdx(idx)}
                  type="menu"
                  fontSize="1.25rem"
                  width="11.25rem"
                  height="2.625rem"
                />
              ))}
            </_.BtnInnerWrapper>
            <_.BtnVoid />
          </_.BtnWrapper>
        </_.MainContainer>
        <_.Footer>
          <MemorialBtn
            name="입장하기"
            type="submit"
            active={selectedIdx !== null}
            onClick={() => {
              moveTo(selectedIdx);
            }}
            fontSize="1.25rem"
            width="11.25rem"
            height="2.625rem"
          />
        </_.Footer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default MemorialMenu;
