import * as _ from './style';
import Logo from '@/assets/windeath44.svg';
import Button from "@/applications/components/button";
import Inputs from "@/applications/components/inputs";
import { useAtomValue } from 'jotai';
import {useState} from "react";
import { useLogIn } from '@/api/auth/logIn';
import { taskTransformerAtom } from '@/atoms/taskTransformer';

type Props = {
  setIsLogIned: (arg0: boolean) => void;
  changeToSignUp: () => void;
  changeToEmailCheck: () => void;
};
const LogIn = ({ setIsLogIned, changeToSignUp , changeToEmailCheck}: Props) => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const logInMutation = useLogIn();
  const taskTransform = useAtomValue(taskTransformerAtom);
  const inputList = [
    { label: "이메일:", value: userId, setValue: setUserId, type: "text" },
    { label: "비밀번호:", value: password, setValue: setPassword, type: "password" },
  ];
  const checkLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = userId.split('@')[0]
    logInMutation.mutate({ id, password }, {
          onSuccess: () => {
            setIsLogIned(true);
            taskTransform?.('LogIn', '');
          }
        }
    );
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
                <Inputs  {...item} flex={true}/>
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