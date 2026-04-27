import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { anime } from '@/config';
import api from '../axiosInstance';


const getCharacterIdsByAnniversary  = async() => {
    try {
        const response: AxiosResponse = await api.get(`${anime}/characters/today-anniversary`);
        return response.data;
    }
    catch (error: any) {
        console.error("기일알림 조회 실패", error?.message);
        // 에러 발생 시 빈 배열 반환 (렌더 보장)
        return [];
    }
}

export const useGetCharacterIdsByAnniversary = (enabled: boolean = true) =>  { return useQuery({
    queryKey : ["characterAnniversary"],
    queryFn : getCharacterIdsByAnniversary,
    staleTime : 10 * 60 * 1000,
    gcTime : 10 * 60 * 1000,
    enabled,
});
}




