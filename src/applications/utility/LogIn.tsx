import styled from "styled-components";

const TempImageStyle = styled.div`
  background-color: white;
  width: 100%;
  height: 180px;
  text-align: center;
  font-size: 30px;
  line-height: 180px;
`;

const TempBulkStyle = styled.div`
  width: 100%;
  height: 10px;
  background-color: #FFBBF5;
`

const TempMainStyle = styled.div`
  background-color: #FFD3FB;
  width: 100%;
  height: 258px;
`

const TempInputsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 20px;
`

const TempButtonContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  padding: 8px;
`

const TempButtonStyle = styled.button`
  width: 144px;
  height: 42px;
  font-size: 20px;
  line-height: 12px;
`


const LogIn = (props) => {
    return (
      <>
        <TempImageStyle>
          <h1>Windeath44</h1>
        </TempImageStyle>
        <TempBulkStyle></TempBulkStyle>
        <TempMainStyle>
          <TempInputsStyle>
            <div>
              <span style={{}}>사용자 이름:</span>
              <input></input>
            </div>
            <div>
              <span>비밀번호:</span>
              <input></input>
            </div>
          </TempInputsStyle>
          <TempInputsStyle>
            <div>
              <input type="checkbox"></input>
              <span>다음 실행에도 로그인 유지하기</span>
            </div>
          </TempInputsStyle>
          <TempButtonContainerStyle>
            <TempButtonStyle>확인</TempButtonStyle>
            <TempButtonStyle onClick={() => {props.setIsLogIned(true)}}>취소</TempButtonStyle>
            <TempButtonStyle>비밀번호 찾기</TempButtonStyle>
            <TempButtonStyle onClick={() => {props.changeToSignUp()}}>회원가입</TempButtonStyle>
          </TempButtonContainerStyle>
        </TempMainStyle>
      </>
    )

}
export default LogIn;