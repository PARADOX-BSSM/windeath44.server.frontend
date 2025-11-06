import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { anime } from '@/config/index';
import api from '@/api/axiosInstance';

export interface UpdateCharacterRequest {
  animeId: number;
  name: string;
  age: number;
  saying: string;
  deathReason: string;
  causeOfDeathDetails?: string;
  deathOfDay?: string;
  imageUrl: string;
}

interface UpdateCharacterParams {
  characterId: number;
  data: UpdateCharacterRequest;
}

const updateCharacter = async ({ characterId, data }: UpdateCharacterParams): Promise<any> => {
  try {
    const response: AxiosResponse = await api.patch(
      `${anime}/characters/${characterId}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.error(`캐릭터 수정 실패: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const useUpdateCharacter = () => {
  return useMutation({
    mutationFn: updateCharacter,
    onSuccess: () => {
      console.log('캐릭터가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('캐릭터 수정 중 오류 발생:', error);
    },
  });
};
