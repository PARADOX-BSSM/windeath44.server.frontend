import * as _ from './style';

import setting from '@/assets/appIcons/setting.svg';
import folder from '@/assets/search/folder.svg';
import rythmGame from '@/assets/appIcons/piano.svg';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

interface AdminItem {
  id: string;
  icon: string;
  label: string;
}

const GameApp = () => {
  const adminItems: AdminItem[] = [
    { id: '1', icon: rythmGame, label: '리듬게임' },
    { id: '2', icon: setting, label: '설까기' },
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

export default GameApp;
