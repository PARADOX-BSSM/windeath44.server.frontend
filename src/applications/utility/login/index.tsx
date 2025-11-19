import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import Inputs from '@/applications/components/inputs';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { useLogIn } from '@/api/auth/logIn';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import MemorialBtn from '@/applications/components/memorialBtn';
import { isLogInedAtom } from '@/atoms/windowManager';
import { alerterAtom } from '@/atoms/alerter';
import { AxiosError } from 'axios';
import Loading from '@/applications/components/loading';
type Props = {
  changeToSignUp: () => void;
  changeToEmailCheck: () => void;
  changeToFindId: () => void;
};
const LogIn = ({ changeToSignUp, changeToEmailCheck , changeToFindId}: Props) => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const logInMutation = useLogIn();
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);

  const setAlert = useAtomValue(alerterAtom);

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
    if (id.length === 0) {
      setAlert?.(<>아이디를 입력하지 않았습니다.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }
    if (password.length === 0) {
      setAlert?.(<>비밀번호를 입력하지 않았습니다.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }
    logInMutation.mutate(
      { id, password },
      {
        onSuccess: () => {
          // console.log('로그인 성공 토큰 :', token);
          setIsLogIned('true');
          taskTransform?.('로그인', '');
          window.location.reload();
        },
        onError: (error) => {
          console.error('로그인 실패', error);
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            if (axiosError.response.status === 404) {
              setAlert?.(
                <>
                  로그인에 실패했습니다.
                  <br />
                  아이디와 비밀번호를 확인해주세요.
                </>,
                () => {
                  taskTransform?.('경고', '');
                },
              );
            } else {
              setAlert?.(
                <>
                  로그인에 실패했습니다.
                  <br />
                  잠시 후 다시 시도해주세요.
                </>,
                () => {
                  taskTransform?.('경고', '');
                },
              );
            }
          } else {
            setAlert?.(
              <>
                로그인에 실패했습니다.
                <br />
                잠시 후 다시 시도해주세요.
              </>,
              () => {
                taskTransform?.('경고', '');
              },
            );
          }
        },
      },
    );
  };

  const buttonWidth = '144px';
  const buttonHeight = '42px';
  const buttonFontSize = '20px';
  return (
    <_.tempMain>
      {logInMutation.isPending && (
        <Loading
          text="로그인 중..."
          overlay={true}
        />
      )}
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
            name="손님으로 입장"
            onClick={() => {
              setIsLogIned('true');
              taskTransform?.('로그인', '');
            }}
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
          <MemorialBtn
            name="아이디 찾기"
            onClick={() => changeToFindId()}
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
            name="로그인"
            onClick={checkLogIn}
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
