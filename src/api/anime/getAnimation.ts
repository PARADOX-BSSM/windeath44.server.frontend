import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import { anime } from '@/config';

interface AnimeData {
  animeId: number;
  name: string;
  genres: string[];
  imageUrl: string;
}
interface AnimeResponse {
  message: string;
  data: AnimeData;
}

const GetAnimation = async (animeId: number): Promise => {
  const response = await axios.get(`${anime}/${animeId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const useGetAnimation = (setAnimation: React.Dispatch<React.SetStateAction<string>>) => {
  return useMutation<AnimeResponse, Error, number>({
    mutationFn: GetAnimation,
    onSuccess: (data: AnimeResponse) => {
      setAnimation(data.data.name);
    },
    onError: (err: Error) => {
      alert('애니메이션 정보를 가져오는 중 문제가 발생했습니다!!\n 다시 시도해주세요!');
      console.log(err);
    },
  });
};
