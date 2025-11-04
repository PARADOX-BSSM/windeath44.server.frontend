import { atomWithStorage } from 'jotai/utils';

export type ScreenRatio = '4:3' | '16:9';

export interface SettingsState {
  screenRatio: ScreenRatio;
  showBootNotification: boolean;
  testCheckbox: boolean;
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
  testCheckbox: false,
});
