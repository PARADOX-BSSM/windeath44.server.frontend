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
        console.error("고인 조회 실패", error.message);

        // API가 실패했을 때 에러를 던지지 않고 빈 데이터 반환
        return { data: [] };

        // 또는 에러를 그대로 던지려면 아래 주석 해제
        // throw error;
    }
}

export const usegetUserNameByLikeCount = () =>  { return useQuery({
    queryKey : ["userTodayBest"],
    queryFn : getUserNameByLikeCount,
    staleTime : 10 * 60 * 1000,
    gcTime : 10 * 60 * 1000,
    retry: false, // 재시도 비활성화 (에러가 발생해도 즉시 빈 데이터 반환)
});
}

