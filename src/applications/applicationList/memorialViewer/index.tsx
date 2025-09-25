import IndexMenu from '@/applications/components/indexMenu';
import * as _ from './style';
import { index_data } from '../memorial/data';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import { useGetCharacter } from '@/api/anime/getCharacter.ts';
import { useEffect, useState } from 'react';
import type { CharacterData } from '@/api/anime/getCharacter';
import { parseCustomContent } from '@/lib/customTag/parseCustomContent.tsx';
import { useGetAnimation } from '@/api/anime/getAnimation.ts';
import ribbon from '@/assets/memorial_ribbon.svg';
import Choten from '@/assets/profile/choten.svg';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  characterId: number;
  content: string;
}

const MemorialViewer = ({ stack, push, pop, top, characterId, content }: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);

  const [characterData, setCharacterData] = useState<CharacterData>({
    characterId: 0,
    animeId: 0,
    name: '',
    lifeTime: 0,
    deathReason: '',
    imageUrl: '',
    bowCount: 0,
    age: 0,
    saying: '',
    state: '',
    deathOfDay: '',
  });

  const mutationGetCharacter = useGetCharacter(setCharacterData);
  const [animation, setAnimation] = useState<string>('');
  const mutationAnimation = useGetAnimation(setAnimation);

  useEffect(() => {
    if (characterId) {
      mutationGetCharacter.mutate(characterId);
      mutationAnimation.mutate(characterId);
    }
  }, [characterId]);

  // 에러 처리
  useEffect(() => {
    if (mutationGetCharacter.isError) {
      setAlert?.(
        Choten,
        <>
          캐릭터 정보를 가져오는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    }
  }, [mutationGetCharacter.isError, setAlert, taskTransform]);

  return (
    <_.Main>
      <_.Container>
        <_.InnerContainer>
          <_.Section1>
            <_.Header>
              <_.TextContainer>
                <_.Title>{characterData.name}</_.Title>
                <_.Subtitle>수정 기록 보기</_.Subtitle>
              </_.TextContainer>
              <_.BackButton onClick={() => taskTransform?.('추모관 뷰어', '')}>
                돌아가기
              </_.BackButton>
            </_.Header>
            <_.ContentContainer>
              <_.IndexWrapper>
                <_.Quote>{characterData.saying}</_.Quote>
                <_.Index>
                  <_.IndexTitle>목차</_.IndexTitle>
                  {index_data.map((item, idx) => {
                    return (
                      <IndexMenu
                        key={idx}
                        text={item}
                        idx={idx}
                      />
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
                    <_.Picture imgUrl={characterData.imageUrl} />
                  </_.PictureContainer>
                  <_.Information>
                    <_.Row>
                      <_.Attribute>이름</_.Attribute>
                      <_.Value>{characterData.name}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>나이</_.Attribute>
                      <_.Value>{characterData.age}세</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>사망일</_.Attribute>
                      <_.Value>{characterData.deathOfDay}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>사망 원인</_.Attribute>
                      <_.Value>{characterData.deathReason}</_.Value>
                    </_.Row>
                  </_.Information>
                </_.ProfileInnerContainer>
              </_.ProfileContainer>
            </_.ContentContainer>
          </_.Section1>
          <_.Section2>
            <_.ArticleContainer>
              <_.ArticleContent>
                {mutationGetCharacter.isPending ? (
                  <_.LoadingText>캐릭터 정보를 불러오는 중...</_.LoadingText>
                ) : (
                  parseCustomContent(index_data, content)
                )}
              </_.ArticleContent>
            </_.ArticleContainer>
          </_.Section2>
        </_.InnerContainer>
      </_.Container>
    </_.Main>
  );
};

export default MemorialViewer;
