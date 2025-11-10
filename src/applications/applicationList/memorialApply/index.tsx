import * as _ from './style';
import MemorialTextarea from '@/applications/components/memorialTextarea';
import { useAtom, useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useState, useRef, useEffect } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn';
import { inputPortage } from '@/atoms/inputManager';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { useGetUserMutation } from '@/api/user/getUser';
import FilterBlock from '@/applications/components/filterBlock';
import ImageCropper from '@/applications/components/imageCropper';
import type deathType from '@/modules/deathType';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const MemorialApply = ({}: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [userName, setUserName] = useState('guest');
  const [inputValue, setInputValue] = useAtom(inputPortage);
  const { mutate: getUser, data, isPending, error } = useGetUserMutation();

  const [profileImage, setProfileImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const profileImgRef = useRef<HTMLDivElement | null>(null);
  const [cropSize, setCropSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const deathReason = [
    '자연사(自然死)',
    '병사(病死)',
    '자살(自殺)',
    '불명사(不明死)',
    '타살(他殺)',
    '돌연사(突然死)',
  ];
  const [death, setDeath] = useState(false);
  const [fillDeath, setFillDeath] = useState('사인 선택');
  const handleDeath = () => {
    setDeath(!death);
  };

  const handleDeathChange = (value: deathType) => {
    setFillDeath(value);
    setDeath(false);
    setInputValue((prev) => ({ ...prev, deathReason: value }));
  };

  useEffect(() => {
    if (profileImgRef.current) {
      const el = profileImgRef.current;
      const style = window.getComputedStyle(el);
      const borderLeft = parseFloat(style.borderLeftWidth);
      const borderTop = parseFloat(style.borderTopWidth);
      const rect = el.getBoundingClientRect();
      const innerWidth = rect.width - borderLeft * 2;
      const innerHeight = rect.height - borderTop * 2;
      setCropSize({ width: Math.floor(innerWidth), height: Math.floor(innerHeight) });
    }
    getUser(undefined, {
      onSuccess: (data) => {
        // console.log('성공:', data);
        setUserName(data.data.userId);
      },
      onError: (err) => {
        console.error('에러:', err);
      },
    });
  }, []);

  const handleImageClick = () => {
    if (fileInputRef.current) {
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

  const [imageSrc, setImageSrc] = useState<string>('');
  const [isCropping, setIsCropping] = useState<boolean>(false);

  const handleCropConfirm = (croppedImage: string) => {
    setInputValue((prev) => ({ ...prev, profileImage: croppedImage }));
    setProfileImage(croppedImage);
    setIsCropping(false);
  };

  const handleCropCancel = () => {
    setIsCropping(false);
  };

  return (
    <_.Container>
      <_.Section1>
        <_.Header>
          <_.HeaderTextContainer>
            <_.CharacterNameInput
              placeholder="이름을 입력해주세요..."
              onChange={(e) => setInputValue((prev) => ({ ...prev, name: e.target.value }))}
              onMouseEnter={() => {
                setCursorImage(CURSOR_IMAGES.drag);
              }}
              onMouseLeave={() => {
                setCursorImage(CURSOR_IMAGES.default);
              }}
            ></_.CharacterNameInput>
            <_.Status>문서 수정 중</_.Status>
          </_.HeaderTextContainer>
          <_.AuthorshipFrom>@{userName}의 요청</_.AuthorshipFrom>
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
                    backgroundPosition: 'fit',
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
                          onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, age: Number(e.target.value) }));
                          }}
                          onMouseEnter={() => {
                            setCursorImage(CURSOR_IMAGES.drag);
                          }}
                          onMouseLeave={() => {
                            setCursorImage(CURSOR_IMAGES.default);
                          }}
                        ></_.CharacterInforInput>
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
                          onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, date: e.target.value }));
                          }}
                          onMouseEnter={() => {
                            setCursorImage(CURSOR_IMAGES.drag);
                          }}
                          onMouseLeave={() => {
                            setCursorImage(CURSOR_IMAGES.default);
                          }}
                        ></_.CharacterInforInput>
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
                          list={deathReason}
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
                          onChange={(e) => {
                            setInputValue((prev) => ({
                              ...prev,
                              causeOfDeathDetails: e.target.value,
                            }));
                          }}
                          onMouseEnter={() => {
                            setCursorImage(CURSOR_IMAGES.drag);
                          }}
                          onMouseLeave={() => {
                            setCursorImage(CURSOR_IMAGES.default);
                          }}
                        ></_.CharacterInforInput>
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
                          // console.log(taskTransform);
                          if (taskTransform) {
                            taskTransform('', '애니메이션 선택');
                          }
                        }}
                        onMouseEnter={() => {
                          setCursorImage(CURSOR_IMAGES.hand);
                        }}
                        onMouseLeave={() => {
                          setCursorImage(CURSOR_IMAGES.default);
                        }}
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
        onChange={(e) => {
          setInputValue((prev) => ({ ...prev, phrase: e.target.value }));
        }}
        onMouseEnter={() => {
          setCursorImage(CURSOR_IMAGES.drag);
        }}
        onMouseLeave={() => {
          setCursorImage(CURSOR_IMAGES.default);
        }}
      ></_.PhraseContainer>

      <_.TextAreaContainer>
        <MemorialTextarea
          btnText="추모관 신청하기"
          from={userName}
          content="<목차>마지막 순간</목차>
<동영상>https://www.youtube.com/watch?v=oMk46C5Cjws</동영상>"
          isPerson={true}
        />
      </_.TextAreaContainer>

      <ImageCropper
        isOpen={isCropping}
        imageSrc={imageSrc}
        cropSize={cropSize}
        onConfirm={handleCropConfirm}
        onCancel={handleCropCancel}
      />
    </_.Container>
  );
};

export default MemorialApply;
