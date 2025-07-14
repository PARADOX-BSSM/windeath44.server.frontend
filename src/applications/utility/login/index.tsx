import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import Button from '@/applications/components/button';
import Inputs from '@/applications/components/inputs';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useLogIn } from '@/api/auth/logIn';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import MemorialBtn from '@/applications/components/memorialBtn';
type Props = {
  setIsLogIned: (arg0: boolean) => void;
  changeToSignUp: () => void;
  changeToEmailCheck: () => void;
};
const LogIn = ({ setIsLogIned, changeToSignUp, changeToEmailCheck }: Props) => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const logInMutation = useLogIn();
  const taskTransform = useAtomValue(taskTransformerAtom);
  const inputList = [
    {
      label: '이메일:',
      value: userId,
      setValue: setUserId,
      type: 'text',
      width: '80%',
      fontSize: '0.8rem',
    },
    {
      label: '비밀번호:',
      value: password,
      setValue: setPassword,
      type: 'password',
      width: '80%',
      fontSize: '0.8rem',
    },
  ];
  const checkLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = userId.split('@')[0];
    logInMutation.mutate(
      { id, password },
      {
        onSuccess: () => {
          setIsLogIned(true);
          taskTransform?.('LogIn', '');
        },
      },
    );
  };

  const buttonWidth = 11.5;
  const buttonHeight = 4.4;
  const buttonFontSize = '0.85rem';
  return (
    <_.tempMain>
      <_.tempImage>
        <img
          src={Logo}
          alt=""
        />
      </_.tempImage>
      <_.tempBulk />
      <_.tempMainStyle>
        <_.tempInputs>
          {inputList.map((item, index) => (
            <Inputs
              key={index}
              {...item}
              flex={true}
            />
          ))}
        </_.tempInputs>
        <_.tempButtons>
          <MemorialBtn
            name="확인"
            onClick={checkLogIn}
            type="submit"
            widthPercent={buttonWidth}
            heightPercent={buttonHeight}
            fontSize={buttonFontSize}
            active={true}
          />
          <MemorialBtn
            name="취소"
            onClick={() => {
              setIsLogIned(true);
              taskTransform?.('LogIn', '');
            }}
            type="submit"
            widthPercent={buttonWidth}
            heightPercent={buttonHeight}
            fontSize={buttonFontSize}
            active={true}
          />
          <MemorialBtn
            name="비밀번호 찾기"
            onClick={() => changeToEmailCheck()}
            type="submit"
            widthPercent={buttonWidth}
            heightPercent={buttonHeight}
            fontSize={buttonFontSize}
            active={true}
          />
          <MemorialBtn
            name="회원가입"
            onClick={() => changeToSignUp()}
            type="submit"
            widthPercent={buttonWidth}
            heightPercent={buttonHeight}
            fontSize={buttonFontSize}
            active={true}
          />
        </_.tempButtons>
      </_.tempMainStyle>
    </_.tempMain>
  );
};
export default LogIn;
