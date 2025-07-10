import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import {useEffect, useState} from "react";
import Button from "@/applications/components/button";
import Inputs, {Inputs2} from "@/applications/components/inputs";
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
    const [click, setClick] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
    const sendAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (pw !== checkingPw) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        signUp({ name, email, pw, changeToLogIn });
        e.preventDefault();
    };
    const sendEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
        emailValidationRequest({email});
        setClick(true);
        setTimeLeft(180);
        e.preventDefault();
    }
    const verifyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (check.length >= 5) {
            verifyEmailCode({email,check})
            setClick(false);
        }else{
            alert("인증코드 5자리를 입력하지 않았습니다.")
        }
        e.preventDefault();
    }
    useEffect(() => {
        if (!click || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
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
    return (
        <_.tempMain>
            <_.tempImageStyle>
                <img src={Logo} alt="logo" />
            </_.tempImageStyle>
            <_.tempBulkStyle />
            <_.tempMainStyle>
                <_.tempInputsStyle>
                    <Inputs label={"사용자 이름:"} value={name} setValue={setName} type={"text"} />
                    <_.set>
                        <span>이메일 :</span>
                        <_.btnSet>
                            <Inputs2 value={email} setValue={setEmail} type={"text"}/>
                            <Button onClick={sendEmail} props={click?"코드 재전송":"코드전송"}/>
                        </_.btnSet>
                    </_.set>
                    <_.set>
                        <span>인증코드 :</span>
                        <_.btnSet>
                            <Inputs2 value={check} setValue={setCheck} type={"text"} />
                            <div style={{ fontSize: '0.75rem'}}>
                                {formatTime(timeLeft)}
                            </div>
                            <Button onClick={verifyCode} props="확인"/>
                        </_.btnSet>
                    </_.set>
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

