import * as _ from './style';
import React from 'react';
import folder from '@/assets/search/folder.svg';
import rythmGame from '@/assets/appIcons/piano.svg';
import game from '@/assets/appIcons/game.svg';

import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { useAtomValue } from 'jotai';

const gameItems = [
  { icon: rythmGame, name: '리듬게임' },
  { icon: game, name: '설까기' },
];

const Game: React.FC = () => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  return (
    <_.Container>
      <_.MainWindow>
        <_.ItemContainer>
          {gameItems.map((item, index) => (
            <_.GameItem
              key={index}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              onClick={() => taskTransform?.('아케이드', '설까기')}
            >
              <_.GameIcon
                src={item.icon}
                draggable="false"
              />
              <_.GameName>{item.name}</_.GameName>
            </_.GameItem>
          ))}
        </_.ItemContainer>
        <_.StatusBar>
          <_.StatusContent>
            <_.FolderIcon src={folder} />
            <_.StatusText>{gameItems.length} 개체</_.StatusText>
          </_.StatusContent>
        </_.StatusBar>
      </_.MainWindow>
    </_.Container>
  );
};

export default Game;
