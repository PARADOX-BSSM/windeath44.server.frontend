import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import { useEffect, useState } from 'react';
import Inputs from '@/applications/components/inputs';
import { useSignUp } from '@/api/user/signUp.ts';
import { useEmailValidation } from '@/api/auth/emailValidationRequest.ts';
import { useVerifyEmail } from '@/api/auth/verifyEmailCode.ts';
import MemorialBtn from '@/applications/components/memorialBtn';
type Props = {
  changeToLogIn: () => void;
};
const SignUp = ({ changeToLogIn }: Props) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [checkingPw, setCheckingPw] = useState<string>('');
  const [check, setCheck] = useState<string>('');
  const [click, setClick] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const signUpMutation = useSignUp();
  const emailValidationMutation = useEmailValidation();
  const verifyEmailMutation = useVerifyEmail();
  const sendAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pw !== checkingPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (pw.length < 8 || pw.length > 20) {
      alert('비밀번호는 8~20 문자만 허용합니다.\n 다시 입력해 주세요!!');
      return;
    }
    signUpMutation.mutate({ name, email, pw, changeToLogIn });
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
      alert('인증코드 5자리를 입력하지 않았습니다.');
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

  const buttonWidth = 11.5;
  const buttonHeight = 4.4;
  const buttonFontSize = '0.85rem';

  return (
    <_.tempMain>
      <_.tempImageStyle>
        <img
          src={Logo}
          alt="logo"
        />
      </_.tempImageStyle>
      <_.tempBulkStyle />
      <_.tempMainStyle>
        <_.tempInputsStyle>
          <Inputs
            label={'사용자 이름:'}
            value={name}
            setValue={setName}
            type={'text'}
            width={'70%'}
            fontSize="0.9rem"
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
                widthPercent={17}
                heightPercent={buttonHeight}
                fontSize={buttonFontSize}
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
                widthPercent={15}
                heightPercent={buttonHeight}
                fontSize={buttonFontSize}
              />
            </_.btnSet>
          </_.set>
          <Inputs
            label={'비밀번호:'}
            value={pw}
            setValue={setPw}
            type={'password'}
            width={'70%'}
            fontSize="0.9rem"
            flex={true}
          />
          <Inputs
            label={'비밀번호 재입력:'}
            value={checkingPw}
            setValue={setCheckingPw}
            type={'password'}
            width={'70%'}
            fontSize="0.9rem"
            flex={true}
          />
        </_.tempInputsStyle>
        <_.tempButtonsStyle>
          <MemorialBtn
            name="확인"
            onClick={sendAuth}
            type="submit"
            active={true}
            widthPercent={buttonWidth}
            heightPercent={buttonHeight}
            fontSize={buttonFontSize}
          />
          <MemorialBtn
            name="취소"
            onClick={changeToLogIn}
            type="submit"
            active={true}
            widthPercent={buttonWidth}
            heightPercent={buttonHeight}
            fontSize={buttonFontSize}
          />
        </_.tempButtonsStyle>
      </_.tempMainStyle>
    </_.tempMain>
  );
};

export default SignUp;
