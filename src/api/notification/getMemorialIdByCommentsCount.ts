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
        console.error("추모관 조회 실패", error.message);

        // API가 실패했을 때 에러를 던지지 않고 빈 데이터 반환
        // 이렇게 하면 isError가 false가 되고, "오늘은 인기 추모관이 없습니다" 메시지가 표시됨
        return { data: [] };

        // 또는 에러를 그대로 던지려면 아래 주석 해제
        // throw error;
    }
}

export const useGetMemorialIdByCommentsCount = () =>  { return useQuery({
    queryKey : ["memorialTodayBest"],
    queryFn : getMemorialIdByCommentsCount,
    staleTime : 10 * 60 * 1000,
    gcTime : 10 * 60 * 1000,
    retry: false, // 재시도 비활성화 (에러가 발생해도 즉시 빈 데이터 반환)
});
}

