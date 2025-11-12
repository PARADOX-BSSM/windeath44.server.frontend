import { useMutation } from '@tanstack/react-query';
import { auth } from '@/config';
import api from '@/api/axiosInstance.ts';
interface authParams {
  email: string;
}
export const sendUserId = async ({ email }: authParams): Promise<boolean> => {
  await api.post(
    `${auth}/user-id`,
    { email }
  );
};
export const useSendUserId = () => {
  return useMutation({
    mutationFn: sendUserId
  });
};
