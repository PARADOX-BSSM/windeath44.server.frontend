import axios from 'axios';
import { auth } from '@/config';
import { getCookie, setCookie, deleteCookie } from '@/api/auth/cookie';

const api = axios.create({
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Read access token from cookie and attach as Authorization header for protected endpoints
  const token = getCookie('access_token');
  const url = config.url ?? '';
  const isAuthEndpoint =
    url.includes('/login') || url.includes('/reissue') || url.includes('/logout');
  if (token && !isAuthEndpoint) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    console.log(err);

    console.log('Error status:', err.response?.status);
    console.log('Original request retry:', originalRequest._retry);

    console.log(err.response?.status);
    console.log(originalRequest._retry);
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Remove expired token before attempting reissue
        const res = await axios.post(`${auth}/reissue`, {}, { withCredentials: true });
        // If server returns a new accessToken, persist it to cookie
        const newToken = (res.data && (res.data.accessToken || res.data.token)) as
          | string
          | undefined;
        if (newToken) {
          setCookie('access_token', newToken, 1);
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        // Ensure token is deleted on refresh failure
        deleteCookie('access_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  },
);

export default api;
