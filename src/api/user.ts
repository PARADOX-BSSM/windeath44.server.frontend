import axios from "axios";
import { AxiosResponse, AxiosError } from 'axios';
import {user} from "@/config";
interface SignUpParams {
    name: string;
    email: string;
    pw: string;
    changeToLogIn: () => void;
}
export const signUp = ({ name, email, pw, changeToLogIn }: SignUpParams): void => {
    const data = {
        userId: email.split('@')[0],
        email,
        name,
        password: pw
    };
    const config = {
        method: 'post',
        url: `${user}/register`,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        data: data
    };
    axios(config)
        .then(function (response: AxiosResponse)  {
            console.log(JSON.stringify(response.data));
            alert("회원가입이 완료되었습니다.");
            changeToLogIn();
        })
        .catch(function (error: AxiosError) {
            console.error(error);
            if (error.response?.data) {
                alert(`회원가입 실패: ${JSON.stringify(error.response.data)}`);
            } else {
                alert("회원가입 중 오류가 발생했습니다.");
            }
        });
};