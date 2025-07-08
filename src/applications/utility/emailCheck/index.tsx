import {useState} from "react";
import * as _ from "@/applications/utility/emailCheck/style.ts";
import Logo from "@/assets/windeath44.svg";
import Button from "@/applications/components/button";
import Inputs from "@/applications/components/inputs";
import axios from 'axios';

interface Props {
    changeToLogIn: () => void;
    changeToAuth : () => void;
};

const EmailChack = ({changeToLogIn,changeToAuth}:Props) =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const inputList = [
        { label: "아이디:", value: name, setValue: setName, type: "text" },
        { label: "이메일:", value: email, setValue: setEmail, type: "text" },
    ];
    const sendEmail = async () => {
        const data = JSON.stringify({
            "email": email
        });

        const config = {
            method: 'post',
            url: 'http://10.129.57.85:4445/valid/email',
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
                        <Button onClick={changeToAuth,sendEmail} props="확인"/>
                        <Button onClick={changeToLogIn} props="뒤로가기"/>
                    </_.tempButtonsStyle>
                </_.tempMainStyle>
            </_.tempMain>
    )
}
export default  EmailChack;