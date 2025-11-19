import IndexMenu from '@/applications/components/indexMenu';
import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import { useGetCharacter } from '@/api/anime/getCharacter.ts';
import { useEffect, useState, useMemo } from 'react';
import type { CharacterData } from '@/api/anime/getCharacter';
import { parseCustomContent } from '@/lib/customTag/parseCustomContent.tsx';
import { useGetAnimation } from '@/api/anime/getAnimation.ts';
import ribbon from '@/assets/memorial_ribbon.svg';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  characterId: number;
  content: string;
  userId: string;
  prId: number;
}

const MemorialPRPreview = ({
  stack,
  push,
  pop,
  top,
  characterId,
  content,
  userId,
  prId,
}: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  const [indexData, setIndexData] = useState<string[]>([]);

  const [characterData, setCharacterData] = useState<CharacterData>({
    characterId: 0,
    animeId: 0,
    name: '',
    lifeTime: 0,
    deathReason: '',
    causeOfDeathDetails: '',
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

  // content가 변경될 때마다 파싱하여 목차 업데이트
  const parsedContent = useMemo(() => {
    const tempIndexData: string[] = [];
    const result = parseCustomContent(tempIndexData, content);
    setIndexData(tempIndexData);
    return result;
  }, [content]);

  useEffect(() => {
    if (characterId) {
      mutationGetCharacter.mutate(characterId, {
        onError: () => {
          setAlert?.(
            <>
              캐릭터 정보를 가져오는 중 오류가 발생했습니다.
              <br />
              잠시 후 다시 시도해주세요.
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
        },
      });
    }
  }, [characterId]);

  useEffect(() => {
    if (characterData.animeId) {
      mutationAnimation.mutate(characterData.animeId, {
        onError: () => {
          setAlert?.(
            <>
              애니메이션 정보를 가져오는 중 오류가 발생했습니다.
              <br />
              잠시 후 다시 시도해주세요.
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
        },
      });
    }
  }, [characterData.animeId]);

  return (
    <_.Main>
      <_.Container>
        <_.InnerContainer>
          <_.Section1>
            <_.Header>
              <_.TextContainer>
                <_.Title>{characterData.name}</_.Title>
                <_.Subtitle>수정 요청 #{prId} 미리보기 (작성자: {userId})</_.Subtitle>
              </_.TextContainer>
              <_.BackButton
                onClick={() => pop()}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                돌아가기
              </_.BackButton>
            </_.Header>
            <_.ContentContainer>
              <_.IndexWrapper>
                <_.Quote>{characterData.saying}</_.Quote>
                <_.Index>
                  <_.IndexTitle>목차</_.IndexTitle>
                  {indexData.map((item, idx) => {
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
                    <_.Row>
                      <_.Attribute>상세 사인</_.Attribute>
                      <_.Value>{characterData.causeOfDeathDetails}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>애니메이션</_.Attribute>
                      <_.Value>{animation}</_.Value>
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
                  parsedContent
                )}
              </_.ArticleContent>
            </_.ArticleContainer>
          </_.Section2>
        </_.InnerContainer>
      </_.Container>
    </_.Main>
  );
};

export default MemorialPRPreview;
