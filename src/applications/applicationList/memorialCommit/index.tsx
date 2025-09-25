import * as _ from './style';
import MemorialTextarea from '@/applications/components/memorialTextarea';
import { useEffect } from 'react';
import { useGetUserMutation } from '@/api/user/getUser.ts';
import { useAtom } from 'jotai';
import { inputContent, inputPortage } from '@/atoms/inputManager.ts';
import { userIdAtom } from '@/atoms/memorialManager.ts';
import { memorialData } from '@/api/memorial/memorialGet.ts';
import { CharacterData } from '@/api/anime/getCharacter.ts';
// import { useAtomValue } from 'jotai';
// import { taskSearchAtom } from '@/atoms/taskTransformer';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  characterData: CharacterData;
  memorialData: memorialData;
  animation: string;
}

const MemorialCommit = ({
  stack,
  push,
  pop,
  top,
  characterData,
  memorialData,
  animation,
}: dataStructureProps) => {
  // const taskSearch = useAtomValue(taskSearchAtom);
  const { mutate: getUser, data, isPending, error } = useGetUserMutation();
  const contentIn = useAtom(inputContent);
  const [inputValue] = useAtom(inputPortage);
  const [userId, setUserId] = useAtom(userIdAtom);

// console.log(contentIn);

  useEffect(() => {
    getUser(undefined, {
      onSuccess: (data) => {
// console.log('성공:', data);
        setUserId(data.data.userId);
      },
      onError: (err) => {
        console.error('에러:', err);
      },
    });
  }, []);

  return (
    <_.Container>
      <_.Section1>
        <_.Header>
          <_.HeaderTextContainer>
            <_.CharacterName>{characterData.name}</_.CharacterName>
            <_.Status>문서 수정 중</_.Status>
          </_.HeaderTextContainer>
          <_.AuthorshipFrom>@{userId}의 수정 요청</_.AuthorshipFrom>
        </_.Header>
        <_.CharacterProfileContainer>
          <_.CharacterProfileInnerContainer>
            <_.CharacterProfileBox>
              <_.CharacterProfile>
                <_.CharacterProfileImg imgUrl={characterData.imageUrl} />
                <_.CharacterProfileName>{characterData.name}</_.CharacterProfileName>
              </_.CharacterProfile>

              <_.CharacterInformation>
                <_.CharacterInformationInner>
                  <_.CharacterInformationRow>
                    <_.CharacterInformationRowAttribute>
                      <_.CharacterInformationRowAttributeText>
                        나이
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        향년 {characterData.age}세
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>

                  <_.CharacterInformationRow>
                    <_.CharacterInformationRowAttribute>
                      <_.CharacterInformationRowAttributeText>
                        사망 날짜
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        {characterData.deathOfDay}
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>

                  <_.CharacterInformationRow>
                    <_.CharacterInformationRowAttribute>
                      <_.CharacterInformationRowAttributeText>
                        생존 기간
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        {characterData.lifeTime}화
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>

                  <_.CharacterInformationRow>
                    <_.CharacterInformationRowAttribute>
                      <_.CharacterInformationRowAttributeText>
                        애니메이션
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        {animation}
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>
                </_.CharacterInformationInner>
              </_.CharacterInformation>
            </_.CharacterProfileBox>
          </_.CharacterProfileInnerContainer>
        </_.CharacterProfileContainer>
      </_.Section1>

      <MemorialTextarea
        btnText="이 내용으로 문서에 병합하기"
        from={userId}
        content={memorialData?.content || ''}
        isPerson={true}
        memorialId={memorialData?.memorialId}
        characterId={characterData?.characterId}
      />
    </_.Container>
  );
};

export default MemorialCommit;
