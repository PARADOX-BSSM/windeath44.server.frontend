import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import Button from "@/applications/components/button";
import Inputs from "@/applications/components/inputs";
import {useState} from "react";
type Props = {
  setIsLogIned: (arg0: string) => void;
  changeToSignUp: () => void;
  changeToEmailCheck: () => void;
};

const LogIn = ({ setIsLogIned, changeToSignUp , changeToEmailCheck}: Props) => {
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");

  const dummyAccount = [
    {
      id: "Roena0516",
      password: "1234",
      nickname: "로에나"
    }
  ]
  const inputList = [
    { label: "사용자 이름:", value: inputID, setValue: setInputID, type: "text" },
    { label: "비밀번호:", value: inputPW, setValue: setInputPW, type: "password" },
  ];

  let checkLogIn = (id: string, password: string) => {
    const foundUser = dummyAccount.find(
        (element) => element.id === id && element.password === password
    );
    if (foundUser) {
      setIsLogIned("User");
      console.log(foundUser.id, foundUser.nickname);
    }
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
            <Button props="확인" onClick={() => checkLogIn(inputID, inputPW)}/>
            <Button props="취소" onClick={() => setIsLogIned("Guest")}/>
            <Button props="비밀번호 찾기" onClick={() => changeToEmailCheck()}/>
            <Button props="회원가입" onClick={() => changeToSignUp()}/>
          </_.tempButtons>
        </_.tempMainStyle>
      </_.tempMain>
    )

}
export default LogIn;