import { useMutation } from '@tanstack/react-query';
import { anime } from '@/config';
import React from 'react';
import axios from 'axios';
import { CharacterData } from './getCharacter';

export type CharactersDataResponse = {
  message: string;
  data: CharacterData[];
};

const getCharactersByCharacterIds = async (
  characterIds: number[],
): Promise<CharactersDataResponse> => {
  const response = await axios.get(`${anime}/characters/search/characterIds`, {
    params: { characterIds },
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams();
      params.characterIds.forEach((id: number) => {
        searchParams.append('characterIds', id.toString());
      });
      return searchParams.toString();
    },
  });
  return response.data;
};

export const useGetCharactersByCharacterIds = (
  setCharactersData: React.Dispatch<React.SetStateAction<CharacterData[]>>,
) => {
  return useMutation<CharactersDataResponse, Error, number[]>({
    mutationFn: getCharactersByCharacterIds,
    onSuccess: (data: CharactersDataResponse) => {
      setCharactersData(data.data);
    },
    onError: (err: Error) => {
      console.error('Failed to fetch characters by character IDs:', err);
    },
  });
};
