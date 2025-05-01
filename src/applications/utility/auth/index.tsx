import React, {useRef, useState} from "react";
import * as _ from "@/applications/utility/auth/style.ts";
import Logo from "@/assets/windeath44.svg";
import Button from "@/applications/components/button";

interface Props {
    changeToLogIn: () => void;
    changeToEmailCheck: () => void;
};

const Auth: React.FC = ({changeToLogIn,changeToEmailCheck}:Props) =>{
    const inputLength = 6;
    const [code, setCode] = useState<string[]>(Array(inputLength).fill(''));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^[a-zA-Z]?$/.test(value)) return; // 알파벳만 허용

        const newCode = [...code];
        newCode[index] = value.toUpperCase();
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

    const handleSubmit = () => {
        const finalCode = code.join('');
        console.log('인증 코드:', finalCode);
    };

    return (
        <_.tempMain>
            <_.tempImageStyle>
                <img src={Logo} alt="" />
            </_.tempImageStyle>
            <_.tempBulkStyle />
            <_.tempMainStyle>
                <_.tempInputsStyle>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <label htmlFor="code">인증코드 :</label>
                        {code.map((char, idx) => (
                            <input
                                key={idx}
                                type="text"
                                maxLength={1}
                                value={char}
                                onChange={(e) => handleChange(e.target.value, idx)}
                                onKeyDown={(e) => handleKeyDown(e, idx)}
                                ref={(el) => (inputRefs.current[idx] = el)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    textAlign: 'center',
                                    fontSize: '24px',
                                }}
                            />
                        ))}
                        <button onClick={handleSubmit}>제출</button>
                    </div>
                </_.tempInputsStyle>
                <_.tempButtonsStyle>
                    <Button onClick={changeToLogIn} props="확인"/>
                    <Button onClick={changeToEmailCheck} props="뒤로가기"/>
                </_.tempButtonsStyle>
            </_.tempMainStyle>
        </_.tempMain>

    );
}

export default Auth;