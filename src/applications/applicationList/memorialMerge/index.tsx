import IndexMenu from '@/applications/components/indexMenu';
import * as _ from './style';
import { index_data } from './data';
import characterUrl from '@/assets/character/hosino.svg';
import MemorialTextarea from '@/applications/components/memorialTextarea';

const MemorialMerge = () => {

  const dummyStatus = true; //true == auto merge가능 , false == conflict 발생

  return (
    <_.Main>
      <_.Container>
        <_.InnerContainer>
          <_.Section1>
            <_.Header>
              <_.TextContainer>
                <_.Title>호시노 아이</_.Title>
                <_.Subtitle>문서 수정 중</_.Subtitle>
              </_.TextContainer>
              <_.CurrentPage>자동 병합이 가능합니다.</_.CurrentPage>
            </_.Header>
            <_.ContentContainer>
              <_.IndexWrapper>
                <_.Quote>이 말은 절대로 거짓말이 아니야.</_.Quote>
                <_.Index>
                  <_.IndexTitle>목차</_.IndexTitle>
                  {
                    index_data.map((item, idx) => {
                      // console.log(idx);
                      return <IndexMenu text={item} idx={idx}></IndexMenu>
                    })
                  }
                </_.Index>
              </_.IndexWrapper>
              <_.ProfileContainer>
                <_.ProfileInnerContainer>
                  <_.PictureContainer>
                    <_.Picture imgUrl={characterUrl} />
                    <_.Plus>+</_.Plus>
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

          <MemorialTextarea from='최종 문서' content='<목차>마지막 순간</목차>
<사진 {80px}>https://buma.wiki/api/image/display/최애의사인/example.png</사진>
<동영상>https://www.youtube.com/watch?v=oMk46C5Cjws</동영상>' />

          <MemorialTextarea from='기존 문서' content='<목차>마지막 순간</목차>
<사진 {80px}>https://buma.wiki/api/image/display/최애의사인/example.png</사진>
<동영상>https://www.youtube.com/watch?v=oMk46C5Cjws</동영상>' 
            isReadonly={true} 
          />


          <MemorialTextarea btnText='이 내용으로 문서에 병합하기' from='winshine1034' content='<목차>마지막 순간</목차>
<사진 {80px}>https://buma.wiki/api/image/display/최애의사인/example.png</사진>
<동영상>https://www.youtube.com/watch?v=oMk46C5Cjws</동영상>'
            isReadonly={true}
            isPerson={true}
          />

          <MemorialTextarea btnText='이 내용으로 문서에 병합하기' from='bitbyte08' content='<목차>마지막 순간</목차>
<사진 {80px}>https://buma.wiki/api/image/display/최애의사인/example.png</사진>
<동영상>https://www.youtube.com/watch?v=oMk46C5Cjws</동영상>'isReadonly={true}
            isPerson={true}
          />

          <_.Section3>
            <_.ArticleContainer>
              <_.ArticleTitle>1. 마지막 순간</_.ArticleTitle>
              <_.ArticleContent>
                돔공연 축하해....
              </_.ArticleContent>
            </_.ArticleContainer>
          </_.Section3>

        </_.InnerContainer>
      </_.Container>
    </_.Main>
  );
}

export default MemorialMerge;