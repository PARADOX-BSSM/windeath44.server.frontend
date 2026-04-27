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
        console.error("고인 조회 실패", error?.message);
        // 에러 발생 시 빈 데이터 반환 (렌더 보장)
        return { data: null };
    }
}

export const usegetUserNameByLikeCount = (enabled: boolean = true) =>  { return useQuery({
    queryKey : ["userTodayBest"],
    queryFn : getUserNameByLikeCount,
    staleTime : 10 * 60 * 1000,
    gcTime : 10 * 60 * 1000,
    retry: false, // 재시도 비활성화 (에러가 발생해도 즉시 빈 데이터 반환)
    enabled,
});
}

