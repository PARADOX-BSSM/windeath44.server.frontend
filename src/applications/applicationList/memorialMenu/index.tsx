import { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import MemorialBtn from '@/applications/components/memorialBtn';
import * as _ from './style.ts';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { versionAtom } from '@/atoms/version.ts';
import { alerterAtom } from '@/atoms/alerter.ts';
import { focusAtom } from '@/atoms/windowManager.ts';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import { getCookie } from '@/api/auth/cookie.ts';
// import { useProcessManager } from '@/hooks/processManager.tsx';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const btnList = ['추모관 신청', '추모관 신청 목록', ''];

const MemorialMenu = ({ stack, push, pop, top }: dataStructureProps) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [description, setDescription] = useState<JSX.Element | null>(
    <>
      최애의 사인(死因)은 작품 내에서 사망한 애니메이션 캐릭터를 추모하는 공간입니다.
      <br />
      <br />
      오른쪽의 버튼을 눌러 계속 진행할 수 있습니다.
    </>,
  );

  const setAlert = useAtomValue(alerterAtom);
  const taskSearch = useAtomValue(taskSearchAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const version = useAtomValue(versionAtom);
  const [, setFocus] = useAtom(focusAtom);
  const token = getCookie('access_token');
  // const [, addTask, removeTask] = useProcessManager();

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

  // const memorialPreview = taskSearch?.('미리보기')!;

  useEffect(() => {
    if (selectedIdx === 0) {
      setDescription(
        <>
          "추모관 신청"에서 최애의 사인(死因)에 존재하지 않는 추모관을 신청할 수 있습니다.
          <br />
          <br />
          <div style={{ fontSize: '1.375rem' }}>
            <div style={{ margin: '0 0 16px 0' }}>
              * 추모관 신청은 캐릭터의 사망이 공식적으로 확인된 경우에만 가능합니다.
            </div>
            <div style={{ margin: '0 0 16px 0' }}>* 추모관 신청은 주로 1~2일 내에 확인됩니다.</div>
          </div>
        </>,
      );
    }
    if (selectedIdx === 1) {
      setDescription(
        <>
          "추모관 신청 목록"에서 다른 사용자들이 신청한 추모관을 확인할 수 있습니다.
          <br />
          <br />
          <div style={{ fontSize: '1.375rem' }}>
            <div style={{ margin: '0 0 16px 0' }}>
              * 마음에 드는 추모관에 좋아요를 누르면 승인될 확률이 높아집니다.
            </div>
          </div>
        </>,
      );
    }
    if (selectedIdx === 2) {
      setDescription(
        <>
          추후 업데이트 될 기능입니다.
          <br />
          <br />
          <div style={{ fontSize: '1.375rem' }}>
            <div style={{ margin: '0 0 16px 0' }}></div>
            <div style={{ margin: '0 0 16px 0' }}></div>
          </div>
        </>,
      );
    }
  }, [selectedIdx]);

  const moveTo = (idx: number | null) => {
    if (idx === 0) {
      if (!token && setAlert) {
        setAlert(<>게스트는 추모관 신청이 불가합니다.</>, () => {
          taskTransform?.('경고', '');
        });
      } else if (setAlert) {
        setAlert(
          <>
            최애의 사인(死因)에 부적합하다고 판단되는 추모관은
            <br />
            거절될 수 있습니다.
          </>,
          () => {
            taskTransform?.('경고', '미리보기', applyProps);
            push(taskSearch?.('MemorialApply', applyProps));
            setTimeout(() => {
              setFocus('추모관');
            }, 150);
          },
        );
      }
    }
    if (idx === 1) {
      push(taskSearch?.('memorialApplicationListMain', applyProps));
    }
    if (idx === 2) {
    }
  };

  return (
    <_.Container>
      <_.InnerContainer>
        <_.TextContainer>
          <_.Title>최애의 사인(死因)</_.Title>
          <_.Version>ver {version}</_.Version>
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
