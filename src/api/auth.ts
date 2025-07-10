import axios from "axios";
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';
import {auth} from "@/config";

interface authParams {
    email: string;
    check?:string;
}
export const emailValidationRequest = async ({ email }:authParams): Promise<boolean> => {
    try {
        const response: AxiosResponse = await axios.post(`${auth}/email`, { email }, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(JSON.stringify(response.data));
        return true;
    } catch (error: any) {
        if (error.response?.data) {
            alert(`이메일 전송 실패: 다시 입력해 주세요!`);
            console.log(`이메일 전송 실패: ${JSON.stringify(error.response.data)}`);
        } else {
            alert("이메일 전송 중 오류가 발생했습니다.");
        }
        return false;
    }
};
export const useEmailValidation = () => {
    return useMutation({
        mutationFn: emailValidationRequest,
        onSuccess: () => {
            alert("이메일이 성공적으로 전송되었습니다.");
        },
        onError: () => {
        }
    });
};
export const verifyEmailCode = ({ email, check }:authParams): void => {
    const data = {
        authorizationCode: check,
        email,
    };
    const config = {
        method: 'patch',
        url: `${auth}/email/valid`,
        withCredentials: true,
        headers: {'Content-Type': 'application/json'},
        data: data
    };
    axios(config)
        .then(function (response: AxiosResponse) {
            console.log(JSON.stringify(response.data));
            alert("인증이 완료되었습니다.");
        })
        .catch(function (error: AxiosError) {
            console.log(error);
            if (error.response?.data) {
                alert(`인증 실패: 다시 입력해 주세요!`);
                console.log(`인증 실패: ${JSON.stringify(error.response.data)}`);
            } else {
                alert("인증코드 확인 중 오류가 발생했습니다.");
            }
        });
};
export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: (params: { email: string; check?: string }) => {
            verifyEmailCode(params);
            return Promise.resolve();
        },
    });
};