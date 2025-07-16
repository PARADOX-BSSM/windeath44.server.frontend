import { useState } from 'react';
import * as _ from '@/applications/utility/emailCheck/style.ts';
import Logo from '@/assets/windeath44.svg';
import Inputs from '@/applications/components/inputs';
import { useChangeTemporaryKey } from '@/api/auth/changetemporaryKey.ts';
import MemorialBtn from '@/applications/components/memorialBtn';

interface Props {
  changeToLogIn: () => void;
  changeToAuth: () => void;
}

const EmailChack = ({ changeToLogIn, changeToAuth }: Props) => {
  const [email, setEmail] = useState('');
  const mutationChangeKey = useChangeTemporaryKey();
  const checkEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutationChangeKey.mutate(
      { email },
      {
        onSuccess: () => {
          changeToAuth();
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
      <_.tempBulkStyle />
      <_.tempMainStyle>
        <_.tempInputsStyle>
          <Inputs
            label={'이메일:'}
            width="80%"
            fontSize="0.9rem"
            value={email}
            setValue={setEmail}
            type={'text'}
            flex={true}
          />
        </_.tempInputsStyle>
        <_.tempButtonsStyle>
          <MemorialBtn
            name="확인"
            onClick={checkEmail}
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
export default EmailChack;
