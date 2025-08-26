import * as _ from './style';

import setting from '@/assets/appIcons/setting.svg';
import folder from '@/assets/search/folder.svg';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

interface AdminItem {
  id: string;
  icon: string;
  label: string;
}

const AdminApp = () => {
  const adminItems: AdminItem[] = [
    { id: '1', icon: setting, label: '(C:)' },
    { id: '2', icon: setting, label: '(D:)' },
    { id: '3', icon: setting, label: '추모관 신청 목록' },
    { id: '4', icon: setting, label: '유저 관리' },
  ];

  return (
    <_.Container>
      <_.MainContent>
        <_.ItemsList>
          {adminItems.map((item) => (
            <_.ItemRow
              key={item.id}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            >
              <_.ItemIcon
                src={item.icon}
                alt={item.label}
              />
              <_.ItemLabel>{item.label}</_.ItemLabel>
            </_.ItemRow>
          ))}
        </_.ItemsList>

        <_.StatusBar>
          <_.StatusContent>
            <_.StatusIcon
              src={folder}
              alt="folder"
            />
            <_.StatusText>{adminItems.length} 개체</_.StatusText>
          </_.StatusContent>
        </_.StatusBar>
      </_.MainContent>
    </_.Container>
  );
};

export default AdminApp;
