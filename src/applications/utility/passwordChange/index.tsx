
import Logo from '@/assets/windeath44.svg';
import Inputs from '@/applications/components/inputs';
import React, { useState } from 'react';
import { useResetPassword } from '@/api/user/resetUserPassword.ts';
import MemorialBtn from '@/applications/components/memorialBtn';
interface Props {
  changeToLogIn: () => void;
}
const PasswordChange = ({ changeToLogIn }: Props) => {
  const [password, setPassword] = useState<string>('');
  const [checkingPw, setCheckingPw] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const mutateResetPassword = useResetPassword();
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password || !checkingPw) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== checkingPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    mutateResetPassword.mutate(
      { email, password },
      {
        onSuccess: () => {
          changeToLogIn();
        },
      },
    );
  };

  const buttonWidth = "144px";
  const buttonHeight = "42px";
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
            label={'이메일:'}
            value={email}
            setValue={setEmail}
            type={'text'}
            width={'80%'}
            fontSize='20px'
            flex={true}
          />
          <Inputs
            label={'비밀번호:'}
            value={password}
            setValue={setPassword}
            type={'password'}
            width={'80%'}
            fontSize='20px'
            flex={true}
          />
          <Inputs
            label={'비밀번호 재입력:'}
            value={checkingPw}
            setValue={setCheckingPw}
            type={'password'}
            width={'75%'}
            fontSize='20px'
            flex={true}
          />
        </_.tempInputsStyle>
        <_.tempButtonsStyle>
          <MemorialBtn
            name={mutateResetPassword.isPending ? '처리중...' : '확인'}
            onClick={handleSubmit}
            type="submit"
            width={buttonWidth}
            height={buttonHeight}
            fontSize={buttonFontSize}
            active={true}
          />
        </_.tempButtonsStyle>
      </_.tempMainStyle>
    </_.tempMain>
  );
};
export default PasswordChange;
