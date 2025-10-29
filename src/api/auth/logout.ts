import api from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { auth } from '@/config';
import { deleteCookie, getCookie } from '@/api/auth/cookie';

const logOut = async (): Promise<string> => {
  const refreshToken = getCookie('refreshToken');
  await api.post(`${auth}/logout`, {
    headers: {
      Cookie: refreshToken || '',
    },
  });
  // console.log(response.headers);
  // Remove auth cookies locally; server should also invalidate refresh on logout
  deleteCookie('access_token');
  // deleteCookie('refreshToken');
  return '성공';
};

export const useLogOut = () => {
  return useMutation({
    mutationFn: logOut,
  });
};
