import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import Choten from '@/assets/profile/choten.svg';
import { useEffect, useState } from 'react';
import Inputs from '@/applications/components/inputs';
import { useSignUp } from '@/api/user/signUp.ts';
import { useEmailValidation } from '@/api/auth/emailValidationRequest.ts';
import { useVerifyEmail } from '@/api/auth/verifyEmailCode.ts';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
type Props = {
  changeToLogIn: () => void;
};
const SignUp = ({ changeToLogIn }: Props) => {
  const [name, setName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [checkingPw, setCheckingPw] = useState<string>('');
  const [check, setCheck] = useState<string>('');
  const [click, setClick] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);

  const signUpMutation = useSignUp();
  const emailValidationMutation = useEmailValidation();
  const verifyEmailMutation = useVerifyEmail();

  const sendAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (name.length == 0) {
      setAlert?.(
        Choten,
        <>
          사용자 이름이 잘못되었습니다.
          <br />
          다시 입력해 주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    }
    if (userId.length == 0) {
      setAlert?.(
        Choten,
        <>
          아이디가 잘못되었습니다.
          <br />
          다시 입력해 주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    }
    if (email.length == 0 || !email.includes('@')) {
      setAlert?.(
        Choten,
        <>
          이메일이 잘못되었습니다.
          <br />
          다시 입력해 주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    }
    if (pw !== checkingPw) {
      setAlert?.(
        Choten,
        <>
          비밀번호가 일치하지 않습니다.
          <br />
          다시 입력해 주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    }
    if (pw.length < 8 || pw.length > 20) {
      setAlert?.(
        Choten,
        <>
          비밀번호가 8~20자리가 아닙니다.
          <br />
          다시 입력해 주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    }
    signUpMutation.mutate({ name, userId, email, pw, changeToLogIn });
    e.preventDefault();
  };

  const sendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    emailValidationMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setClick(true);
          setTimeLeft(180);
        },
      },
    );
  };
  const verifyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (check.length == 5) {
      verifyEmailMutation.mutate({ email, check });
      setClick(false);
    } else {
      setAlert?.(Choten, <>인증코드 5자리를 입력하지 않았습니다.</>, () => {
        taskTransform?.('경고', '');
      });
    }
  };
  useEffect(() => {
    if (!click || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [click]);
  const formatTime = (seconds: number): string => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const buttonWidth = '144px';
  const buttonHeight = '42px';
  const buttonFontSize = '20px';

  return (
    <_.tempMain>
      <_.tempImage>
        <img
          src={Logo}
          alt="logo"
        />
      </_.tempImage>
      <_.tempBulkStyle />
      <_.tempMainStyle>
        <_.tempInputsStyle>
          <Inputs
            label={'사용자 이름:'}
            value={name}
            setValue={setName}
            type={'text'}
            width={'80%'}
            fontSize="20px"
            flex={true}
          />
          <Inputs
            label={'아이디:'}
            value={userId}
            setValue={setUserId}
            type={'text'}
            width={'80%'}
            fontSize="20px"
            flex={true}
          />
          <_.set>
            <_.label>이메일 :</_.label>
            <_.btnSet>
              <Inputs
                value={email}
                setValue={setEmail}
                type={'text'}
                width={'100%'}
              />
              <MemorialBtn
                name={click ? '코드 재전송' : '코드전송'}
                onClick={sendEmail}
                type="submit"
                active={true}
                height="34px"
                fontSize={'16px'}
              />
            </_.btnSet>
          </_.set>
          <_.set>
            <_.label>인증코드 :</_.label>
            <_.btnSet>
              <Inputs
                value={check}
                setValue={setCheck}
                type={'text'}
                width={'100%'}
              />
              <div style={{ fontSize: '0.75rem' }}>{formatTime(timeLeft)}</div>
              <MemorialBtn
                name="확인"
                onClick={verifyCode}
                type="submit"
                active={true}
                height="34px"
                fontSize={'16px'}
              />
            </_.btnSet>
          </_.set>
          <Inputs
            label={'비밀번호:'}
            value={pw}
            setValue={setPw}
            type={'password'}
            width={'80%'}
            fontSize="20px"
            flex={true}
          />
          <Inputs
            label={'비밀번호 재입력:'}
            value={checkingPw}
            setValue={setCheckingPw}
            type={'password'}
            width={'75%'}
            fontSize="20px"
            flex={true}
          />
        </_.tempInputsStyle>
        <_.tempButtonsStyle>
          <MemorialBtn
            name="확인"
            onClick={sendAuth}
            type="submit"
            active={true}
            width={buttonWidth}
            height={buttonHeight}
            fontSize={buttonFontSize}
          />
          <MemorialBtn
            name="취소"
            onClick={changeToLogIn}
            type="submit"
            active={true}
            width={buttonWidth}
            height={buttonHeight}
            fontSize={buttonFontSize}
          />
        </_.tempButtonsStyle>
      </_.tempMainStyle>
    </_.tempMain>
  );
};

export default SignUp;
