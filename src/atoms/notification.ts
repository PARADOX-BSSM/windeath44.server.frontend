import { atom } from 'jotai';
import { NotificationData } from '@/api/notification/getPublicNotifications';

export const notificationListAtom = atom<NotificationData[]>([]);

export const notificationAtom = atom<((notifications: NotificationData[]) => void) | null>(null);
