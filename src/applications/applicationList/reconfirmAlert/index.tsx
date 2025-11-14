import * as _ from './style.ts';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useAtom, useAtomValue } from 'jotai';
import { focusAtom } from '@/atoms/windowManager.ts';
import { useEffect, useState } from 'react';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import Inputs from '@/applications/components/inputs';

interface ReconfirmAlertProps {
  icon: string;
  text: JSX.Element;
  confirmText: string;
  onClick: () => any;
}

const ReconfirmAlert = ({ icon, confirmText, onClick }: ReconfirmAlertProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [confirm, setConfirm] = useState<string>('');
  const [discord, setDiscord] = useState<boolean>(false);
  const [, setFocus] = useAtom(focusAtom);
  useEffect(() => {
    setFocus('');
    return () => {
      setFocus('Observer');
    };
  }, [setFocus]);
  const handleOff = () => {
    taskTransform?.('재확인', '');
  };
  const handleConfirm = () => {
    if (confirm !== confirmText) {
      setDiscord(true);
      return;
    }
    setDiscord(false);
    onClick();
  };
  return (
    <>
      <_.overlay />
      <_.main>
        <_.container>
          <_.place>
            <_.icon
              src={icon}
              alt="아이콘"
            ></_.icon>
            <_.inputSet>
              <_.text>{`계속하려면 아래에 "${confirmText}"를 입력해주세요.`}</_.text>
              <Inputs
                value={confirm}
                type="text"
                setValue={setConfirm}
                flex={true}
                width={'100%'}
              />
              {discord && <_.alert>잘못된 단어를 입력하셨습니다.</_.alert>}
            </_.inputSet>
          </_.place>

          <_.btnContainer>
            <MemorialBtn
              name={'확인'}
              type="submit"
              active={true}
              onClick={handleConfirm}
              width="144px"
              height="42px"
              fontSize="20px"
            />
            <MemorialBtn
              name={'취소'}
              type="submit"
              active={true}
              onClick={handleOff}
              width="144px"
              height="42px"
              fontSize="20px"
            />
          </_.btnContainer>
        </_.container>
      </_.main>
    </>
  );
};
export default ReconfirmAlert;
