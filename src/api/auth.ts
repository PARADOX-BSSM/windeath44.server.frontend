import axios from "axios";
import { AxiosResponse, AxiosError } from 'axios';
import {auth} from "@/config";

interface authParams {
    email: string;
    check?:string;
}
export const emailValidationRequest = ({email}:authParams):void => {
    const data = {email};
    const config = {
        method: 'post',
        url: `${auth}/email`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };
    axios(config)
        .then(function (response: AxiosResponse) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error: AxiosError) {
            console.log(error);
        });
}

export const verifyEmailCode = ({email,check}:authParams):void => {
    const data = {
        "authorizationCode": check, email
    };
    const config = {
        method: 'patch',
        url: `${auth}/email/valid`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };
    axios(config)
        .then(function (response: AxiosResponse) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error: AxiosError) {
            console.log(error);
        });
}