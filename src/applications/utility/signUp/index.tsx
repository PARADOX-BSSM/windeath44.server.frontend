import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import {useEffect, useState} from "react";
import Button from "@/applications/components/button";
import Inputs from "@/applications/components/inputs";
import axios from 'axios';
import {API_BASE_URL_AUTH, API_BASE_URL_USER} from "@/config";

type Props = {
    changeToLogIn: () => void;
};

const SignUp = ({ changeToLogIn }: Props) => {
    const [name, setName] = useState<String>('');
    const [email, setEmail] = useState<String>('');
    const [pw, setPw] = useState<String>('');
    const [checkingPw, setCheckingPw] = useState<String>('');
    const [check, setCheck] = useState<String>('');

    useEffect(() => {
        if (check.length >= 5) {
            // 여기에 인증코드 확인용 API 함수 호출
            console.log("인증코드 길이 5자 초과, API 호출 실행");

            // 예시: verifyCode() 함수 호출 (이건 직접 작성하세요)
            verifyCode();
        }
    }, [check]);

    const sendAuth = () => {
        if (pw !== checkingPw) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const data = JSON.stringify({
            userId: email.split('@')[0], // 간단한 예시: 이메일 앞부분을 userId로 사용
            email: email,
            name: name,
            password: pw
        });

        const config = {
            method: 'patch',
            url: `${API_BASE_URL_USER}/register`,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
            data: data
        };

        axios(config)
            .then(function (response: any) {
                console.log(JSON.stringify(response.data));
                alert("회원가입이 완료되었습니다.");
            })
            .catch(function (error: any) {
                console.error(error);
                alert("회원가입 중 오류가 발생했습니다.");
            });
    };

    const sendEmail = () => {
        const data = JSON.stringify({
            "email": email
        });

        const config = {
            method: 'post',
            url: `${API_BASE_URL_AUTH}/email`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const verifyCode = () => {
        const data = JSON.stringify({
            "authorizationCode": check,
            "email": email
        });

        const config = {
            method: 'patch',
            url: `${API_BASE_URL_AUTH}/email/valid`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
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

