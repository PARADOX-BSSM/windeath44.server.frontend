import * as _ from './style';
import Button from "@/applications/components/button";

let dummyAccount = [
  {
    id: "Roena0516",
    password: "1234",
    nickname: "로에나"
  }
]


const LogIn = (props: { setIsLogIned: (arg0: boolean) => void; changeToSignUp: () => void }) => {
  let inputedID = "";
  let inputedPassword = "";

  let checkLogIn = (id: string, password: string) => {
    dummyAccount.forEach(element => {
      if (element.id === id && element.password === password) {
        props.setIsLogIned(true);
        console.log(id, password);
      }
    });
  }

    return (
      <>
        <_.tempImage>
          <h1>Windeath44</h1>
        </_.tempImage>
        <_.tempBulk />
        <_.tempMain>
          <_.tempInputs>
            <div>
              <span>사용자 이름:</span>
              <input
                  className="id"
                  type="text"
                  onChange={(e) => (inputedID = e.target.value)}
              />
            </div>
            <div>
              <span>비밀번호:</span>
              <input
                  className="password"
                  type="password"
                  onChange={(e) => (inputedPassword = e.target.value)}
              />
            </div>
          </_.tempInputs>
          <_.tempInputs>
            <div>
              <input type="checkbox" />
              <span>다음 실행에도 로그인 유지하기</span>
            </div>
          </_.tempInputs>
          <_.tempButtons>
            <Button props="확인" onClick={() => checkLogIn(inputedID, inputedPassword)}/>
            <Button props="취소" onClick={() => props.setIsLogIned(true)}/>
            <Button props="비밀번호 찾기"/>
            <Button props="회원가입" onClick={() => props.changeToSignUp()}/>
          </_.tempButtons>
        </_.tempMain>
      </>
    )

}
export default LogIn;