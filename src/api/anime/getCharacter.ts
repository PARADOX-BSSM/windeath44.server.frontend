import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { anime } from '@/config';
const getCharacter = async (characterId: number): Promise<void> => {
  const response = await axios.get(`${anime}/characters/${characterId}`, {
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
};

export const useGetCharacter = () => {
  return useMutation({
    mutationFn: getCharacter,
  });
};
