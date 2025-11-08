import { atomWithStorage } from 'jotai/utils';

export type ScreenRatio = '4:3' | '16:9';

export interface SettingsState {
  screenRatio: ScreenRatio;
  showBootNotification: boolean;
  // 추후 언어, 표시 설정 등 추가 가능
  // language: 'ko' | 'en';
  // displaySettings: {
  //   fontSize: number;
  //   theme: 'light' | 'dark';
  // };
}

export const settingsAtom = atomWithStorage<SettingsState>('settings', {
  screenRatio: '4:3',
  showBootNotification: true,
});

// 설정 스키마 타입 정의
export type SettingInputType = 'radio' | 'checkbox';

export interface RadioOption<T> {
  value: T;
  label: string;
}

export interface SettingItem<K extends keyof SettingsState = keyof SettingsState> {
  type: SettingInputType;
  key: K;
  label: string;
  options?: RadioOption<SettingsState[K]>[];
}

export interface SettingSection {
  title: string;
  items: SettingItem[];
}

// 설정 항목 리스트 정의
export const settingsConfig: SettingSection[] = [
  {
    title: '화면 비율',
    items: [
      {
        type: 'radio',
        key: 'screenRatio',
        label: '',
        options: [
          { value: '4:3', label: '4:3' },
          { value: '16:9', label: '16:9' },
        ],
      },
    ],
  },
  {
    title: '알림',
    items: [
      {
        type: 'checkbox',
        key: 'showBootNotification',
        label: '부팅 시 알림 표시',
      },
    ],
  },
];
