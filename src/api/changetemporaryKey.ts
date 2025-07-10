import axios, {AxiosResponse} from "axios";
import {auth} from "@/config";
import {useMutation} from "@tanstack/react-query";
const changeTemporaryKey = async () => {
    const data = {
        "userId": "pdh0128",
        "email": "kdoornega@gmail.com"
    };
    try{
        const response: AxiosResponse = await axios.post(`${auth}/password/valid`, data,{
            withCredentials: true,
            headers: {'Content-Type': 'application/json'},
        });
        console.log(JSON.stringify(response.data));
        return true;
    }catch(error: any) {
        console.error(error);
        if (error.response?.data) {
            alert(`이메일 전송 실패: 다시 시도해 주세요!!`);
            console.log(`이메일 전송 실패: ${JSON.stringify(error.response.data)}`);
        } else {
            alert("이메일 전송 중 오류가 발생했습니다.");
        }
        return false;
    }

};
export const useChangeTemporaryKey = () => {
    return useMutation({
        mutationFn: changeTemporaryKey,
    });
}