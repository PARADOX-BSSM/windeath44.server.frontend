import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { user } from '@/config';
import api from '@/api/axiosInstance';

interface UpdateProfileParams {
  profile: string; // base64 encoded image from cropper
}

// base64를 File 객체로 변환하는 헬퍼 함수
const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const updateUserProfile = async (params: UpdateProfileParams): Promise<AxiosResponse> => {
  const formData = new FormData();

  // base64 이미지를 File 객체로 변환하여 FormData에 추가
  const profileFile = base64ToFile(params.profile, 'profile.png');
  formData.append('profile', profileFile);

  return await api.patch(`${user}/change/profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: (params: UpdateProfileParams) => updateUserProfile(params),
  });
};
