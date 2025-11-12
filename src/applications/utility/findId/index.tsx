import { useState } from 'react';
import * as _ from './style.ts';
import Logo from '@/assets/windeath44.svg';
import Inputs from '@/applications/components/inputs';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useSendUserId } from '@/api/auth/sendUserId.ts';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import Loading from '@/applications/components/loading';

interface Props {
  changeToLogIn: () => void;
}

const FindId = ({ changeToLogIn }: Props) => {
  const [email, setEmail] = useState('');
  const mutationSendUserId = useSendUserId();
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);

  const checkEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.length === 0) {
      setAlert?.(Seori, <>이메일을 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlert?.(
        Seori,
        <>
          이메일 형식이 잘못되었습니다.
          <br />
          다시 입력해 주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    }
    mutationSendUserId.mutate(
      { email },
      {
        onSuccess: () => {
          changeToLogIn();
          setAlert?.(
            Seori,
            <>
              입력하신 이메일로 아이디를 발송했습니다.
              <br />
              이메일함을 확인해 주세요.
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
        },
        onError: () => {
          setAlert?.(
            Seori,
            <>
              이메일 전송에 실패했습니다.
              <br />
              다시 시도해 주세요.
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
        },
      },
    );
  };

  const buttonWidth = '144px';
  const buttonHeight = '42px';
  const buttonFontSize = '20px';

  if (mutationSendUserId.isPending) {
    return <Loading />;
  }
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
            placeHold={'example@email.com'}
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
export default FindId;
