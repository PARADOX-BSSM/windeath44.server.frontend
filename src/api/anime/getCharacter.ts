import { useMutation } from '@tanstack/react-query';
import { anime } from '@/config';
import React from 'react';
import api from '@/api/axiosInstance.ts';
export type CharacterData = {
  characterId: number;
  animeId: number;
  name: string;
  lifeTime: number;
  deathReason: string;
  imageUrl: string;
  bowCount: number;
  age: number;
  saying: string;
  state: string;
  deathOfDay: string;
} | null;
export type CharacterDataResponse = {
  message: string;
  data: CharacterData;
};
const getCharacter = async (characterId: number): Promise<CharacterDataResponse> => {
  const response = await api.get(`${anime}/characters/${characterId}`, {});
  console.log(response.data);
  return response.data;
};

export const useGetCharacter = (
  setCharacterData: React.Dispatch<React.SetStateAction<CharacterData>>,
) => {
  return useMutation<CharacterDataResponse, Error, number>({
    mutationFn: getCharacter,
    onSuccess: (data: CharacterDataResponse) => {
      setCharacterData(data.data);
    },
    onError: (err: Error) => {
      console.log(err);
    },
  });
};
