import { useState } from 'react';
import * as _ from './style';

const SulkkagiMenu = () => {
  const [showGameDescription, setShowGameDescription] = useState(false);

  const handleStartGame = () => {
    // TODO: 게임 시작 로직 구현
    console.log('게임 시작!');
  };

  const handleExitGame = () => {
    // TODO: 게임 종료 로직 구현
    console.log('게임 종료!');
  };

  const handleToggleDescription = () => {
    setShowGameDescription(!showGameDescription);
  };

  return (
    <_.Container>
      <_.Title>설까기</_.Title>
      <_.Subtitle>최애의 사인 미니게임</_.Subtitle>

      <_.MenuContainer>
        <_.MenuButton onClick={handleStartGame}>
          <_.ButtonIcon>▶</_.ButtonIcon>
          <_.ButtonText>게임 시작</_.ButtonText>
        </_.MenuButton>

        <_.MenuButton onClick={handleToggleDescription}>
          <_.ButtonIcon>?</_.ButtonIcon>
          <_.ButtonText>게임 설명</_.ButtonText>
        </_.MenuButton>

        <_.MenuButton
          onClick={handleExitGame}
          isExit
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
                <p>상대방의 모든 돌을 보드 밖으로 밀어내세요!</p>
              </_.DescriptionSection>

              <_.DescriptionSection>
                <strong>조작법</strong>
                <p>1. 자신의 돌을 클릭하여 선택</p>
                <p>2. 마우스를 드래그하여 방향과 힘 조절</p>
                <p>3. 마우스를 놓으면 돌이 날아갑니다</p>
              </_.DescriptionSection>

              <_.DescriptionSection>
                <strong>승리 조건</strong>
                <p>상대방의 모든 돌이 보드 밖으로 나가면 승리!</p>
                <p>큰 돌은 더 강력하지만 조종하기 어렵습니다.</p>
              </_.DescriptionSection>

              <_.DescriptionSection>
                <strong>추모관</strong>
                <p>보드 밖으로 나간 돌들은 추모합시다.</p>
              </_.DescriptionSection>
            </_.DescriptionText>

            <_.CloseButton onClick={handleToggleDescription}>닫기</_.CloseButton>
          </_.DescriptionContent>
        </_.DescriptionModal>
      )}
    </_.Container>
  );
};

export default SulkkagiMenu;
