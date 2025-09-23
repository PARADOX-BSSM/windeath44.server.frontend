import { Suspense, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import MemorialBtn from '@/applications/components/memorialBtn';
import * as _ from './style.ts';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { alerterAtom } from '@/atoms/alerter.ts';
import Choten from '@/assets/profile/choten.svg';
import { useProcessManager } from '@/hooks/processManager.tsx';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const btnList = ['추모관 검색', '상주', '추모관 신청'];

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
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [, addTask, removeTask] = useProcessManager();

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };
  const applyProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  const memorialPreview = taskSearch?.('미리보기')!;

  useEffect(() => {
    if (selectedIdx === 0) {
      setDescription(
        <>
          "추모관 검색"에서 다양한 캐릭터의 추모관을 찾아볼 수 있습니다.
          <br />
          <br />
          <span style={{ fontSize: '1.375rem' }}>
            * 추모관에서 다른 사람들과 함께 캐릭터에 대한 기억을 나눠볼 수 있습니다.
          </span>
        </>,
      );
    }
    if (selectedIdx === 1) {
      setDescription(
        <>
          "상주"에서 자신이 상주인 추모관을 확인할 수 있습니다.
          <br />
          <br />
          <span style={{ fontSize: '1.375rem' }}>
            * 상주는 추모관에서 가장 활발히 활동하는 사람에게 주어집니다.
            <br />* 상주가 되면 추모관을 관리할 수 있는 권한이 주어집니다.
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
          <span style={{ fontSize: '1.375rem' }}>
            * 추모관 신청은 주로 1~2일 내에 받아들여집니다.
          </span>
        </>,
      );
    }
  }, [selectedIdx]);

  const moveTo = (idx: number | null) => {
    if (idx === 0) {
      console.log(taskSearch?.('Search', stackProps));
      push(taskSearch?.('Search', stackProps));
    }
    if (idx === 1) {
      push(taskSearch?.('상주 관리', stackProps));
    }
    if (idx === 2) {
      if (setAlert) {
        setAlert(
          Choten,
          <>
            최애의 사인에 부적합하다고 판단되는 내용은
            <br />
            거절될 수 있습니다.
          </>,
          () => {
            taskTransform?.('경고', '미리보기', applyProps);
            push(taskSearch?.('MemorialApply', applyProps));
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
