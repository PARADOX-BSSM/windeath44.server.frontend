import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { anime } from '@/config/index';
import api from '@/api/axiosInstance';
import { useAtomValue } from 'jotai';
import { inputPortage } from '@/atoms/inputManager';

interface createCharacterInterface {
  animeId: string;
  name: string;
  lifeTime: string;
  deathReason: deathType;
  saying: string;
  age: number;
  deathOfDay: string;
}

const createCharacter = async (): Promise<boolean> => {
  const inputData = useAtomValue(inputPortage);

  const request: createCharacterInterface = {
    animeId: inputData.animeId,
    name: inputData.name,
    lifeTime: inputData.lifeCycle,
    deathReason: inputData.deathReason,
    saying: inputData.phrase,
    age: inputData.age,
    deathOfDay: inputData.date,
  };
  try {
    const response: AxiosResponse = await api.post(`${anime}/characters`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(JSON.stringify(response.data));
  } catch (error: any) {
    if (error.response?.data) {
      alert(`캐릭터 등록 오류`);
      console.log(`캐릭터 등록 실패: ${JSON.stringify(error.response.data)}`);
    } else {
      alert('캐릭터 등록 중 오류가 발생했습니다.');
    }
    throw error;
  }
  return true;
};
