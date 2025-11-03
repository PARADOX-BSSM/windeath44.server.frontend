import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { anime } from '@/config/index';
import api from '@/api/axiosInstance';

interface uploadImageType {
  image: string; // base64 형식
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

const uploadImage = async ({ image }: uploadImageType): Promise<string> => {
  const formData = new FormData();
  const blobImage = dataURLtoBlob(image);

  formData.append('image', blobImage);

  try {
    const response: AxiosResponse = await api.post(`${anime}/characters/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response);
    return response.data.data.fileUrl;
  } catch (error: any) {
    console.error('이미지 업로드 오류:', error);
    throw error;
  }
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      // console.log('이미지가 성공적으로 등록되었습니다.');
      // alert('이미지가 성공적으로 등록되었습니다.');
    },
    onError: () => {},
  });
};
