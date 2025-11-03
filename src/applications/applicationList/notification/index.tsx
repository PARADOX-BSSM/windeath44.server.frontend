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

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const Y = d.getFullYear();
    const M = String(d.getMonth() + 1).padStart(2, '0');
    const D = String(d.getDate()).padStart(2, '0');
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? '오후' : '오전';
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    return `등록일 ${Y}-${M}-${D}. ${ampm} ${h}:${m}`;
  };

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
                  <_.DetailDate>{formatDate(selectedNotification.created_at)}</_.DetailDate>
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
                <_.ItemDate>{formatDate(notification.created_at)}</_.ItemDate>
              </_.ItemHeader>
            </_.NotificationItem>
          ))}
        </_.ContentContainer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default Notification;
