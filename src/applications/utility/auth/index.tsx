interface Props {
    changeToLogIn: () => void;
};

const Auth = ({changeToLogIn}:Props) =>{
    return (
        <>
            인증하는 창~~
            <button onClick={changeToLogIn} >뒤로가기</button>
            <button>인증</button>
        </>
    )
}
export default  Auth;