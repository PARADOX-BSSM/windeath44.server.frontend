import { useSetAtom } from 'jotai';
import useApps from '@/applications/data/importManager';
import { useEffect } from 'react';
import { notificationAtom, notificationListAtom } from '@/atoms/notification';
import { useProcessManager } from './processManager';
import { NotificationData } from '@/api/notification/getPublicNotifications';

export const useNotification = () => {
  const setNotificationAtom = useSetAtom(notificationAtom);
  const setNotificationList = useSetAtom(notificationListAtom);

  const Apps = useApps();
  const [, addTask] = useProcessManager();

  const notificationApp = Apps.filter((app) => {
    return app.name === '공지사항';
  })[0];

  const notificationViewerApp = Apps.filter((app) => {
    return app.name === '공지사항 뷰어';
  })[0];

  const setNotification = (
    notifications: NotificationData[] | Array<{ title: string; content?: string; is_image?: boolean }>,
  ) => {
    let finalNotifications: NotificationData[];

    // { title, content, is_image } 객체 배열로 받은 경우
    if (notifications.length > 0 && 'title' in notifications[0] && !('notification_id' in notifications[0])) {
      const now = new Date().toISOString();
      finalNotifications = notifications.map((item, index) => ({
        notification_id: Date.now() + index,
        writer_id: 'system',
        title: (item as { title: string; content?: string; is_image?: boolean }).title,
        content: (item as { title: string; content?: string; is_image?: boolean }).content || '',
        is_open: true,
        is_image: (item as { title: string; content?: string; is_image?: boolean }).is_image,
        end_date: now,
        created_at: now,
        updated_at: now,
      }));
    } else {
      // NotificationData[] 배열로 받은 경우
      finalNotifications = notifications as NotificationData[];
    }

    if (finalNotifications && finalNotifications.length > 0) {
      // atom에 공지사항 데이터 저장
      setNotificationList(finalNotifications);

      // 공지사항 리스트 창 열기
      if (notificationApp) {
        addTask(notificationApp);
      }

      // 첫 번째 공지사항을 뷰어로도 열기
      if (notificationViewerApp) {
        addTask(notificationViewerApp);
      }
    }
  };

  useEffect(() => {
    setNotificationAtom(() => setNotification);
  }, []);
};
