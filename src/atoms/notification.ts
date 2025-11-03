import { atom } from 'jotai';
import { NotificationData } from '@/api/notification/getPublicNotifications';

export const notificationListAtom = atom<NotificationData[]>([]);

export const notificationAtom = atom<
  | ((
      notifications:
        | NotificationData[]
        | Array<{ title: string; content?: string; is_image?: boolean; created_at?: string }>,
    ) => void)
  | null
>(null);
