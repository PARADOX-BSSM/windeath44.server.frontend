import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import {useState} from "react";
import Button from "@/applications/components/button";
import Inputs from "@/applications/components/inputs";

const SingUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [chakingpw, setChakingpw] = useState('');

    const inputList = [
        { label: "사용자 이름:", value: name, setValue: setName, type: "text" },
        { label: "이메일", value: email, setValue: setEmail, type: "text" },
        { label: "비밀번호:", value: pw, setValue: setPw, type: "password" },
        { label: "비밀번호 재입력:", value: chakingpw, setValue: setChakingpw, type: "password" }
    ];

    return (
        <_.tempMain>
            <_.tempImageStyle>
                <img src={Logo} alt="" />
            </_.tempImageStyle>
            <_.tempBulkStyle />
            <_.tempMainStyle>
                <_.tempInputsStyle>
                    {inputList.map((item) => (
                        <Inputs {...item}/>
                    ))}
                </_.tempInputsStyle>
                <_.tempButtonsStyle>
                    <Button props="확인"/>
                    <Button onClick={props.changeToLogIn} props="취소"/>
                </_.tempButtonsStyle>
            </_.tempMainStyle>
        </_.tempMain>
    );
};

export default SingUp;
