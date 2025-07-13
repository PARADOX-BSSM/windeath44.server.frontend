import IndexMenu from '@/applications/components/indexMenu';
import * as _ from './style';
import { index_data } from './data';
import { useAtom } from 'jotai';
import { inputContent, inputPortage } from '@/atoms/inputManager';
import { parseCustomContent } from '@/lib/customTag/parseCustomContent';

const MemorialPreview = () => {
  const [inputValue] = useAtom(inputPortage);
  const [contentIn] = useAtom(inputContent);

  return (
    <_.Main>
      <_.Container>
        <_.InnerContainer>
          <_.Section1>
            <_.Header>
              <_.TextContainer>
                <_.Title>{inputValue.name}</_.Title>
                <_.Subtitle>최근 수정: 2025-07-04 12:34:56</_.Subtitle>
              </_.TextContainer>
              <_.CurrentPage>문서 수정본 미리보기</_.CurrentPage>
            </_.Header>
            <_.ContentContainer>
              <_.IndexWrapper>
                <_.Quote>이 말은 절대로 거짓말이 아니야.</_.Quote>
                <_.Index>
                  <_.IndexTitle>목차</_.IndexTitle>
                  {index_data.map((item, idx) => {
                    // console.log(idx);
                    return (
                      <IndexMenu
                        text={item}
                        idx={idx}
                      ></IndexMenu>
                    );
                  })}
                </_.Index>
              </_.IndexWrapper>
              <_.ProfileContainer>
                <_.ProfileInnerContainer>
                  <_.PictureContainer>
                    <_.Picture imgUrl={inputValue.profileImage} />
                    <_.Name>{inputValue.name}</_.Name>
                  </_.PictureContainer>
                  <_.Information>
                    <_.Row>
                      <_.Attribute>나이</_.Attribute>
                      <_.Value>{inputValue.age}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>사망 날짜</_.Attribute>
                      <_.Value>{inputValue.date}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>생존 기간</_.Attribute>
                      <_.Value>{inputValue.lifeCycle}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>사인</_.Attribute>
                      <_.Value>{inputValue.deathReason}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>애니메이션</_.Attribute>
                      <_.Value>{inputValue.anime}</_.Value>
                    </_.Row>
                  </_.Information>
                </_.ProfileInnerContainer>
              </_.ProfileContainer>
            </_.ContentContainer>
          </_.Section1>

          <_.Section2>
            <_.ArticleContainer>
              <_.ArticleContent>{parseCustomContent(contentIn.content)}</_.ArticleContent>
            </_.ArticleContainer>
          </_.Section2>
        </_.InnerContainer>
      </_.Container>
    </_.Main>
  );
};

export default MemorialPreview;
