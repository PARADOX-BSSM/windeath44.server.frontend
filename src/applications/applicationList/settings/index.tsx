import * as _ from './style';
import { useAtom, useAtomValue } from 'jotai';
import { settingsAtom, settingsConfig, type SettingsState } from '@/atoms/settings';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import radioButtonSelected from '@/assets/radio/selected.svg';
import radioButtonUnselected from '@/assets/radio/unselected.svg';
import checkIcon from '@/assets/checkbox/check.svg';
import MemorialBtn from '@/applications/components/memorialBtn';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom, reconfirmAlerterAtom } from '@/atoms/alerter';
import { isLogInedAtom } from '@/atoms/windowManager';
import { useDeleteAccount } from '@/api/user/deleteAccount';
import { useGetUserMutation } from '@/api/user/getUser';
import { deleteCookie } from '@/api/auth/cookie';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import { useEffect } from 'react';

const Settings = () => {
  const [settings, setSettings] = useAtom(settingsAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  const setConfirmAlert = useAtomValue(reconfirmAlerterAtom);
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);
  const deleteAccountMutation = useDeleteAccount();
  const { mutate: getUser, data: userData } = useGetUserMutation();

  useEffect(() => {
    if (isLogIned === 'true') {
      getUser();
    }
  }, [isLogIned, getUser]);

  const handleDeleteAccount = () => {
    if (isLogIned !== 'true') {
      setAlert?.(<>로그인 후 이용할 수 있습니다.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    setConfirmAlert?.(Seori, '탈퇴', () => {
      deleteAccountMutation.mutate(userData?.data?.userId, {
        onSuccess: () => {
          taskTransform?.('재확인', '');
          setIsLogIned('false');
          sessionStorage.setItem('hasBootedSession', 'false');
          localStorage.removeItem('isLogIned');
          deleteCookie('access_token');
          location.reload();
        },
        onError: (error) => {
          console.error('계정탈퇴 실패', error);
          setAlert?.(<>계정삭제 요청 중 오류가 발생했습니다.</>, () => {
            taskTransform?.('재확인', '');
            taskTransform?.('경고', '');
          });
        },
      });
    });
  };

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
                            src={
                              settings[item.key] === option.value
                                ? radioButtonSelected
                                : radioButtonUnselected
                            }
                            alt={`${option.label} radio`}
                            draggable={false}
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
                        <_.CheckboxContainer>
                          {Boolean(settings[item.key]) && (
                            <_.CheckIcon
                              src={checkIcon}
                              alt="check"
                              draggable={false}
                            />
                          )}
                        </_.CheckboxContainer>
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

                if (item.type === 'button') {
                  return (
                    <_.Input key={itemIndex}>
                      <MemorialBtn
                        type="submit"
                        name={item.label}
                        onClick={() => {
                          if (item.label === '탈퇴') {
                            handleDeleteAccount();
                          } else if (item.onClick) {
                            item.onClick();
                          }
                        }}
                        active={true}
                        width={item.width || '80px'}
                        height="36px"
                        fontSize="16px"
                      />
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
