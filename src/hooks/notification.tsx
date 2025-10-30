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

  const setNotification = (
    notificationsOrTitle: NotificationData[] | string,
    content?: string,
  ) => {
    let notifications: NotificationData[];

    // title, content로 받은 경우
    if (typeof notificationsOrTitle === 'string') {
      const now = new Date().toISOString();
      notifications = [
        {
          notification_id: Date.now(),
          writer_id: 'system',
          title: notificationsOrTitle,
          content: content || '',
          is_open: true,
          end_date: now,
          created_at: now,
          updated_at: now,
        },
      ];
    } else {
      // NotificationData[] 배열로 받은 경우
      notifications = notificationsOrTitle;
    }

    if (notifications && notifications.length > 0) {
      // atom에 공지사항 데이터 저장
      setNotificationList(notifications);

      // 공지사항 창 열기
      if (notificationApp) {
        addTask(notificationApp);
      }
    }
  };

  useEffect(() => {
    setNotificationAtom(() => setNotification);
  }, []);
};
