import IndexMenu from './components/indexMenu';
import * as _ from './style';

const Memorial = () => {
  return (
    <_.Container>
      <_.InnerContainer>
        <_.Section1>
          <_.Header>
            <_.TextContainer>
              <_.Title>호시노 아이</_.Title>
              <_.Subtitle>최근 수정: 2025-07-04 12:34:56</_.Subtitle>
            </_.TextContainer>
            <_.History>기록</_.History>
            <_.DocumentUpdate>문서 수정</_.DocumentUpdate>
          </_.Header>
          <_.ContentContainer>
            <_.IndexWrapper>
              <_.Quote>이 말은 절대로 거짓말이 아니야.</_.Quote>
              <_.Index>
                <_.IndexTitle>목차</_.IndexTitle>
                <IndexMenu text="1. 마지막 순간"></IndexMenu>
                <IndexMenu text="2. 마지막 순간"></IndexMenu>
                <IndexMenu text="3. 마지막 순간"></IndexMenu>
              </_.Index>
            </_.IndexWrapper>
            <_.ProfileContainer>
              <_.ProfileInnerContainer>
                <_.PictureContainer>
                  <_.Picture/>
                  <_.Name>호시노 아이</_.Name>
                </_.PictureContainer>
                <_.Information>
                  <_.Row>
                    <_.Attribute>나이</_.Attribute>
                    <_.Value>향년 20세</_.Value>
                  </_.Row>
                  <_.Row>
                    <_.Attribute>사망 날짜</_.Attribute>
                    <_.Value>2023.04.12</_.Value>
                  </_.Row>
                  <_.Row>
                    <_.Attribute>생존 기간</_.Attribute>
                    <_.Value>1일</_.Value>
                  </_.Row>
                  <_.Row>
                    <_.Attribute>애니메이션</_.Attribute>
                    <_.Value>최애의 아이</_.Value>
                  </_.Row>


                </_.Information>
              </_.ProfileInnerContainer>
            </_.ProfileContainer>
          </_.ContentContainer>
        </_.Section1>

      </_.InnerContainer>
    </_.Container>
  );
}

export default Memorial;