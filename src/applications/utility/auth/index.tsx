import React, { useRef, useState } from 'react';
import * as _ from '@/applications/utility/auth/style.ts';
import Logo from '@/assets/windeath44.svg';
import Button from '@/applications/components/button';
import { useChangeKeyValidationy } from '@/api/auth/changeKeyValidation.ts';
interface Props {
  changeToLogIn: () => void;
  changeToEmailCheck: () => void;
}
const Auth = ({ changeToLogIn, changeToEmailCheck }: Props) => {
  const inputLength = 5;
  const [code, setCode] = useState<string[]>(Array(inputLength).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const mutationChangeTemporaryKey = useChangeKeyValidationy();
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
    e.preventDefault();
    const authorizationCode = code.join('');
    mutationChangeTemporaryKey.mutate(
      { authorizationCode },
      {
        onSuccess: () => {
          changeToLogIn();
        },
      },
    );
  };
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
          <Button
            onClick={handleSubmit}
            props="확인"
          />
          <Button
            onClick={changeToEmailCheck}
            props="뒤로가기"
          />
        </_.tempButtonsStyle>
      </_.tempMainStyle>
    </_.tempMain>
  );
};

export default Auth;
