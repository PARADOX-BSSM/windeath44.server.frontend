import React, { useRef, useState } from 'react';
import * as _ from '@/applications/utility/auth/style.ts';
import Logo from '@/assets/windeath44.svg';
import Choten from '@/assets/profile/choten.svg';
import { useChangeKeyValidation } from '@/api/auth/changeKeyValidation.ts';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
interface Props {
  changeToPassword: () => void;
  changeToEmailCheck: () => void;
}
const Auth = ({ changeToPassword, changeToEmailCheck }: Props) => {
  const inputLength = 5;
  const [code, setCode] = useState<string[]>(Array(inputLength).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const mutationChangeKeyValidation = useChangeKeyValidation();

  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);

  const handleChange = (value: string, index: number) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return; // 숫자 & 알파벳만 허용
    const newCode = [...code];
    newCode[index] = value.toLowerCase();
    setCode(newCode);
    // 다음 칸으로 이동
    if (value && index < inputLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (code.length < inputLength) {
      setAlert?.(
        Choten,
        <>
          인증코드가 잘못되었습니다.
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
    const authorizationCode = code.join('');
    mutationChangeKeyValidation.mutate(
      { authorizationCode },
      {
        onSuccess: () => {
          changeToPassword();
        },
      },
    );
  };

  const buttonWidth = '144px';
  const buttonHeight = '42px';
  const buttonFontSize = '20px';

  return (
    <_.tempMain>
      <_.tempImageStyle>
        <img
          src={Logo}
          alt=""
        />
      </_.tempImageStyle>
      <_.tempBulkStyle />
      <_.tempMainStyle>
        <_.tempInputsStyle>
          <_.inputs>
            <label htmlFor="code">인증코드 :</label>
            <_.inputStyle>
              {code.map((char, idx) => (
                <_.outside key={idx}>
                  <_.inside
                    type="text"
                    maxLength={1}
                    value={char}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    ref={(el) => (inputRefs.current[idx] = el)}
                  />
                </_.outside>
              ))}
            </_.inputStyle>
          </_.inputs>
        </_.tempInputsStyle>
        <_.note>* 숫자 및 알파벳만 입력가능합니다.</_.note>
        <_.tempButtonsStyle>
          <MemorialBtn
            name="확인"
            onClick={handleSubmit}
            type="submit"
            active={true}
            width={buttonWidth}
            height={buttonHeight}
            fontSize={buttonFontSize}
          />
          <MemorialBtn
            name="취소"
            onClick={changeToEmailCheck}
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

export default Auth;
