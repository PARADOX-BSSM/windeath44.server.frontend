import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { memorial } from '@/config';
import api from '../axiosInstance';


const getMemorialIdByCommentsCount  = async() => {
    try {
        const response: AxiosResponse =await api.get(`${memorial}/today-best`);
        return response.data;
    }
    catch (error: any) {
        console.error("추모관 조회 실패", error?.message);
        // 에러 발생 시 빈 데이터 반환 (렌더 보장)
        return { data: null };
    }
}

export const useGetMemorialIdByCommentsCount = (enabled: boolean = true) =>  { return useQuery({
    queryKey : ["memorialTodayBest"],
    queryFn : getMemorialIdByCommentsCount,
    staleTime : 10 * 60 * 1000,
    gcTime : 10 * 60 * 1000,
    retry: false, // 재시도 비활성화 (에러가 발생해도 즉시 빈 데이터 반환)
    enabled,
});
}

