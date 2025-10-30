import { atom } from 'jotai';
import { NotificationData } from '@/api/notification/getPublicNotifications';

export const notificationListAtom = atom<NotificationData[]>([]);

export const notificationAtom = atom<
  | ((notifications: NotificationData[] | Array<{ title: string; content?: string }>) => void)
  | null
>(null);
