import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { user } from '@/config';
import api from '../axiosInstance';


const getUserNameByLikeCount= async() => {
    try {
        const response: AxiosResponse =await api.get(`${user}/users/popular`);
        return response.data;
    }
    catch (error: any) {
        if (error) {
            console.error("고인 조회 실패", error.message);
        }
        throw error;
    }
}

export const usegetUserNameByLikeCount = () =>  { return useQuery({
    queryKey : ["memorialTodayBest"],
    queryFn : getUserNameByLikeCount,
    staleTime : 10 * 60 * 1000,
    gcTime : 10 * 60 * 1000,
});
}

