import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { anime } from '@/config';
import api from '@/api/axiosInstance.ts';

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

const GetAnimation = async (animeId: number): Promise<AnimeResponse> => {
  const response = await api.get(`${anime}/${animeId}`);
  return response.data;
};

export const useGetAnimation = (setAnimation: React.Dispatch<React.SetStateAction<string>>) => {
  return useMutation<AnimeResponse, Error, number>({
    mutationFn: GetAnimation,
    onSuccess: (data: AnimeResponse) => {
      setAnimation(data.data.name);
    },
    onError: (err: Error) => {
      console.log(err);
    },
  });
};
