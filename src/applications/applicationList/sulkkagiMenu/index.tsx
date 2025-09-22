import { useState } from 'react';
import * as _ from './style';
import { useAtomValue, useSetAtom } from 'jotai';
import { taskSearchAtom } from '@/atoms/taskTransformer';
import { useProcessManager } from '@/hooks/processManager';
import { CURSOR_IMAGES, setCursorImage } from '@/lib/setCursorImg';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const SulkkagiMenu = ({ stack, push, pop, top }: dataStructureProps) => {
  const [showGameDescription, setShowGameDescription] = useState(false);

  const taskSearch = useAtomValue(taskSearchAtom);
  const [, , removeTask] = useProcessManager();

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  const handleStartGame = () => {
    // AI 모드로 게임 시작
    const aiStackProps = { ...stackProps, gameMode: 'ai' };
    push(taskSearch?.('sulkkagiMain', aiStackProps));
  };

  const handleStartPvpGame = () => {
    // PvP 모드로 게임 시작
    const pvpStackProps = { ...stackProps, gameMode: 'pvp' };
    push(taskSearch?.('sulkkagiMain', pvpStackProps));
  };

  const handleExitGame = () => {
    removeTask(taskSearch?.('설까기')!);
  };

  const handleToggleDescription = () => {
    setShowGameDescription(!showGameDescription);
  };

  return (
    <_.Container>
      <_.Title>설까기</_.Title>
      <_.Subtitle>최애의 사인 미니게임</_.Subtitle>

      <_.MenuContainer>
        <_.MenuButton
          onClick={handleStartGame}
          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
          <_.ButtonIcon>▷</_.ButtonIcon>
          <_.ButtonText>컴퓨터와 대전</_.ButtonText>
        </_.MenuButton>

        <_.MenuButton
          onClick={handleStartPvpGame}
          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
          <_.ButtonIcon>▶</_.ButtonIcon>
          <_.ButtonText>친구와 대전</_.ButtonText>
        </_.MenuButton>

        <_.MenuButton
          onClick={handleToggleDescription}
          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
          <_.ButtonIcon>?</_.ButtonIcon>
          <_.ButtonText>게임 설명</_.ButtonText>
        </_.MenuButton>

        <_.MenuButton
          onClick={handleExitGame}
          isExit
          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
          <_.ButtonIcon>×</_.ButtonIcon>
          <_.ButtonText>나가기</_.ButtonText>
        </_.MenuButton>
      </_.MenuContainer>

      {showGameDescription && (
        <_.DescriptionModal>
          <_.DescriptionContent>
            <_.DescriptionTitle>설까기 게임 설명</_.DescriptionTitle>
            <_.DescriptionText>
              <_.DescriptionSection>
                <strong>게임 목표</strong>
                <p>상대방의 모든 설을 보드 밖으로 밀어내세요!</p>
              </_.DescriptionSection>

              <_.DescriptionSection>
                <strong>조작법</strong>
                <p>1. 자신의 설을 클릭하여 선택</p>
                <p>2. 마우스를 드래그하여 방향과 힘 조절</p>
                <p>3. 마우스를 놓으면 설이 날아갑니다</p>
              </_.DescriptionSection>

              <_.DescriptionSection>
                <strong>추모관</strong>
                <p>보드 밖으로 나간 설들을 추모합시다.</p>
              </_.DescriptionSection>

              <_.DescriptionSection>
                <strong>참고</strong>
                <p>1. 큰 설은 더 강력하지만 꽤나 무겁습니다.</p>
                <p>2. 이 게임은 적당한 피지컬을 요구합니다.</p>
              </_.DescriptionSection>
            </_.DescriptionText>

            <_.CloseButton
              onClick={handleToggleDescription}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            >
              닫기
            </_.CloseButton>
          </_.DescriptionContent>
        </_.DescriptionModal>
      )}
    </_.Container>
  );
};

export default SulkkagiMenu;
