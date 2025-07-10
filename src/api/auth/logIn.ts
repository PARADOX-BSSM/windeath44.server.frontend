import axios, {AxiosError, AxiosResponse} from "axios";
import {auth} from "@/config";
import {useMutation} from "@tanstack/react-query";
interface authParams {
    userId: string;
    password: string;
}
const logIn = async ({ userId, password }:authParams): Promise<boolean> => {
    const data = {
        userId,
        password
    };
    try {
        const response: AxiosResponse = await axios.post(`${auth}/email/valid`,data, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(JSON.stringify(response.data));
        return true;
    }catch(error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            alert(`로그인 실패: 다시 입력해 주세요!`);
            console.log(`로그인 실패: ${JSON.stringify(axiosError.response.data)}`);
        } else {
            alert("로그인 중 오류가 발생했습니다.");
        }
        return false;
    }
};
export const useLogIn = () => {
    return useMutation({
        mutationFn: logIn,
    });
};