import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import Inputs from '@/applications/components/inputs';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useLogIn } from '@/api/auth/logIn';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import MemorialBtn from '@/applications/components/memorialBtn';
import { isLogInedAtom } from '@/atoms/windowManager';
type Props = {
  changeToSignUp: () => void;
  changeToEmailCheck: () => void;
};
const LogIn = ({ changeToSignUp, changeToEmailCheck }: Props) => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const logInMutation = useLogIn();
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);
  const inputList = [
    {
      label: '아이디:',
      value: userId,
      setValue: setUserId,
      type: 'text',
      width: '80%',
      fontSize: '20px',
    },
    {
      label: '비밀번호:',
      value: password,
      setValue: setPassword,
      type: 'password',
      width: '80%',
      fontSize: '20px',
    },
  ];
  const checkLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = userId;
    logInMutation.mutate(
      { id, password },
      {
        onSuccess: (token) => {
          console.log('로그인 성공 토큰 :', token);
          setIsLogIned('true');
          taskTransform?.('LogIn', '');
        },
        onError: (error) => {
          console.error('로그인 실패', error);
        },
      },
    );
  };

  useEffect(() => {
    localStorage.setItem('isLogIned', isLogIned);
  }, [isLogIned]);

  const buttonWidth = "144px";
  const buttonHeight = "42px";
  const buttonFontSize = '20px';
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
            width={buttonWidth}
            height={buttonHeight}
            fontSize={buttonFontSize}
            active={true}
          />
          <MemorialBtn
            name="취소"
            onClick={() => {
              setIsLogIned('guest');
              taskTransform?.('LogIn', '');
            }}
            type="submit"
            width={buttonWidth}
            height={buttonHeight}
            fontSize={buttonFontSize}
            active={true}
          />
          <MemorialBtn
            name="비밀번호 찾기"
            onClick={() => changeToEmailCheck()}
            type="submit"
            width={buttonWidth}
            height={buttonHeight}
            fontSize={buttonFontSize}
            active={true}
          />
          <MemorialBtn
            name="회원가입"
            onClick={() => changeToSignUp()}
            type="submit"
            width={buttonWidth}
            height={buttonHeight}
            fontSize={buttonFontSize}
            active={true}
          />
        </_.tempButtons>
      </_.tempMainStyle>
    </_.tempMain>
  );
};
export default LogIn;
