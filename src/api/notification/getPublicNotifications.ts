import { useQuery } from '@tanstack/react-query';
import api from '../axiosInstance';

export interface NotificationData {
  notification_id: number;
  writer_id: string;
  title: string;
  content: string;
  is_open: boolean;
  end_date: string;
  created_at: string;
  updated_at: string;
}

interface PublicNotificationsResponse {
  message: string;
  data: NotificationData[];
}

export const fetchPublicNotifications = async (
  limit: number = 100,
): Promise<PublicNotificationsResponse> => {
  const response = await api.get('/notifications/public', {
    params: { limit },
  });
  return response.data;
};

export const useGetPublicNotificationsQuery = (limit: number = 100) => {
  return useQuery({
    queryKey: ['publicNotifications', limit],
    queryFn: () => fetchPublicNotifications(limit),
  });
};
