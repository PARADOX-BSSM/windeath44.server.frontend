import * as _ from './style';
import seori from '@/assets/seori/seori_default_left.png';

const TeachingChatBot = () => {
  return (
    <_.Container>
      <_.TopContainer>
        <_.TopInnerFirst>
          <_.TopInnerFirstBox>
            <_.TopInnerFirstSpan>‘호시노 아이’가 되어 대답해줘!</_.TopInnerFirstSpan>
          </_.TopInnerFirstBox>
          <_.TopInnerFirstImg src={seori} />
        </_.TopInnerFirst>
        <_.TopInnerSecond>
          <_.TopInnerSecondSpan>날씨가 너무 더운데 괜찮아?</_.TopInnerSecondSpan>
        </_.TopInnerSecond>
      </_.TopContainer>
      <_.BottomContainer>
        <_.BottomContainerInput
          type="text"
          placeholder="캐릭터에 이입하여 답변해주세요!"
        ></_.BottomContainerInput>
      </_.BottomContainer>
    </_.Container>
  );
};

export default TeachingChatBot;
