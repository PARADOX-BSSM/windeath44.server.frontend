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
        if (error) {
            console.error("기일알림 조회 실패", error.message);
        }
        throw error;
    }
}

export const useGetCharacterIdsByAnniversary = () =>  { return useQuery({
    queryKey : ["characterAnniversary"],
    queryFn : getCharacterIdsByAnniversary,
    staleTime : 10 * 60 * 1000,
    gcTime : 10 * 60 * 1000,
});
}




