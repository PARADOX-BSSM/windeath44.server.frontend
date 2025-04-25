import {useState} from "react";
import * as _ from "@/applications/utility/emailCheck/style.ts";
import Logo from "@/assets/windeath44.svg";
import Button from "@/applications/components/button";
import Inputs from "@/applications/components/inputs";

interface Props {
    changeToLogIn: () => void;
};

const EmailChack = ({changeToLogIn}:Props) =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const inputList = [
        { label: "아이디:", value: name, setValue: setName, type: "text" },
        { label: "이메일:", value: email, setValue: setEmail, type: "text" },
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
                        <Button onClick={changeToLogIn} props="뒤로가기"/>
                    </_.tempButtonsStyle>
                </_.tempMainStyle>
            </_.tempMain>
    )
}
export default  EmailChack;