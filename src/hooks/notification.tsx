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
    notifications:
      | NotificationData[]
      | Array<{ title: string; content?: string; is_image?: boolean; created_at?: string }>,
  ) => {
    let finalNotifications: NotificationData[];

    // { title, content, is_image, created_at } 객체 배열로 받은 경우
    if (
      notifications.length > 0 &&
      'title' in notifications[0] &&
      !('notification_id' in notifications[0])
    ) {
      const now = new Date().toISOString();
      finalNotifications = notifications.map((item, index) => {
        const simpleItem = item as { title: string; content?: string; is_image?: boolean; created_at?: string };
        return {
          notification_id: Date.now() + index,
          writer_id: 'system',
          title: simpleItem.title,
          content: simpleItem.content || '',
          is_open: true,
          is_image: simpleItem.is_image,
          end_date: now,
          created_at: simpleItem.created_at || now,
          updated_at: now,
        };
      });
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

      // 긴급 공지사항(만약 무조건 띄워야 하는 공지가 있다면 이거 주석 해제하고 사용할 것)
      // if (notificationViewerApp) {
      //   addTask(notificationViewerApp);
      // }
    }
  };

  useEffect(() => {
    setNotificationAtom(() => setNotification);
  }, []);
};
