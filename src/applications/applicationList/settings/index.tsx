import * as _ from './style';
import { useAtom } from 'jotai';
import { settingsAtom, type ScreenRatio } from '@/atoms/settings';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

const radioButtonSelected = 'http://localhost:3845/assets/95657640fe36fee6c1e4de89f9edf3543959ea37.svg';
const radioButtonUnselected = 'http://localhost:3845/assets/e2a6764f10f473ad3025a6ba7c33ccb1059c0831.svg';

const Settings = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const handleScreenRatioChange = (ratio: ScreenRatio) => {
    setSettings({ ...settings, screenRatio: ratio });
  };

  const handleCheckboxChange = (field: 'showBootNotification' | 'testCheckbox') => {
    setSettings({ ...settings, [field]: !settings[field] });
  };

  return (
    <_.Container>
      <_.WindowFrame>
        <_.Setting>
          <_.SectionTitle>화면 비율</_.SectionTitle>
          <_.InputContainer>
            <_.Input>
              <_.Label
                onClick={() => handleScreenRatioChange('4:3')}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                <_.RadioButtonIcon>
                  <img
                    src={settings.screenRatio === '4:3' ? radioButtonSelected : radioButtonUnselected}
                    alt="4:3 radio"
                  />
                </_.RadioButtonIcon>
                <_.LabelText>4:3</_.LabelText>
                <_.HiddenInput
                  type="radio"
                  name="screenRatio"
                  value="4:3"
                  checked={settings.screenRatio === '4:3'}
                  onChange={() => handleScreenRatioChange('4:3')}
                />
              </_.Label>
            </_.Input>
            <_.Input>
              <_.Label
                onClick={() => handleScreenRatioChange('16:9')}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                <_.RadioButtonIcon>
                  <img
                    src={settings.screenRatio === '16:9' ? radioButtonSelected : radioButtonUnselected}
                    alt="16:9 radio"
                  />
                </_.RadioButtonIcon>
                <_.LabelText>16:9</_.LabelText>
                <_.HiddenInput
                  type="radio"
                  name="screenRatio"
                  value="16:9"
                  checked={settings.screenRatio === '16:9'}
                  onChange={() => handleScreenRatioChange('16:9')}
                />
              </_.Label>
            </_.Input>
          </_.InputContainer>
        </_.Setting>

        <_.Setting>
          <_.SectionTitle>알림</_.SectionTitle>
          <_.InputContainer>
            <_.Input>
              <_.Label
                onClick={() => handleCheckboxChange('showBootNotification')}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                <_.CheckboxIcon checked={settings.showBootNotification} />
                <_.LabelText>부팅 시 알림 표시</_.LabelText>
                <_.HiddenInput
                  type="checkbox"
                  checked={settings.showBootNotification}
                  onChange={() => handleCheckboxChange('showBootNotification')}
                />
              </_.Label>
            </_.Input>
          </_.InputContainer>
        </_.Setting>

        <_.Setting>
          <_.SectionTitle>테스트 설정</_.SectionTitle>
          <_.InputContainer>
            <_.Input>
              <_.Label
                onClick={() => handleCheckboxChange('testCheckbox')}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                <_.CheckboxIcon checked={settings.testCheckbox} />
                <_.LabelText>선택되지 않은 체크박스 예시</_.LabelText>
                <_.HiddenInput
                  type="checkbox"
                  checked={settings.testCheckbox}
                  onChange={() => handleCheckboxChange('testCheckbox')}
                />
              </_.Label>
            </_.Input>
          </_.InputContainer>
        </_.Setting>
      </_.WindowFrame>
    </_.Container>
  );
};

export default Settings;
