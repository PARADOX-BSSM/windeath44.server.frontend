import * as _ from './style';
import MemorialTextarea from '@/applications/components/memorialTextarea';
import { useEffect, useState, useRef } from 'react';
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
import { useUploadImage } from '@/api/anime/uploadImage';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom, taskSearchAtom } from '@/atoms/taskTransformer';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import Loading from '@/applications/components/loading';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import FilterBlock from '@/applications/components/filterBlock';
import ImageCropper from '@/applications/components/imageCropper';
import MemorialBtn from '@/applications/components/memorialBtn';
import type deathType from '@/modules/deathType';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  memorialApplicationId: number;
}

const MemorialEdit = ({ stack, push, pop, top, memorialApplicationId }: dataStructureProps) => {
  const { mutate: getUser } = useGetUserMutation();
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

  // 이미지 관련 state
  const [profileImage, setProfileImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const profileImgRef = useRef<HTMLDivElement | null>(null);
  const [cropSize, setCropSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isCropping, setIsCropping] = useState<boolean>(false);

  // 사인 선택 관련
  const deathReasonList = [
    '자연사(自然死)',
    '병사(病死)',
    '자살(自殺)',
    '불명사(不明死)',
    '타살(他殺)',
    '돌연사(突然死)',
  ];
  const [death, setDeath] = useState(false);
  const [fillDeath, setFillDeath] = useState('사인 선택');

  const mutationGetCharacter = useGetCharacter(setCharacterData);
  const mutationAnimation = useGetAnimation(setAnimation);
  const updateCharacterMutation = useUpdateCharacter();
  const updateApplicationMutation = useUpdateMemorialApplication();
  const uploadImageMutation = useUploadImage();

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
      setProfileImage(characterData.imageUrl);
      setFillDeath(characterData.deathReason as deathType);
    }

    if (application) {
      setContentIn({
        characterId: String(application.characterId),
        content: application.content,
      });
    }
  }, [characterData, application, animation]);

  // crop size 계산 - characterData 로드 후 실행
  useEffect(() => {
    if (profileImgRef.current && characterData.characterId !== 0) {
      const el = profileImgRef.current;
      const style = window.getComputedStyle(el);
      const borderLeft = parseFloat(style.borderLeftWidth);
      const borderTop = parseFloat(style.borderTopWidth);
      const rect = el.getBoundingClientRect();
      const innerWidth = rect.width - borderLeft * 2;
      const innerHeight = rect.height - borderTop * 2;
      setCropSize({ width: Math.floor(innerWidth), height: Math.floor(innerHeight) });
    }
  }, [characterData.characterId]);

  // 이미지 선택 핸들러
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 같은 파일 재선택 가능하도록 초기화
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageSrc(reader.result);
          setIsCropping(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropConfirm = (croppedImage: string) => {
    setInputValue((prev) => ({ ...prev, profileImage: croppedImage }));
    setProfileImage(croppedImage);
    setIsCropping(false);
  };

  const handleCropCancel = () => {
    setIsCropping(false);
  };

  // 사인 선택 핸들러
  const handleDeath = () => {
    setDeath(!death);
  };

  const handleDeathChange = (value: deathType) => {
    setFillDeath(value);
    setDeath(false);
    setInputValue((prev) => ({ ...prev, deathReason: value }));
  };

  // 수정 완료 핸들러
  const handleUpdate = () => {
    if (!inputValue.name || inputValue.name.trim() === '') {
      setAlert?.(Seori, <>캐릭터 이름을 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    if (!inputValue.age || inputValue.age === 0) {
      setAlert?.(Seori, <>캐릭터 나이를 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    if (!inputValue.date || inputValue.date.trim() === '') {
      setAlert?.(Seori, <>사망 날짜를 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    if (!inputValue.deathReason || inputValue.deathReason === '사인 선택') {
      setAlert?.(Seori, <>사인을 선택해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    if (!inputValue.causeOfDeathDetails || inputValue.causeOfDeathDetails.trim() === '') {
      setAlert?.(Seori, <>상세 사인을 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    if (!inputValue.anime || inputValue.anime.trim() === '') {
      setAlert?.(Seori, <>애니메이션을 선택해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    if (!inputValue.phrase || inputValue.phrase.trim() === '') {
      setAlert?.(Seori, <>고인의 명언을 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    if (!contentIn.content || contentIn.content.trim() === '') {
      setAlert?.(Seori, <>추모관 내용을 작성해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    // 이미지가 변경되었으면 업로드 먼저 수행
    if (
      inputValue.profileImage !== characterData.imageUrl &&
      inputValue.profileImage.startsWith('data:')
    ) {
      uploadImageMutation.mutate(
        { image: inputValue.profileImage },
        {
          onSuccess: (fileUrl: string) => {
            updateCharacterAndApplication(fileUrl);
          },
          onError: () => {
            setAlert?.(
              Seori,
              <>
                이미지 업로드 중 오류가 발생했습니다.
                <br />
                잠시 후 다시 시도해 주세요.
              </>,
              () => {
                taskTransform?.('경고', '');
              },
            );
          },
        },
      );
    } else {
      updateCharacterAndApplication(inputValue.profileImage);
    }
  };

  const updateCharacterAndApplication = (imageUrl: string) => {
    // Character Update와 Memorial Application Update를 동시에 호출
    Promise.all([
      new Promise((resolve, reject) => {
        updateCharacterMutation.mutate(
          {
            characterId: characterData.characterId,
            data: {
              animeId: inputValue.animeId,
              name: inputValue.name,
              age: inputValue.age,
              saying: inputValue.phrase,
              deathReason: inputValue.deathReason,
              causeOfDeathDetails: inputValue.causeOfDeathDetails,
              deathOfDay: inputValue.date,
              imageUrl: imageUrl,
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

  const isUpdating =
    updateCharacterMutation.isPending ||
    updateApplicationMutation.isPending ||
    uploadImageMutation.isPending;

  return (
    <_.Container>
      <_.Section1>
        <_.Header>
          <_.HeaderTextContainer>
            <_.CharacterNameInput
              placeholder="이름을 입력해주세요..."
              value={inputValue.name}
              onChange={(e) => setInputValue((prev) => ({ ...prev, name: e.target.value }))}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            />
            <_.Status>추모관 신청 수정 중</_.Status>
          </_.HeaderTextContainer>
          <_.AuthorshipFrom>@{userId}의 수정</_.AuthorshipFrom>
        </_.Header>
        <_.CharacterProfileContainer>
          <_.CharacterProfileInnerContainer>
            <_.CharacterProfileBox>
              <_.CharacterProfile>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <_.CharacterProfileImg
                  ref={profileImgRef}
                  onClick={handleImageClick}
                  style={{
                    cursor: 'none',
                    backgroundImage: profileImage ? `url(${profileImage})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                  onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                />
                <_.CharacterProfileName>{inputValue.name}</_.CharacterProfileName>
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
                        <_.CharacterInforInput
                          type="number"
                          placeholder="예) 1"
                          min="0"
                          value={inputValue.age || ''}
                          onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, age: Number(e.target.value) }));
                          }}
                          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag)}
                          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                        />
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
                        <_.CharacterInforInput
                          type="text"
                          placeholder="예) 2023-04-12"
                          value={inputValue.date}
                          onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, date: e.target.value }));
                          }}
                          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag)}
                          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                        />
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>

                  <_.CharacterInformationRow>
                    <_.CharacterInformationRowAttribute>
                      <_.CharacterInformationRowAttributeText>
                        사인
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        <FilterBlock
                          label=""
                          option={fillDeath}
                          isOpen={death}
                          onClick={handleDeath}
                          list={deathReasonList}
                          onChange={handleDeathChange}
                        />
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
                        <_.CharacterInforInput
                          type="text"
                          placeholder="상세 사인을 입력하세요..."
                          value={inputValue.causeOfDeathDetails}
                          onChange={(e) => {
                            setInputValue((prev) => ({
                              ...prev,
                              causeOfDeathDetails: e.target.value,
                            }));
                          }}
                          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag)}
                          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                        />
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
                      <_.CharacterInformationRowValueText
                        onClick={() => {
                          if (taskTransform) {
                            taskTransform('', '애니메이션 선택');
                          }
                        }}
                        onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                        onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                      >
                        {inputValue.anime == '' ? (
                          <MemorialBtn
                            name="애니메이션 찾기"
                            type="submit"
                            active={true}
                            width="144px"
                            height="40px"
                            fontSize="16px"
                          />
                        ) : (
                          inputValue.anime
                        )}
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>
                </_.CharacterInformationInner>
              </_.CharacterInformation>
            </_.CharacterProfileBox>
          </_.CharacterProfileInnerContainer>
        </_.CharacterProfileContainer>
      </_.Section1>

      <_.PhraseContainer
        type="text"
        placeholder="고인의 마지막 한마디를 입력하세요..."
        value={inputValue.phrase}
        onChange={(e) => {
          setInputValue((prev) => ({ ...prev, phrase: e.target.value }));
        }}
        onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag)}
        onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
      />

      <_.TextAreaContainer>
        <MemorialTextarea
          btnText=""
          from={userId}
          content={application?.content || ''}
          isPerson={true}
        />
        <_.SubmitBtn
          onClick={handleUpdate}
          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
          {isUpdating ? '수정 중...' : '수정 완료'}
        </_.SubmitBtn>
      </_.TextAreaContainer>

      <ImageCropper
        isOpen={isCropping}
        imageSrc={imageSrc}
        cropSize={cropSize}
        onConfirm={handleCropConfirm}
        onCancel={handleCropCancel}
      />

      {isUpdating && (
        <Loading
          overlay={true}
          text="수정 중입니다..."
          color="white"
        />
      )}
    </_.Container>
  );
};

export default MemorialEdit;
