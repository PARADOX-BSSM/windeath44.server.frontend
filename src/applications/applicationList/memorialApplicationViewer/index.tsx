import Loading from '@/applications/components/loading';
import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import { useEffect, useState } from 'react';
import { useGetCharacter } from '@/api/anime/getCharacter.ts';
import type { CharacterData } from '@/api/anime/getCharacter';
import { parseCustomContent } from '@/lib/customTag/parseCustomContent.tsx';
import { useGetAnimation } from '@/api/anime/getAnimation.ts';
import ribbon from '@/assets/memorial_ribbon.svg';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import { useGetMemorialApplicationQuery } from '@/api/memorial/getMemorialApplication';
import { index_data } from '../memorial/data';
import { useGetUserMutation } from '@/api/user/getUser';
import {
  useMemorialApplicationApproveMutation,
  useMemorialApplicationRejectMutation,
} from '@/api/memorial/memorialApplicationApprove';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  memorialApplicationId: number;
}

const MemorialApplicationViewer = ({
  stack,
  push,
  pop,
  top,
  memorialApplicationId,
}: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
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
  const approveMutation = useMemorialApplicationApproveMutation();
  const rejectMutation = useMemorialApplicationRejectMutation();
  const { mutate: getUser, data: userData } = useGetUserMutation();

  // 거절 모달 상태
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // 디버깅용: 모달 상태 추적
  useEffect(() => {
    console.log('[MemorialApplicationViewer] isRejectModalOpen 상태 변경:', isRejectModalOpen);
  }, [isRejectModalOpen]);

  // 디버깅용: 컴포넌트 마운트 확인
  useEffect(() => {
    console.log('[MemorialApplicationViewer] 컴포넌트 마운트됨');
  }, []);

  // 신청 정보 조회
  const {
    data: applicationData,
    isLoading: isApplicationLoading,
    error: applicationError,
  } = useGetMemorialApplicationQuery(memorialApplicationId);

  const application = applicationData?.data;
  const isAdmin = userData?.data?.role === 'ADMIN';

  // 디버깅용: 권한과 상태 확인
  useEffect(() => {
    console.log('[MemorialApplicationViewer] 권한 및 상태:', {
      isAdmin,
      userRole: userData?.data?.role,
      applicationState: application?.state,
      shouldShowButtons: isAdmin && application?.state === 'PENDING',
    });
  }, [isAdmin, application?.state, userData]);

  // 유저 정보 조회
  useEffect(() => {
    getUser();
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

  // 에러 처리
  useEffect(() => {
    if (applicationError) {
      setAlert?.(
        Seori,
        <>
          신청 정보를 가져오는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    }
  }, [applicationError, setAlert, taskTransform]);

  // 승인 핸들러
  const handleApprove = () => {
    approveMutation.mutate(memorialApplicationId, {
      onSuccess: () => {
        setAlert?.(Seori, <>추모관 신청이 승인되었습니다.</>, () => {
          taskTransform?.('경고', '');
          pop(); // 승인 후 목록으로 돌아가기
        });
      },
      onError: () => {
        setAlert?.(
          Seori,
          <>
            승인 처리 중 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </>,
          () => {
            taskTransform?.('경고', '');
          },
        );
      },
    });
  };

  // 거절 버튼 클릭 시 모달 열기
  const handleReject = () => {
    console.log('거절 버튼 클릭됨');
    setIsRejectModalOpen(true);
    console.log('모달 상태:', true);
  };

  // 거절 모달 닫기
  const handleRejectModalClose = () => {
    setIsRejectModalOpen(false);
    setRejectReason('');
  };

  // 거절 사유 제출
  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      setAlert?.(Seori, <>거절 사유를 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    rejectMutation.mutate(
      { id: memorialApplicationId, reason: rejectReason },
      {
        onSuccess: () => {
          setAlert?.(Seori, <>추모관 신청이 거절되었습니다.</>, () => {
            taskTransform?.('경고', '');
            pop(); // 거절 후 목록으로 돌아가기
          });
          handleRejectModalClose();
        },
        onError: () => {
          setAlert?.(
            Seori,
            <>
              거절 처리 중 오류가 발생했습니다.
              <br />
              잠시 후 다시 시도해주세요.
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
        },
      },
    );
  };

  // 상태 텍스트 변환
  const getStateText = (state: string) => {
    switch (state) {
      case 'APPROVED':
        return '승인됨';
      case 'REJECTED':
        return '거절됨';
      case 'PENDING':
        return '대기 중';
      default:
        return state;
    }
  };

  // 상태 색상
  const getStateColor = (state: string) => {
    switch (state) {
      case 'APPROVED':
        return '#4CAF50';
      case 'REJECTED':
        return '#F44336';
      case 'PENDING':
        return '#FF9800';
      default:
        return '#2e2e2e';
    }
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

  return (
    <_.Main>
      <_.Container>
        <_.InnerContainer>
          <_.Section1>
            <_.Header>
              <_.TextContainer>
                <_.Title>{characterData.name}</_.Title>
                <_.Subtitle>
                  신청 날짜: {application.createdAt} • 상태:{' '}
                  <span style={{ color: getStateColor(application.state) }}>
                    {getStateText(application.state)}
                  </span>
                </_.Subtitle>
              </_.TextContainer>
              {isAdmin && application.state === 'PENDING' && (
                <>
                  <_.ApproveButton
                    onClick={handleApprove}
                    disabled={approveMutation.isPending}
                    onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                    onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                  >
                    {approveMutation.isPending ? '처리 중...' : '승인'}
                  </_.ApproveButton>
                  <_.RejectButton
                    onClick={() => {
                      console.log('승인 버튼 클릭됨');
                      // handleReject();
                    }}
                    disabled={rejectMutation.isPending}
                    onMouseEnter={() => {
                      setCursorImage(CURSOR_IMAGES.hand);
                    }}
                    onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                  >
                    {rejectMutation.isPending ? '처리 중...' : '거절'}
                  </_.RejectButton>
                </>
              )}
              <_.BackButton
                onClick={() => pop()}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                돌아가기
              </_.BackButton>
            </_.Header>
            <_.ContentContainer>
              <_.ProfileContainer>
                <_.ProfileInnerContainer>
                  <_.PictureContainer>
                    <_.Ribbon
                      src={ribbon}
                      alt="ribbon"
                    />
                    <_.Picture imgUrl={characterData.imageUrl} />
                    <_.Name>{characterData.name}</_.Name>
                  </_.PictureContainer>
                  <_.Information>
                    <_.Row>
                      <_.Attribute>나이</_.Attribute>
                      <_.Value>향년 {characterData.age}세</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>사망 날짜</_.Attribute>
                      <_.Value>{characterData.deathOfDay}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>사인(死因)</_.Attribute>
                      <_.Value>{characterData?.deathReason}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>상세 사인</_.Attribute>
                      <_.Value>{characterData.causeOfDeathDetails}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>애니메이션</_.Attribute>
                      <_.Value>{animation}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>신청자</_.Attribute>
                      <_.Value>@{application.userId}</_.Value>
                    </_.Row>
                  </_.Information>
                </_.ProfileInnerContainer>
              </_.ProfileContainer>
            </_.ContentContainer>
          </_.Section1>

          <_.Section2>
            <_.ArticleContainer>
              <_.ArticleTitle>신청 내용</_.ArticleTitle>
              <_.ArticleContent>
                {parseCustomContent(index_data, application.content)}
              </_.ArticleContent>
            </_.ArticleContainer>
          </_.Section2>
        </_.InnerContainer>
      </_.Container>

      {/* 거절 사유 입력 모달 */}
      {(() => {
        console.log('[MemorialApplicationViewer] 모달 렌더링 체크:', isRejectModalOpen);
        return isRejectModalOpen ? (
          <_.ModalOverlay
            onClick={handleRejectModalClose}
            onMouseEnter={() => setCursorImage(CURSOR_IMAGES.default)}
            onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
          >
            <_.ModalContent
              onClick={(e) => {
                e.stopPropagation();
                console.log('[MemorialApplicationViewer] 모달 컨텐츠 클릭');
              }}
            >
              <_.ModalTitle>거절 사유 입력</_.ModalTitle>
              <_.ModalTextarea
                placeholder="거절 사유를 입력해주세요..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              />
              <_.ModalButtonGroup>
                <_.ModalButton
                  variant="secondary"
                  onClick={handleRejectModalClose}
                  onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                  onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                >
                  취소
                </_.ModalButton>
                <_.ModalButton
                  variant="primary"
                  onClick={handleRejectSubmit}
                  disabled={rejectMutation.isPending}
                  onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                  onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                >
                  {rejectMutation.isPending ? '처리 중...' : '거절'}
                </_.ModalButton>
              </_.ModalButtonGroup>
            </_.ModalContent>
          </_.ModalOverlay>
        ) : null;
      })()}
    </_.Main>
  );
};

export default MemorialApplicationViewer;
