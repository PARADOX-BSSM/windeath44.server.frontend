import * as _ from './style';
import MemorialTextarea from '@/applications/components/memorialTextarea';
import { useEffect, useState } from 'react';
import { useGetUserMutation } from '@/api/user/getUser.ts';
import { useAtom, useAtomValue } from 'jotai';
import { inputContent, inputPortage } from '@/atoms/inputManager.ts';
import { userIdAtom } from '@/atoms/memorialManager.ts';
import type { CharacterData } from '@/api/anime/getCharacter';
import { useGetCharacter } from '@/api/anime/getCharacter.ts';
import { useGetAnimation } from '@/api/anime/getAnimation.ts';
import { useGetMemorialApplicationQuery } from '@/api/memorial/getMemorialApplication';
import { useUpdateCharacter } from '@/api/anime/updateCharacter';
import { useUpdateMemorialApplication } from '@/api/memorial/updateMemorialApplication';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom, taskSearchAtom } from '@/atoms/taskTransformer';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import Loading from '@/applications/components/loading';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  memorialApplicationId: number;
}

const MemorialEdit = ({
  stack,
  push,
  pop,
  top,
  memorialApplicationId,
}: dataStructureProps) => {
  const { mutate: getUser, data, isPending, error } = useGetUserMutation();
  const [contentIn, setContentIn] = useAtom(inputContent);
  const [inputValue, setInputValue] = useAtom(inputPortage);
  const [userId, setUserId] = useAtom(userIdAtom);
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const taskSearch = useAtomValue(taskSearchAtom);

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
  const [animation, setAnimation] = useState<string>('');

  const mutationGetCharacter = useGetCharacter(setCharacterData);
  const mutationAnimation = useGetAnimation(setAnimation);
  const updateCharacterMutation = useUpdateCharacter();
  const updateApplicationMutation = useUpdateMemorialApplication();

  // 신청 정보 조회
  const {
    data: applicationData,
    isLoading: isApplicationLoading,
    error: applicationError,
  } = useGetMemorialApplicationQuery(memorialApplicationId);

  const application = applicationData?.data;

  // 유저 정보 조회
  useEffect(() => {
    getUser(undefined, {
      onSuccess: (data) => {
        setUserId(data.data.userId);
      },
      onError: (err) => {
        console.error('에러:', err);
      },
    });
  }, []);

  // 캐릭터 정보 조회
  useEffect(() => {
    if (application?.characterId) {
      mutationGetCharacter.mutate(application.characterId, {
        onError: () => {
          setAlert?.(
            Seori,
            <>
              캐릭터 정보를 가져오는 중 문제가 발생했습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
        },
      });
    }
  }, [application?.characterId]);

  // 애니메이션 정보 조회
  useEffect(() => {
    if (characterData.animeId) {
      mutationAnimation.mutate(characterData.animeId, {
        onError: () => {
          setAlert?.(
            Seori,
            <>
              애니메이션 정보를 가져오는 중 문제가 발생했습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
        },
      });
    }
  }, [characterData.animeId]);

  // characterData와 application을 atom에 설정하여 미리보기와 동기화
  useEffect(() => {
    if (characterData && characterData.characterId !== 0) {
      setInputValue({
        name: characterData.name,
        deathReason: characterData.deathReason as any,
        date: characterData.deathOfDay,
        lifeCycle: characterData.lifeTime,
        anime: animation,
        animeId: characterData.animeId,
        age: characterData.age,
        profileImage: characterData.imageUrl,
        phrase: characterData.saying,
        causeOfDeathDetails: characterData.causeOfDeathDetails || '',
      });
    }

    if (application) {
      setContentIn({
        characterId: String(application.characterId),
        content: application.content,
      });
    }
  }, [characterData, application, animation, setInputValue, setContentIn]);

  // 수정 완료 핸들러
  const handleUpdate = () => {
    if (!contentIn.content || contentIn.content.trim() === '') {
      setAlert?.(Seori, <>추모관 내용을 작성해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    // Character Update와 Memorial Application Update를 동시에 호출
    Promise.all([
      new Promise((resolve, reject) => {
        updateCharacterMutation.mutate(
          {
            characterId: characterData.characterId,
            data: {
              animeId: characterData.animeId,
              name: characterData.name,
              age: characterData.age,
              saying: characterData.saying,
              deathReason: characterData.deathReason,
              causeOfDeathDetails: characterData.causeOfDeathDetails,
              deathOfDay: characterData.deathOfDay,
              imageUrl: characterData.imageUrl,
            },
          },
          {
            onSuccess: () => resolve(true),
            onError: (error) => reject(error),
          },
        );
      }),
      new Promise((resolve, reject) => {
        updateApplicationMutation.mutate(
          {
            memorialApplicationId: memorialApplicationId,
            content: contentIn.content,
          },
          {
            onSuccess: () => resolve(true),
            onError: (error) => reject(error),
          },
        );
      }),
    ])
      .then(() => {
        setAlert?.(Seori, <>추모관 신청이 성공적으로 수정되었습니다.</>, () => {
          taskTransform?.('경고', '');
          pop(); // 수정 완료 후 이전 화면으로
        });
      })
      .catch((error) => {
        console.error('수정 중 오류:', error);
        setAlert?.(
          Seori,
          <>
            수정 중 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </>,
          () => {
            taskTransform?.('경고', '');
          },
        );
      });
  };

  // 로딩 중
  if (
    isApplicationLoading ||
    mutationGetCharacter.isPending ||
    !application ||
    !characterData.characterId
  ) {
    return <Loading />;
  }

  const isUpdating = updateCharacterMutation.isPending || updateApplicationMutation.isPending;

  return (
    <_.Container>
      <_.Section1>
        <_.Header>
          <_.HeaderTextContainer>
            <_.CharacterName>{characterData.name}</_.CharacterName>
            <_.Status>추모관 신청 수정 중</_.Status>
          </_.HeaderTextContainer>
          <_.AuthorshipFrom>@{userId}의 수정</_.AuthorshipFrom>
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
                        사인(死因)
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        {characterData.deathReason}
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>

                  <_.CharacterInformationRow>
                    <_.CharacterInformationRowAttribute>
                      <_.CharacterInformationRowAttributeText>
                        상세 사인
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        {characterData.causeOfDeathDetails}
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
        btnText=""
        from={userId}
        content={application?.content || ''}
        isPerson={false}
      />

      <_.Header>
        <div style={{ flex: 1 }} />
        <_.UpdateButton
          onClick={handleUpdate}
          disabled={isUpdating}
          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
          {isUpdating ? '수정 중...' : '수정 완료'}
        </_.UpdateButton>
      </_.Header>

      {isUpdating && <Loading overlay={true} text="수정 중입니다..." color="white" />}
    </_.Container>
  );
};

export default MemorialEdit;
