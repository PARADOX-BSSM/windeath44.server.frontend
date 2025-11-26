import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { anime } from '@/config/index';
import api from '@/api/axiosInstance';
import { InputPortageType } from '@/modules/inputPortageInterface';

interface createCharacterInterface {
  animeId: string;
  name: string;
  deathReason: deathType;
  saying: string;
  age: number;
  deathOfDay: string;
  causeOfDeathDetails?: string;
  imageUrl?: string;
}

interface CreateCharacterInput extends InputPortageType {
  fileUrl?: string;
}

const createCharacter = async (inputData: CreateCharacterInput): Promise<number> => {
  const request: createCharacterInterface = {
    animeId: inputData.animeId,
    name: inputData.name,
    deathReason: inputData.deathReason,
    saying: inputData.phrase,
    age: inputData.age,
    deathOfDay: inputData.date,
    causeOfDeathDetails: inputData.causeOfDeathDetails,
    imageUrl: inputData.fileUrl,
  };
  // console.log(request);
  try {
    const response: AxiosResponse = await api.post(`${anime}/characters`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(JSON.stringify(response.data));
    return response.data.data.characterId;
  } catch (error: any) {
    if (error.response?.data) {
      // console.log(`캐릭터 등록 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const useCreateCharacter = () => {
  return useMutation({
    mutationFn: createCharacter,
    onSuccess: () => {
      // console.log('캐릭터가 성공적으로 등록되었습니다.');
      // alert('캐릭터가 성공적으로 등록되었습니다.');
    },
    onError: () => {},
  });
};
