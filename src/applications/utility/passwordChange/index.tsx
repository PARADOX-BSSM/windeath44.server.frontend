import Button from '@/applications/components/button';
import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import Inputs from '@/applications/components/inputs';
import { useState } from 'react';
interface Props {
  changeToLogIn: () => void;
}
const PasswordChange = ({ changeToLogIn }: Props) => {
  const [pw, setPw] = useState<string>('');
  const [checkingPw, setCheckingPw] = useState<string>('');
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
            label={'비밀번호:'}
            value={pw}
            setValue={setPw}
            type={'password'}
            width={'70%'}
            flex={true}
          />
          <Inputs
            label={'비밀번호 재입력:'}
            value={checkingPw}
            setValue={setCheckingPw}
            type={'password'}
            width={'70%'}
            flex={true}
          />
        </_.tempInputsStyle>
        <_.tempButtonsStyle>
          <Button
            onClick={changeToLogIn}
            props="확인"
          />
        </_.tempButtonsStyle>
      </_.tempMainStyle>
    </_.tempMain>
  );
};
export default PasswordChange;
