import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import {useEffect, useState} from "react";
import Button from "@/applications/components/button";
import Inputs from "@/applications/components/inputs";
import {signUp} from '@/api/user'
import {emailValidationRequest,verifyEmailCode} from '@/api/auth'

type Props = {
    changeToLogIn: () => void;
};

const SignUp = ({changeToLogIn}: Props) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const [checkingPw, setCheckingPw] = useState<string>('');
    const [check, setCheck] = useState<string>('');
    useEffect(() => {
        if (check.length >= 5) {
            verifyCode();
        }
    }, [check]);
    const sendAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (pw !== checkingPw) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        signUp({ name, email, pw, changeToLogIn });
        e.preventDefault();
    };
    const sendEmail = () => {
        emailValidationRequest({email});
    }

    const verifyCode = () => {
        verifyEmailCode({email,check})
    }

    return (
        <_.tempMain>
            <_.tempImageStyle>
                <img src={Logo} alt="logo" />
            </_.tempImageStyle>
            <_.tempBulkStyle />
            <_.tempMainStyle>
                <_.tempInputsStyle>
                    <Inputs label={"사용자 이름:"} value={name} setValue={setName} type={"text"} />
                    <div>
                        <Inputs label={"이메일:"} value={email} setValue={setEmail} type={"text"} />
                        <button type="button" onClick={sendEmail}>확인</button>
                    </div>
                    <Inputs label={"인증코드"} value={check} setValue={setCheck} type={"text"} />
                    
                    <Inputs label={"비밀번호:"} value={pw} setValue={setPw} type={"password"} />
                    <Inputs label={"비밀번호 재입력:"} value={checkingPw} setValue={setCheckingPw} type={"password"} />
                </_.tempInputsStyle>
                <_.tempButtonsStyle>
                    <Button onClick={sendAuth} props="확인" />
                    <Button onClick={changeToLogIn} props="취소" />
                </_.tempButtonsStyle>
            </_.tempMainStyle>
        </_.tempMain>
    );
};

export default SignUp;

