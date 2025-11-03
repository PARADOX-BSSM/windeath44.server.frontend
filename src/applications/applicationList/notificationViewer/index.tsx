import * as _ from './style';
import { useAtomValue } from 'jotai';
import { notificationListAtom } from '@/atoms/notification';

const NotificationViewer = () => {
  const atomNotifications = useAtomValue(notificationListAtom);

  // 가장 최신 공지사항 (첫 번째)
  const latestNotification = atomNotifications[0];

  if (!latestNotification) {
    return null;
  }

  return (
    <_.Wrapper>
      <_.Container>
        <_.InnerContainer>
          <_.ContentContainer>
            <_.DetailView>
              {latestNotification.is_image ? (
                <_.DetailImage src={latestNotification.content} alt={latestNotification.title} />
              ) : (
                <>
                  <_.DetailTitle>{latestNotification.title}</_.DetailTitle>
                  <_.DetailContent>{latestNotification.content}</_.DetailContent>
                  <_.DetailDate>작성일: {latestNotification.created_at}</_.DetailDate>
                </>
              )}
            </_.DetailView>
          </_.ContentContainer>
        </_.InnerContainer>
      </_.Container>
    </_.Wrapper>
  );
};

export default NotificationViewer;
