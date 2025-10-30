import * as _ from './style';
import { useGetPublicNotificationsQuery } from '@/api/notification/getPublicNotifications';
import Loading from '@/applications/components/loading';
import { useAtomValue } from 'jotai';
import { notificationListAtom } from '@/atoms/notification';

const Notification = () => {
  const { data, isLoading } = useGetPublicNotificationsQuery();
  const atomNotifications = useAtomValue(notificationListAtom);

  // atom에 데이터가 있으면 우선 사용 (서버가 멈췄을 때 프론트에서 설정한 데이터)
  const notifications = atomNotifications.length > 0 ? atomNotifications : (data?.data || []);
  const openNotifications = notifications.filter((n) => n.is_open);

  if (isLoading && atomNotifications.length === 0) {
    return <Loading />;
  }

  if (openNotifications.length === 0) {
    return null;
  }

  return (
    <_.Container>
      <_.InnerContainer>
        <_.ContentContainer>
          {openNotifications.map((notification) => (
            <_.NotificationItem key={notification.notification_id}>
              <_.Title>{notification.title}</_.Title>
              <_.Content>{notification.content}</_.Content>
              <_.Date>작성일: {notification.created_at}</_.Date>
            </_.NotificationItem>
          ))}
        </_.ContentContainer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default Notification;
