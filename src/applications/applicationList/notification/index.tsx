import * as _ from './style';
import { useGetPublicNotificationsQuery } from '@/api/notification/getPublicNotifications';
import Loading from '@/applications/components/loading';
import { useAtomValue } from 'jotai';
import { notificationListAtom } from '@/atoms/notification';
import { useState } from 'react';
import type { NotificationData } from '@/api/notification/getPublicNotifications';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

const Notification = () => {
  const { data, isLoading } = useGetPublicNotificationsQuery();
  const atomNotifications = useAtomValue(notificationListAtom);
  const [selectedNotification, setSelectedNotification] = useState<NotificationData | null>(null);

  // atom에 데이터가 있으면 우선 사용 (서버가 멈췄을 때 프론트에서 설정한 데이터)
  const notifications = atomNotifications.length > 0 ? atomNotifications : (data?.data || []);
  const openNotifications = notifications.filter((n) => n.is_open);

  if (isLoading && atomNotifications.length === 0) {
    return <Loading />;
  }

  if (openNotifications.length === 0) {
    return null;
  }

  // 상세 내용 보기
  if (selectedNotification) {
    return (
      <_.Container>
        <_.InnerContainer>
          <_.ContentContainer>
            <_.DetailView>
              <_.DetailHeader>
                <_.BackButton
                  onClick={() => setSelectedNotification(null)}
                  onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                  onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                >
                  ← 목록으로
                </_.BackButton>
              </_.DetailHeader>
              {selectedNotification.is_image ? (
                <_.DetailImage src={selectedNotification.content} alt={selectedNotification.title} />
              ) : (
                <>
                  <_.DetailTitle>{selectedNotification.title}</_.DetailTitle>
                  <_.DetailContent>{selectedNotification.content}</_.DetailContent>
                  <_.DetailDate>작성일: {selectedNotification.created_at}</_.DetailDate>
                </>
              )}
            </_.DetailView>
          </_.ContentContainer>
        </_.InnerContainer>
      </_.Container>
    );
  }

  // 리스트 보기
  return (
    <_.Container>
      <_.InnerContainer>
        <_.ContentContainer>
          {openNotifications.map((notification) => (
            <_.NotificationItem
              key={notification.notification_id}
              onClick={() => setSelectedNotification(notification)}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            >
              <_.ItemHeader>
                <_.ItemTitle>{notification.title}</_.ItemTitle>
                <_.ItemDate>{notification.created_at}</_.ItemDate>
              </_.ItemHeader>
            </_.NotificationItem>
          ))}
        </_.ContentContainer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default Notification;
