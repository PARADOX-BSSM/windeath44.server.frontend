import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { anime } from '@/config';
import api from '../axiosInstance';

const getCharacterIdsByAnniversary  = async() => {
    const MOCK_DATA = [
        { id: 1, name: '아카자' },
        { id: 2, name: '렌고쿠 쿄쥬로' }
    ];

    // 목데이터 반환 (테스트용)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_DATA);
        }, 500);
    });

    // 실제 API 호출 (주석 처리)
    // try {
    //     const response: AxiosResponse =await api.get(`${anime}/characters/today-anniversary`);
    //     return response.data;
    // }
    // catch (error: any) {
    //     if (error) {
    //         console.error("기일알림 조회 실패", error.message);
    //     }
    //     throw error;
    // }
}

export const useGetCharacterIdsByAnniversary = () =>  { return useQuery({
    queryKey : ["characterAnniversary"],
    queryFn : getCharacterIdsByAnniversary,
    staleTime : 10 * 60 * 1000,
    gcTime : 10 * 60 * 1000,
});
}




