import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import Button from "@/applications/components/button";
import {useState} from "react";
import Inputs from "@/applications/components/inputs";

type Props = {
  setIsLogIned: (arg0: boolean) => void;
  changeToSignUp: () => void;
};

const LogIn = ({ setIsLogIned, changeToSignUp }: Props) => {
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
      setIsLogIned(true);
      console.log(id, password);
    }
  };

    return (
      <>
        <_.tempImage>
          <img src={Logo} alt="" />
        </_.tempImage>
        <_.tempBulk />
        <_.tempMain>
          <_.tempInputs>
            {inputList.map((item) => (
                <Inputs  {...item}/>
            ))}
            {/*<div>*/}
            {/*  <span>사용자 이름:</span>*/}
            {/*  <input*/}
            {/*      className="id"*/}
            {/*      value={inputID}*/}
            {/*      type="text"*/}
            {/*      onChange={(e) => setInputID(e.target.value)}*/}
            {/*  />*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*  <span>비밀번호:</span>*/}
            {/*  <input*/}
            {/*      className="password"*/}
            {/*      value={inputPW}*/}
            {/*      type="password"*/}
            {/*      onChange={(e) => setInputPW(e.target.value)}*/}
            {/*  />*/}
            {/*</div>*/}
          </_.tempInputs>
          <_.tempInputs>
            <div>
              <input type="checkbox" />
              <span>다음 실행에도 로그인 유지하기</span>
            </div>
          </_.tempInputs>
          <_.tempButtons>
            <Button props="확인" onClick={() => checkLogIn(inputID, inputPW)}/>
            <Button props="취소" onClick={() => setIsLogIned(true)}/>
            <Button props="비밀번호 찾기"/>
            <Button props="회원가입" onClick={() => changeToSignUp()}/>
          </_.tempButtons>
        </_.tempMain>
      </>
    )

}
export default LogIn;