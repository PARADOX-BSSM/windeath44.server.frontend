import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import Button from "@/applications/components/button";
import Inputs from "@/applications/components/inputs";
import { useAtomValue } from 'jotai';
import {useState} from "react";
import { taskTransformerAtom } from '@/atoms/taskTransformer';

type Props = {
  setIsLogIned: (arg0: boolean) => void;
  changeToSignUp: () => void;
  changeToEmailCheck: () => void;
};

const LogIn = ({ setIsLogIned, changeToSignUp , changeToEmailCheck}: Props) => {
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");

  const taskTransform = useAtomValue(taskTransformerAtom);
  const inputList = [
    { label: "사용자 이름:", value: inputID, setValue: setInputID, type: "text" },
    { label: "비밀번호:", value: inputPW, setValue: setInputPW, type: "password" },
  ];

  const checkLogIn = () => {

  };


    return (
      <_.tempMain>
        <_.tempImage>
          <img src={Logo} alt="" />
        </_.tempImage>
        <_.tempBulk />
        <_.tempMainStyle>
          <_.tempInputs>
            {inputList.map((item) => (
                <Inputs  {...item}/>
            ))}
          </_.tempInputs>
          <_.tempButtons>
            <Button props="확인" onClick={checkLogIn}/>
            <Button props="취소" onClick={() => {
              setIsLogIned(true);
              taskTransform?.('LogIn', '');
            }}/>
            <Button props="비밀번호 찾기" onClick={() => changeToEmailCheck()}/>
            <Button props="회원가입" onClick={() => changeToSignUp()}/>
          </_.tempButtons>
        </_.tempMainStyle>
      </_.tempMain>
    )

}
export default LogIn;