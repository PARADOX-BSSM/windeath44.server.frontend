import * as _ from './style';
import MemorialTextarea from '@/applications/components/memorialTextarea';
import { useAtom, useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useState, useRef, useEffect } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn';
import { inputPortage } from '@/atoms/inputManager';
import AvatarEditor from 'react-avatar-editor';
import Button from '@/applications/components/button';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { useGetUserMutation } from '@/api/user/getUser';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const MemorialApply = ({}: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [userName, setUserName] = useState('winshine0326');
  const [inputValue, setInputValue] = useAtom(inputPortage);
  const { mutate: getUser, data, isPending, error } = useGetUserMutation();

  const [profileImage, setProfileImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const profileImgRef = useRef<HTMLDivElement | null>(null);
  const [cropSize, setCropSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

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
        console.log('성공:', data);
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
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState<number>(1);

  const handleCropConfirm = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      setInputValue((prev) => ({ ...prev, profileImage: canvas }));
      setProfileImage(canvas);
      setIsCropping(false);
    }
  };

  return (
    <_.Container>
      <_.Section1>
        <_.Header>
          <_.HeaderTextContainer>
            <_.CharacterNameInput
              placeholder="이름을 입력해주세요..."
              onChange={(e) => setInputValue((prev) => ({ ...prev, name: e.target.value }))}
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
                          type="text"
                          placeholder="예) 향년 20세"
                          onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, age: e.target.value }));
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
                          placeholder="예) 2023.04.12"
                          onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, date: e.target.value }));
                          }}
                        ></_.CharacterInforInput>
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
                        <_.CharacterInforInput
                          type="text"
                          placeholder="예) 1일"
                          onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, lifeCycle: e.target.value }));
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
                        <_.CharacterInforInput
                          type="text"
                          placeholder="예) 흉기에 의한 사망"
                          onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, deathReason: e.target.value }));
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
                          console.log(taskTransform);
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
                            widthPercent={15}
                            heightPercent={5}
                            fontSize="1rem"
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
        placeholder="고인의 명언을 입력하세요..."
        onChange={(e) => {
          setInputValue((prev) => ({ ...prev, phrase: e.target.value }));
        }}
      ></_.PhraseContainer>

      <_.TextAreaContainer>
        <MemorialTextarea
          btnText="추모관 신청하기"
          from={userName}
          content="<목차>마지막 순간</목차>
<사진 {80px}>https://buma.wiki/api/image/display/최애의사인/example.png</사진>
<동영상>https://www.youtube.com/watch?v=oMk46C5Cjws</동영상>"
          isPerson={true}
        />
      </_.TextAreaContainer>

      {isCropping && (
        <_.ImgCropContainer>
          <_.ImgCropInner>
            <_.Connnnn>
              <AvatarEditor
                ref={editorRef}
                image={imageSrc}
                width={cropSize.width}
                height={cropSize.height}
                border={20}
                borderRadius={0}
                color={[0, 0, 0, 0.6]}
                scale={scale}
                rotate={0}
                style={{ cursor: 'none' }}
              />
              <_.CropText>드래그하여 이미지 위치 변경!</_.CropText>
            </_.Connnnn>
            <_.Connnnn>
              <_.RangeSlider
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={scale}
                percent={((scale - 1) / 2) * 100}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              />
              <_.CropText>이미지 확대/축소</_.CropText>
            </_.Connnnn>
            <_.BtnContainer>
              <Button
                onClick={handleCropConfirm}
                props="확인"
              />
              <Button
                onClick={() => setIsCropping(false)}
                props="취소"
              />
            </_.BtnContainer>
          </_.ImgCropInner>
        </_.ImgCropContainer>
      )}
    </_.Container>
  );
};

export default MemorialApply;
