export interface NotificationData {
  title: string;
  content: string;
  is_image: boolean;
  created_at: string;
}

export const DEFAULT_NOTIFICATIONS: NotificationData[] = [
  {
    title: '[공지] 정식 출시 안내 및 데이터 초기화 공지',
    content: 'https://windeath44.s3.ap-northeast-2.amazonaws.com/notification/no3.png',
    is_image: true,
    created_at: '2025-11-05T10:10:00',
  },
  {
    title: '서비스 복구 안내',
    content: 'https://windeath44.s3.ap-northeast-2.amazonaws.com/notification/no2.png',
    is_image: true,
    created_at: '2025-11-04T08:35:00',
  },
  {
    title: '서버 점검 안내',
    content: 'https://windeath44.s3.ap-northeast-2.amazonaws.com/notification/no1.png',
    is_image: true,
    created_at: '2025-10-29T19:55:00',
  },
];
