import * as _ from './style.ts';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useAtom, useAtomValue } from 'jotai';
import { focusAtom } from '@/atoms/windowManager.ts';
import { useEffect, useState } from 'react';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';

interface ReconfirmAlertProps {
  icon: string;
  text: JSX.Element;
  confirmText: string;
  onClick: () => any;
}

const ReconfirmAlert = ({ icon, confirmText, onClick }: ReconfirmAlertProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [confirm, setConfirm] = useState<string>();
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
          </_.place>
          <div>{`계속하려면 아래에 "${confirmText}"를 입력해주세요.`}</div>
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {discord && <div>잘못된 단어를 입력하셨습니다.</div>}
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
