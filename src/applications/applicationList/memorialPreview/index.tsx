import IndexMenu from '@/applications/components/indexMenu';
import * as _ from './style';
import { useAtom } from 'jotai';
import { inputContent, inputPortage } from '@/atoms/inputManager';
import { parseCustomContent } from '@/lib/customTag/parseCustomContent';
import ribbon from '@/assets/memorial_ribbon.svg';
import { useMemo, useState } from 'react';

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, '0');
  const D = String(d.getDate()).padStart(2, '0');
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? '오후' : '오전';
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${Y}-${M}-${D}. ${ampm} ${h}:${m}`;
};

const MemorialPreview = () => {
  const [inputValue] = useAtom(inputPortage);
  const [contentIn] = useAtom(inputContent);
  const [indexData, setIndexData] = useState<string[]>([]);
  const currentDate = new Date().toISOString();

  // content가 변경될 때마다 파싱하여 목차 업데이트
  const parsedContent = useMemo(() => {
    const tempIndexData: string[] = [];
    const result = parseCustomContent(tempIndexData, contentIn.content);
    setIndexData(tempIndexData);
    return result;
  }, [contentIn.content]);

  return (
    <_.Main>
      <_.Container>
        <_.InnerContainer>
          <_.Section1>
            <_.Header>
              <_.TextContainer>
                <_.Title>{inputValue.name}</_.Title>
                <_.Subtitle>최근 수정: {formatDate(currentDate)}</_.Subtitle>
              </_.TextContainer>
              <_.CurrentPage>문서 수정본 미리보기</_.CurrentPage>
            </_.Header>
            <_.ContentContainer>
              <_.IndexWrapper>
                <_.Quote>{inputValue.phrase}</_.Quote>
                <_.Index>
                  <_.IndexTitle>목차</_.IndexTitle>
                  {indexData.map((item, idx) => {
                    // console.log(idx);
                    return (
                      <IndexMenu
                        text={item}
                        idx={idx}
                        key={`index-${idx}`}
                      ></IndexMenu>
                    );
                  })}
                </_.Index>
              </_.IndexWrapper>
              <_.ProfileContainer>
                <_.ProfileInnerContainer>
                  <_.PictureContainer>
                    <_.Ribbon
                      src={ribbon}
                      alt="ribbon"
                    />
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
                      <_.Attribute>사인</_.Attribute>
                      <_.Value>{inputValue.deathReason}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>상세 사인</_.Attribute>
                      <_.Value>{inputValue.causeOfDeathDetails}</_.Value>
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
              <_.ArticleContent>
                {parsedContent}
              </_.ArticleContent>
            </_.ArticleContainer>
          </_.Section2>
        </_.InnerContainer>
      </_.Container>
    </_.Main>
  );
};

export default MemorialPreview;
