
const tempImageStyle = {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "180px",
    textAlign: "center",
    fontSize: "30px",
    lineHeight: "180px",
}

const tempBulkStyle = {
    width: "100%",
    height: "10px",
    backgroundColor: "#FFBBF5",
}

const tempMainStyle = {
    backgroundColor: "#FFD3FB",
    width: "100%",
    height: "258px",
}

const tempInputsStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    padding: "20px",
}

const tempButtonsStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "10px",
    padding: "8px",
}

const tempButtonStyle = {
    width: "144px",
    height: "42px",
    fontSize: "20px",
    lineHeight: "12px",
}

const SignUp = (props) => {
    return (
        <>
            <div style={tempImageStyle}>
                <h1>Windeath44</h1>
            </div>
            <div style={tempBulkStyle}></div>
            <div style={tempMainStyle}>
                <div className="inputs" style={tempInputsStyle}>
                    <div>
                        <span>사용자 이름:</span>
                        <input type={"text"}/>
                    </div>
                    <div>
                        <span>이메일</span>
                        <input type={"text"}/>
                    </div>
                    <div>
                        <span>비밀번호:</span>
                        <input type={"text"}/>
                    </div>
                    <div>
                        <span>비밀번호 재입력:</span>
                        <input type={"text"}/>
                    </div>
                </div>
                <div className="radio" style={tempInputsStyle}>
                    <div>
                        <input type="checkbox"></input>
                        <span>다음 실행에도 로그인 유지하기</span>
                    </div>
                </div>
                <div className="buttons" style={tempButtonsStyle}>
                    <button style={tempButtonStyle}>확인</button>
                    <button style={tempButtonStyle}>취소</button>
                </div>
            </div>
        </>
    )

}
export default SignUp;