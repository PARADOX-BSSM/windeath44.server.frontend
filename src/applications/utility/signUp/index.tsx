import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import {useState} from "react";
import Button from "@/applications/components/button";

const SingUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [chakingpw, setChakingpw] = useState('');

    return (
        <_.tempMain>
            <_.tempImageStyle>
                <img src={Logo} alt="" />
            </_.tempImageStyle>
            <_.tempBulkStyle />
            <_.tempMainStyle>
                <_.tempInputsStyle>
                    <_.inputsDiv>
                        <span>사용자 이름:</span>
                        <_.inputs type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </_.inputsDiv>
                    <_.inputsDiv>
                        <span>이메일</span>
                        <_.inputs type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </_.inputsDiv>
                    <_.inputsDiv>
                        <span>비밀번호:</span>
                        <_.inputs type="text" value={pw} onChange={(e) => setPw(e.target.value)}/>
                    </_.inputsDiv>
                    <_.inputsDiv>
                        <span>비밀번호 재입력:</span>
                        <_.inputs type="text" value={chakingpw} onChange={(e) => setChakingpw(e.target.value)}/>
                    </_.inputsDiv>
                </_.tempInputsStyle>
                <_.tempButtonsStyle>
                    <Button props={"확인"}/>
                    <Button onClick={props.changeToLogIn} props={"취소"}/>
                </_.tempButtonsStyle>
            </_.tempMainStyle>
        </_.tempMain>
    );
};

export default SingUp;
