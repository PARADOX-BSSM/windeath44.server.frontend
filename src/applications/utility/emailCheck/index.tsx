import { useState } from 'react';
import * as _ from '@/applications/utility/emailCheck/style.ts';
import Logo from '@/assets/windeath44.svg';
import Choten from '@/assets/profile/choten.svg';
import Inputs from '@/applications/components/inputs';
import { useChangeTemporaryKey } from '@/api/auth/changetemporaryKey.ts';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';

interface Props {
  changeToLogIn: () => void;
  changeToAuth: () => void;
}

const EmailChack = ({ changeToLogIn, changeToAuth }: Props) => {
  const [email, setEmail] = useState('');
  const mutationChangeKey = useChangeTemporaryKey();

  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);

  const checkEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (email.length === 0) {
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

  const buttonWidth = '144px';
  const buttonHeight = '42px';
  const buttonFontSize = '20px';

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
            fontSize="20px"
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
export default EmailChack;
