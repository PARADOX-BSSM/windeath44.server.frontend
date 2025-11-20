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
        if (error) {
            console.error("추모관 조회 실패", error.message);
        }
        throw error;
    }
}

export const useGetMemorialIdByCommentsCount = () =>  { return useQuery({
    queryKey : ["memorialTodayBest"],
    queryFn : getMemorialIdByCommentsCount,
    staleTime : 10 * 60 * 1000,
    gcTime : 10 * 60 * 1000,
});
}

