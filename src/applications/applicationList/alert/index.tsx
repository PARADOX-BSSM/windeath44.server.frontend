import * as _ from './style.ts';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useAtom } from 'jotai';
import { focusAtom } from '@/atoms/windowManager.ts';
import { useEffect } from 'react';
import seori from '@/assets/sulkkagi/black_stone.svg';

interface AlertProps {
  text: JSX.Element;
  onClick: () => any;
}

const Alert = ({ text, onClick }: AlertProps) => {
  const [, setFocus] = useAtom(focusAtom);
  useEffect(() => {
    setFocus('');
    return () => {
      setFocus('Observer');
    };
  }, [setFocus]);
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
          </_.btnContainer>
        </_.container>
      </_.main>
    </>
  );
};
export default Alert;
