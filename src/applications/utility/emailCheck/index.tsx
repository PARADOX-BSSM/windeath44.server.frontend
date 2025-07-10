import {useState} from "react";
import * as _ from "@/applications/utility/emailCheck/style.ts";
import Logo from "@/assets/windeath44.svg";
import Button from "@/applications/components/button";
import Inputs from "@/applications/components/inputs";
import {useChangeTemporaryKey} from "@/api/changetemporaryKey.ts";

interface Props {
    changeToLogIn: () => void;
    changeToAuth : () => void;
};

const EmailChack = ({changeToLogIn,changeToAuth}:Props) =>{
    const [email, setEmail] = useState('');
    const inputList = [
        { label: "이메일:", value: email, setValue: setEmail, type: "text" },
    ];
    const mutationChangeKey = useChangeTemporaryKey;
    const checkEmail = () => {
        mutationChangeKey.mutate({email},{
                onSuccess: () => {
                    changeToAuth()
                }
            }
        );
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
                        <Button onClick={checkEmail} props="확인"/>
                        <Button onClick={changeToLogIn} props="뒤로가기"/>
                    </_.tempButtonsStyle>
                </_.tempMainStyle>
            </_.tempMain>
    )
}
export default  EmailChack;