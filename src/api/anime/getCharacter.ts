import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { anime } from '@/config';
export type CharacterData = {
  data: string | number[];
  characterId: number;
  name: string;
  lifeTime: number;
  deathReason: string;
  imageUrl: string | null;
  bowCount: number;
  age: number;
  saying: string;
  state: string;
  deathOfDay: string;
};
const getCharacter = async (characterId: number): Promise<CharacterData> => {
  const response = await axios.get(`${anime}/characters/${characterId}`, {
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
};

export const useGetCharacter = () => {
  return useMutation<CharacterData, Error, number>({
    mutationFn: getCharacter,
  });
};
