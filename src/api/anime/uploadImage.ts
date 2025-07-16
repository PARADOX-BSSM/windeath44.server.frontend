import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { anime } from '@/config/index';
import api from '@/api/axiosInstance';

interface uploadImageType {
  image: string; // base64 형식
  characterId: number;
}

// base64를 Blob으로 변환하는 유틸 함수
const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const uploadImage = async ({ image, characterId }: uploadImageType): Promise<string> => {
  const formData = new FormData();
  const blobImage = dataURLtoBlob(image);

  formData.append('image', blobImage);
  formData.append('characterId', characterId.toString());

  try {
    const response: AxiosResponse = await api.patch(
      `${anime}/characters/image/${characterId}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    // console.log(response);
    return '성공했어요~!~!~!';
  } catch (error: any) {
    if (error.response?.data) {
      alert('이미지 업로드 오류');
    } else {
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
    throw error;
  }
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      console.log('이미지가 성공적으로 등록되었습니다.');
      // alert('이미지가 성공적으로 등록되었습니다.');
    },
    onError: () => {},
  });
};
