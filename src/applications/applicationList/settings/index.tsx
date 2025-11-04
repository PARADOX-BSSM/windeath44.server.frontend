import * as _ from './style';
import { useAtom } from 'jotai';
import { settingsAtom, settingsConfig, type SettingsState } from '@/atoms/settings';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

const radioButtonSelected = 'http://localhost:3845/assets/95657640fe36fee6c1e4de89f9edf3543959ea37.svg';
const radioButtonUnselected = 'http://localhost:3845/assets/e2a6764f10f473ad3025a6ba7c33ccb1059c0831.svg';

const Settings = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const handleValueChange = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleCheckboxToggle = (key: keyof SettingsState) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <_.Container>
      <_.WindowFrame>
        {settingsConfig.map((section, sectionIndex) => (
          <_.Setting key={sectionIndex}>
            <_.SectionTitle>{section.title}</_.SectionTitle>
            <_.InputContainer>
              {section.items.map((item, itemIndex) => {
                if (item.type === 'radio' && item.options) {
                  return item.options.map((option) => (
                    <_.Input key={`${itemIndex}-${String(option.value)}`}>
                      <_.Label
                        onClick={() => handleValueChange(item.key, option.value)}
                        onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                        onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                      >
                        <_.RadioButtonIcon>
                          <img
                            src={settings[item.key] === option.value ? radioButtonSelected : radioButtonUnselected}
                            alt={`${option.label} radio`}
                          />
                        </_.RadioButtonIcon>
                        <_.LabelText>{option.label}</_.LabelText>
                        <_.HiddenInput
                          type="radio"
                          name={item.key}
                          value={String(option.value)}
                          checked={settings[item.key] === option.value}
                          onChange={() => handleValueChange(item.key, option.value)}
                        />
                      </_.Label>
                    </_.Input>
                  ));
                }

                if (item.type === 'checkbox') {
                  return (
                    <_.Input key={itemIndex}>
                      <_.Label
                        onClick={() => handleCheckboxToggle(item.key)}
                        onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                        onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                      >
                        <_.CheckboxIcon checked={Boolean(settings[item.key])} />
                        <_.LabelText>{item.label}</_.LabelText>
                        <_.HiddenInput
                          type="checkbox"
                          checked={Boolean(settings[item.key])}
                          onChange={() => handleCheckboxToggle(item.key)}
                        />
                      </_.Label>
                    </_.Input>
                  );
                }

                return null;
              })}
            </_.InputContainer>
          </_.Setting>
        ))}
      </_.WindowFrame>
    </_.Container>
  );
};

export default Settings;
