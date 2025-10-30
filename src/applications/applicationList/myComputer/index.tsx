import MemorialBtn from '@/applications/components/memorialBtn/index.tsx';
import Loading from '@/applications/components/loading';
import * as _ from './style.ts';
import myComputer from '@/assets/appIcons/my_computer.svg';
import Choten from '@/assets/profile/choten.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { alerterAtom } from '@/atoms/alerter';
import { useAtomValue, useAtom } from 'jotai';
import { isLogInedAtom } from '@/atoms/windowManager';
import MemorialWithIcon from '@/applications/components/memorialWithIcon/index.tsx';
import { useLogOut } from '@/api/auth/logout.ts';
import { useGetUserMutation } from '@/api/user/getUser.ts';
import { useUpdateUserName } from '@/api/user/updateUserName.ts';
import { useUpdateUserProfile } from '@/api/user/updateUserProfile.ts';
import { deleteCookie } from '@/api/auth/cookie.ts';
import {
  useGetMemorialTracing,
  type MemorialTracingData,
} from '@/api/memorial/getMemorialTracing.ts';
import { useGetMemorialsByIdsQuery, type MemorialData } from '@/api/memorial/getMemorialsByIds.ts';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { anime } from '@/config';
import { useEffect, useState, useMemo, useRef } from 'react';
import ImageCropper from '@/applications/components/imageCropper';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import MemorialChief from '@/applications/applicationList/memorialChief';
import { InputsList } from './style.ts';

// 캐릭터 정보를 가져오는 커스텀 hook
const useCharacterInfo = (characterId: number) => {
  return useQuery({
    queryKey: ['character', characterId],
    queryFn: async () => {
      const response = await axiosInstance.get(`${anime}/characters/${characterId}`);
      return response.data.data;
    },
    enabled: !!characterId,
  });
};

// 개별 추모관 아이템 컴포넌트
const MemorialItem = ({
  memorialData,
  taskTransform,
}: {
  memorialData: MemorialData;
  taskTransform: any;
}) => {
  const { data: characterData } = useCharacterInfo(memorialData.characterId);

  return (
    <MemorialWithIcon
      key={memorialData.memorialId}
      icon={myComputer}
      name={characterData?.name || `추모관 #${memorialData.memorialId}`}
      onDoubleClick={() => {
        taskTransform?.('', '추모관 뷰어', {
          memorialId: memorialData.memorialId,
          characterId: memorialData.characterId,
        });
      }}
    />
  );
};

const MyComputer = () => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  const logOutMutation = useLogOut();
  const { mutate: getUser, data: userData, isPending, error } = useGetUserMutation();
  const updateNameMutation = useUpdateUserName();
  const updateProfileMutation = useUpdateUserProfile();
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);
  const loggedIn = isLogIned === 'true';

  // 프로필 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editProfileImage, setEditProfileImage] = useState('');
  const [originalProfileImage, setOriginalProfileImage] = useState('');

  // 이미지 크롭 상태
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [cropSize, setCropSize] = useState<{ width: number; height: number }>({
    width: 200,
    height: 200,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const profileImgRef = useRef<HTMLDivElement | null>(null);

  // 최근 방문한 추모관 데이터 상태 관리
  const [memorialTracingData, setMemorialTracingData] = useState<MemorialTracingData[]>([]);
  const [hasNextTracing, setHasNextTracing] = useState<boolean>(false);
  const mutationGetMemorialTracing = useGetMemorialTracing(
    setMemorialTracingData,
    setHasNextTracing,
    false,
  );
  const mutationLoadMoreTracing = useGetMemorialTracing(
    setMemorialTracingData,
    setHasNextTracing,
    true,
  );

  // memorialTracingData에서 고유한 memorialId 목록 추출
  const uniqueMemorialIds = useMemo(
    () => Array.from(new Set(memorialTracingData.map((item) => item.memorialId))),
    [memorialTracingData],
  );

  // 여러 추모관 정보를 한 번에 가져오기
  const { data: memorialsData, isLoading: isMemorialsLoading } = useGetMemorialsByIdsQuery(
    uniqueMemorialIds,
    loggedIn && uniqueMemorialIds.length > 0,
  );

  useEffect(() => {
    if (loggedIn) {
      getUser(undefined as unknown as void, {
        onSuccess: (data) => {
          // 초기값 설정
          setEditName(data.data.name || '');
          setEditProfileImage(data.data.profile || '');
          setOriginalProfileImage(data.data.profile || '');
        },
        onError: () => {
          // 세션 만료 등으로 401 발생 시 로그인 상태 해제
          setIsLogIned('false');
        },
      });
      // 로그인 시 추모관 방문 기록 조회
      mutationGetMemorialTracing.mutate({ size: 6 });
    }
  }, [loggedIn, getUser, setIsLogIned]);

  // 프로필 이미지 크기 계산
  useEffect(() => {
    if (profileImgRef.current && isEditMode) {
      const el = profileImgRef.current;
      const rect = el.getBoundingClientRect();
      setCropSize({ width: Math.floor(rect.width), height: Math.floor(rect.height) });
    }
  }, [isEditMode]);

  const handleLoadMoreTracing = () => {
    if (memorialTracingData.length === 0) return;
    // 마지막 항목의 viewedAt을 cursor로 사용
    const lastViewedAt = memorialTracingData[memorialTracingData.length - 1].viewedAt;
    mutationLoadMoreTracing.mutate({ size: 6, cursor: lastViewedAt });
  };

  // 프로필 수정 모드 시작
  const handleEditModeStart = () => {
    if (!isLoggedIn) return;
    setIsEditMode(true);
  };

  // 프로필 수정 취소
  const handleEditCancel = () => {
    setIsEditMode(false);
    setEditName(userData?.data?.name || '');
    setEditProfileImage(originalProfileImage);
    setIsCropping(false);
  };

  // 프로필 저장
  const handleSaveProfile = async () => {
    // 이름 유효성 검사
    if (editName.trim() === '') {
      setAlert?.(Choten, <>이름을 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    const nameChanged = editName !== userData?.data?.name;
    const profileChanged = editProfileImage !== originalProfileImage;

    // 변경사항이 없으면 종료
    if (!nameChanged && !profileChanged) {
      setIsEditMode(false);
      return;
    }

    try {
      // 1. 이름이 변경되었으면 이름 변경 API 호출
      if (nameChanged) {
        await updateNameMutation.mutateAsync({ name: editName.trim() });
      }

      // 2. 프로필 이미지가 변경되었으면 프로필 변경 API 호출
      if (profileChanged) {
        await updateProfileMutation.mutateAsync({ profile: editProfileImage });
      }

      // 성공 시
      setAlert?.(Choten, <>프로필이 성공적으로 수정되었습니다.</>, () => {
        taskTransform?.('경고', '');
      });
      setIsEditMode(false);
      setOriginalProfileImage(editProfileImage);
      // 사용자 정보 다시 불러오기
      getUser(undefined as unknown as void);
    } catch (error) {
      console.error('프로필 수정 실패', error);
      setAlert?.(Choten, <>프로필 수정 중 오류가 발생했습니다.</>, () => {
        taskTransform?.('경고', '');
      });
    }
  };

  // 이미지 파일 선택
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 이미지 파일 변경
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

  // 크롭 확인
  const handleCropConfirm = (croppedImage: string) => {
    setEditProfileImage(croppedImage);
    setIsCropping(false);
  };

  // 크롭 취소
  const handleCropCancel = () => {
    setIsCropping(false);
  };

  const renderMemorialBtn = () => {
    const isLoggedIn = loggedIn;
    return (
      <MemorialBtn
        name={isLoggedIn ? '로그아웃' : '로그인'}
        onClick={() => {
          taskTransform?.('', isLoggedIn ? '' : '로그인');
          if (isLoggedIn) {
            logOutMutation.mutate(undefined, {
              onSuccess: () => {
                setIsLogIned('false');
                sessionStorage.setItem('hasBootedSession', 'false');
                location.reload();
              },
              onError: (error) => {
                console.error('로그아웃 실패', error);
                setAlert?.(Choten, <>로그아웃 중 오류가 발생했습니다.</>, () => {
                  taskTransform?.('경고', '');
                });
              },
            });
          }
        }}
        type="submit"
        active={true}
        width="116px"
        fontSize="18px"
      />
    );
  };

  const isLoggedIn = loggedIn;
  const isUserReady = !!(userData && userData.data && userData.data.name) && !isPending && !error;

  if (isLoggedIn && !isUserReady) {
    return <Loading />;
  }

  // 프로필 영역 렌더링
  const renderProfileSection = () => {
    // 비로그인 상태
    if (!isLoggedIn) {
      return (
        <>
          <_.ProfileImg
            imgUrl=""
            draggable="false"
          />
          <_.ProfileName>게스트</_.ProfileName>
        </>
      );
    }

    // 로그인 상태
    return (
      <>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <_.ProfileImg
          ref={profileImgRef}
          imgUrl={isEditMode ? editProfileImage : userData?.data.profile}
          draggable="false"
          onClick={isEditMode ? handleImageClick : undefined}
          onMouseEnter={isEditMode ? () => setCursorImage(CURSOR_IMAGES.hand) : undefined}
          onMouseLeave={isEditMode ? () => setCursorImage(CURSOR_IMAGES.default) : undefined}
          style={{ cursor: isEditMode ? 'none' : 'default' }}
        />
        {isEditMode ? (
          <_.ProfileNameInput
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="이름 입력"
            onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag)}
            onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
          />
        ) : (
          <_.ProfileName>{userData?.data.name}</_.ProfileName>
        )}
        {isEditMode ? (
          <_.EditButtonContainer>
            <MemorialBtn
              name="저장"
              onClick={handleSaveProfile}
              type="submit"
              active={true}
              width="116px"
              fontSize="18px"
            />
            <MemorialBtn
              name="취소"
              onClick={handleEditCancel}
              type="submit"
              active={true}
              width="116px"
              fontSize="18px"
            />
          </_.EditButtonContainer>
        ) : (
          <MemorialBtn
            name="프로필 수정"
            onClick={handleEditModeStart}
            type="submit"
            active={true}
            width="116px"
            fontSize="18px"
          />
        )}
      </>
    );
  };

  return (
    <_.Container>
      <_.LeftContainer>
        <_.ProfileContainer>{renderProfileSection()}</_.ProfileContainer>

        {renderMemorialBtn()}
      </_.LeftContainer>
      <_.Btn>
        <_.InnerItem>
          <_.Title>최근 방문한 추모관</_.Title>
          <_.Shadow>
            <_.Inputs>
              {!loggedIn ? (
                <_.MessageText>로그인 후 이용할 수 있습니다.</_.MessageText>
              ) : mutationGetMemorialTracing.isPending || isMemorialsLoading ? (
                <Loading
                  text="로딩 중..."
                  imageSize="80px"
                />
              ) : mutationGetMemorialTracing.isError ? (
                <_.MessageText>데이터를 불러오는 중 오류가 발생했습니다.</_.MessageText>
              ) : memorialTracingData.length === 0 ? (
                <_.MessageText>방문한 추모관이 없습니다.</_.MessageText>
              ) : memorialsData?.data && memorialsData.data.length > 0 ? (
                <>
                  {/* 추모관 목록 렌더링 */}
                  {memorialsData.data.map((memorial) => (
                    <MemorialItem
                      key={memorial.memorialId}
                      memorialData={memorial}
                      taskTransform={taskTransform}
                    />
                  ))}
                  {hasNextTracing && (
                    <MemorialBtn
                      name="더보기"
                      onClick={handleLoadMoreTracing}
                      type="button"
                      active={true}
                      width="100%"
                      fontSize="14px"
                    />
                  )}
                </>
              ) : (
                <_.MessageText>추모관 정보를 불러올 수 없습니다.</_.MessageText>
              )}
            </_.Inputs>
          </_.Shadow>
        </_.InnerItem>
        <_.InnerItem>
          <_.Title>상주 추모관 목록</_.Title>
          <_.Shadow>
            <_.InputsList>
              {!loggedIn ? (
                <_.MessageText>로그인 후 이용할 수 있습니다.</_.MessageText>
              ) : (
                <MemorialChief/>
              )}
            </_.InputsList>
          </_.Shadow>
        </_.InnerItem>
      </_.Btn>

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

export default MyComputer;
