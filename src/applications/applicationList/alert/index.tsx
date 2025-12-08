import * as _ from './style.ts';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { focusAtom } from '@/atoms/windowManager.ts';
import { useEffect } from 'react';
import seori from '@/assets/sulkkagi/black_stone.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { alertOpenAtom } from '@/atoms/alerter';

interface AlertProps {
  text: JSX.Element;
  onClick: () => any;
  onCancel?: () => void;
}

const Alert = ({ text, onClick, onCancel }: AlertProps) => {
  const [, setFocus] = useAtom(focusAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlertOpen = useSetAtom(alertOpenAtom);

  useEffect(() => {
    setAlertOpen(true);
    setFocus('');
    return () => {
      setAlertOpen(false);
      setFocus('Observer');
    };
  }, [setAlertOpen, setFocus]);

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    taskTransform?.('경고', '');
  };

  return (
    <>
      <_.overlay />
      <_.main>
        <_.container>
          <_.place>
            <_.icon
              src={seori}
              alt="아이콘"
            ></_.icon>
            <_.text>{text}</_.text>
          </_.place>
          <_.btnContainer>
            <MemorialBtn
              name={'확인'}
              type="submit"
              active={true}
              onClick={onClick}
              width="144px"
              height="42px"
              fontSize="20px"
            ></MemorialBtn>
            <MemorialBtn
              name={'취소'}
              type="submit"
              active={true}
              onClick={handleCancel}
              width="144px"
              height="42px"
              fontSize="20px"
            ></MemorialBtn>
          </_.btnContainer>
        </_.container>
      </_.main>
    </>
  );
};
export default Alert;
