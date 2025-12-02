import * as _ from './style';
import { useEffect, useState } from 'react';
import HommerBackground from '@/assets/community/homer_background.png';
import Hommer from '@/assets/community/hommer.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useAtomValue } from 'jotai';
import { useJudgmentSearchTop } from '@/api/judgement/judgmentSearchTop';
import { useGetCharactersByCharacterIds } from '@/api/anime/getCharactersByCharacterIds';
import { CharacterData } from '@/api/anime/getCharacter';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

const JudgementPreview = () => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [charactersData, setCharactersData] = useState<CharacterData[]>([]);

  const { data, isSuccess } = useJudgmentSearchTop();
  const { mutate: getCharacters } = useGetCharactersByCharacterIds(setCharactersData);

  useEffect(() => {
    if (isSuccess && data?.data?.content) {
      const characterIds = data.data.content.map((item: any) => item.characterId);
      if (characterIds.length > 0) {
        getCharacters(characterIds);
      }
    }
  }, [isSuccess, data, getCharacters]);
  return (
    <_.Judgement>
      <_.NavJudgement>
        <_.JudgementImgDiv
          background={HommerBackground}
          onClick={() => {
            if (taskTransform) taskTransform('', '재판');
          }}
          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
          <_.JudgementImg src={Hommer} />
        </_.JudgementImgDiv>
        <_.JudgementText
          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
          재판으로
        </_.JudgementText>
      </_.NavJudgement>

      <_.JudgementLankArea>
        <_.JudgementText>진행중인 재판</_.JudgementText>
        <_.JudgementLankList>
          {data?.data?.content?.map((rank: any) => {
            const character = charactersData.find((c) => c?.characterId === rank.characterId);
            return (
              <_.JudgementLank key={rank.characterId}>
                <_.JudgementLankNum>#{rank.rank}</_.JudgementLankNum>
                <_.JudgementName>{character?.name || '로딩중...'}</_.JudgementName>
              </_.JudgementLank>
            );
          })}
        </_.JudgementLankList>
      </_.JudgementLankArea>
    </_.Judgement>
  );
};
export default JudgementPreview;
