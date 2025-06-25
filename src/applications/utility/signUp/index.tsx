import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import { useState } from "react";
import Button from "@/applications/components/button";
import Inputs from "@/applications/components/inputs";
import axios from 'axios';

type Props = {
    changeToLogIn: () => void;
};

const SignUp = ({ changeToLogIn }: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [checkingPw, setCheckingPw] = useState('');

    const inputList = [
        { label: "사용자 이름:", value: name, setValue: setName, type: "text" },
        { label: "이메일:", value: email, setValue: setEmail, type: "text" },
        { label: "비밀번호:", value: pw, setValue: setPw, type: "password" },
        { label: "비밀번호 재입력:", value: checkingPw, setValue: setCheckingPw, type: "password" }
    ];

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
            method: 'post',
            url: 'http://10.129.57.85:4445/register',
            headers: {
                'Content-Type': 'application/json'
            },
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

    return (
        <_.tempMain>
            <_.tempImageStyle>
                <img src={Logo} alt="logo" />
            </_.tempImageStyle>
            <_.tempBulkStyle />
            <_.tempMainStyle>
                <_.tempInputsStyle>
                    {inputList.map((item, idx) => (
                        <Inputs key={idx} {...item} />
                    ))}
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

