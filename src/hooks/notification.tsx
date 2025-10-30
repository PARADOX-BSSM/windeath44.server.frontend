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

  const setNotification = (notifications: NotificationData[]) => {
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
