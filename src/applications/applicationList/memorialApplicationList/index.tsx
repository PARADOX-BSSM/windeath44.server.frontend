import * as _ from './style';
import Application from './components/application';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom, taskSearchAtom } from '@/atoms/taskTransformer';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import { useEffect, useMemo, useState } from 'react';
import { useGetMyMemorialApplicationsQuery } from '@/api/memorial/getMyMemorialApplications';
import { useGetUsersQuery } from '@/api/user/getUsers';
import { useMemorialApplicationLikeMutation } from '@/api/memorial/memorialApplicationLike';
import { useGetUserMutation } from '@/api/user/getUser';
import {
  useMemorialApplicationApproveMutation,
  useMemorialApplicationRejectMutation,
} from '@/api/memorial/memorialApplicationApprove';
import { useMemorialApplicationDeleteMutation } from '@/api/memorial/memorialApplicationDelete';
import * as ViewerStyle from '../memorialApplicationViewer/style';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import Loading from '@/applications/components/loading';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const MemorialApplicationList = ({ stack, push, pop, top }: dataStructureProps) => {
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const taskSearch = useAtomValue(taskSearchAtom);
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const [allApplications, setAllApplications] = useState<any[]>([]);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectTargetId, setRejectTargetId] = useState<number | null>(null);
  const [isViewRejectedReasonModalOpen, setIsViewRejectedReasonModalOpen] = useState(false);
  const [viewingRejectedReason, setViewingRejectedReason] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const likeMutation = useMemorialApplicationLikeMutation();
  const approveMutation = useMemorialApplicationApproveMutation();
  const rejectMutation = useMemorialApplicationRejectMutation();
  const deleteMutation = useMemorialApplicationDeleteMutation();
  const { mutate: getUser, data: userData } = useGetUserMutation();

  const isAdmin = userData?.data?.role === 'ADMIN';
  const currentUserId = userData?.data?.userId;

  // 유저 정보 조회
  useEffect(() => {
    getUser();
  }, []);

  // 추모관 신청 목록 조회
  const {
    data: applicationsData,
    isLoading: isApplicationsLoading,
    error: applicationsError,
    refetch,
  } = useGetMyMemorialApplicationsQuery(cursorId, 10);

  // 컴포넌트 마운트 시 데이터 refetch
  useEffect(() => {
    refetch();
  }, []);

  // 데이터가 로드되면 allApplications에 추가
  useEffect(() => {
    if (applicationsData?.data?.values) {
      if (cursorId === undefined) {
        // 첫 로드 시 기존 데이터 초기화 및 정렬
        const sorted = [...applicationsData.data.values].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setAllApplications(sorted);
      } else {
        // 더보기 시 기존 데이터 뒤에 추가 (정렬하지 않음)
        setAllApplications((prev) => [...prev, ...applicationsData.data.values]);
      }
    }
  }, [applicationsData]);

  // 고유한 사용자 ID 목록 추출
  const userIds = useMemo(() => {
    const uniqueUserIds = [...new Set(allApplications.map((app) => app.userId))];
    return uniqueUserIds;
  }, [allApplications]);

  // 사용자 정보 조회
  const {
    data: usersData,
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetUsersQuery(userIds);

  // 사용자 ID별 프로필 매핑
  const userProfiles = useMemo(() => {
    if (!usersData?.data) return {};
    return usersData.data.reduce(
      (acc, user) => {
        acc[user.userId] = user.profile;
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [usersData]);

  // 에러 처리
  useEffect(() => {
    if (applicationsError) {
      setAlert?.(
        Seori,
        <>
          신청 목록을 가져오는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    }
  }, [applicationsError, setAlert, taskTransform]);

  useEffect(() => {
    if (usersError) {
      setAlert?.(
        Seori,
        <>
          사용자 정보를 가져오는 중 오류가 발생했습니다.
          <br />
          프로필 이미지가 표시되지 않을 수 있습니다.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    }
  }, [usersError, setAlert, taskTransform]);

  // 더보기 버튼 클릭
  const handleLoadMore = () => {
    if (allApplications.length > 0) {
      const lastApplication = allApplications[allApplications.length - 1];
      setCursorId(lastApplication.memorialApplicationId);
    }
  };

  // 승인 핸들러
  const handleApprove = (memorialApplicationId: number) => {
    approveMutation.mutate(memorialApplicationId, {
      onSuccess: () => {
        setAlert?.(
          Seori,
          <>추모관 신청이 승인되었습니다.</>,
          () => {
            taskTransform?.('경고', '');
          },
        );
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
  const handleReject = (memorialApplicationId: number) => {
    setRejectTargetId(memorialApplicationId);
    setIsRejectModalOpen(true);
  };

  // 거절 모달 닫기
  const handleRejectModalClose = () => {
    setIsRejectModalOpen(false);
    setRejectReason('');
    setRejectTargetId(null);
  };

  // 거절 사유 제출
  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      setAlert?.(Seori, <>거절 사유를 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    if (!rejectTargetId) return;

    rejectMutation.mutate(
      { id: rejectTargetId, reason: rejectReason },
      {
        onSuccess: () => {
          setAlert?.(
            Seori,
            <>추모관 신청이 거절되었습니다.</>,
            () => {
              taskTransform?.('경고', '');
            },
          );
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

  // 거절 사유 보기 핸들러
  const handleViewRejectedReason = (rejectedReason: string) => {
    setViewingRejectedReason(rejectedReason);
    setIsViewRejectedReasonModalOpen(true);
  };

  // 거절 사유 보기 모달 닫기
  const handleViewRejectedReasonModalClose = () => {
    setIsViewRejectedReasonModalOpen(false);
    setViewingRejectedReason('');
  };

  // 삭제 버튼 클릭 시 모달 열기
  const handleDelete = (memorialApplicationId: number) => {
    setDeleteTargetId(memorialApplicationId);
    setIsDeleteModalOpen(true);
  };

  // 삭제 모달 닫기
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  // 삭제 확인
  const handleDeleteConfirm = () => {
    if (!deleteTargetId) return;

    setDeletingId(deleteTargetId);

    deleteMutation.mutate(deleteTargetId, {
      onSuccess: () => {
        setAlert?.(
          Seori,
          <>추모관 신청이 삭제되었습니다.</>,
          () => {
            taskTransform?.('경고', '');
          },
        );
        handleDeleteModalClose();
        setDeletingId(null);
      },
      onError: () => {
        setAlert?.(
          Seori,
          <>
            삭제 처리 중 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </>,
          () => {
            taskTransform?.('경고', '');
          },
        );
        setDeletingId(null);
      },
    });
  };

  // 좋아요 토글 핸들러 (낙관적 업데이트)
  const handleLikeToggle = (memorialApplicationId: number, isLiked: boolean) => {
    // 즉시 UI 업데이트 (낙관적 렌더링)
    setAllApplications((prev) =>
      prev.map((app) =>
        app.memorialApplicationId === memorialApplicationId
          ? {
              ...app,
              isLiked: !isLiked,
              likes: isLiked ? app.likes - 1 : app.likes + 1,
            }
          : app,
      ),
    );

    // 백그라운드에서 API 호출
    likeMutation.mutate(
      { memorialApplicationId, isLiked },
      {
        onError: () => {
          // 에러 발생 시 롤백
          setAllApplications((prev) =>
            prev.map((app) =>
              app.memorialApplicationId === memorialApplicationId
                ? {
                    ...app,
                    isLiked: isLiked,
                    likes: isLiked ? app.likes + 1 : app.likes - 1,
                  }
                : app,
            ),
          );
          setAlert?.(
            Seori,
            <>
              좋아요 처리 중 오류가 발생했습니다.
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

  return (
    <_.Container>
      <_.InnerContainer>
        <_.ContentContainer>
          <_.Header>
            <_.InnerHeader>
              <_.LeftHeader>
                <_.Title>내 추모관 신청</_.Title>
                <_.SubTitle>신청한 추모관 목록</_.SubTitle>
              </_.LeftHeader>
              <_.GoToBackBtn onClick={() => pop()}>돌아가기</_.GoToBackBtn>
            </_.InnerHeader>
          </_.Header>
          <_.ApplicationContainer>
            <_.ApplicationContainerTitle>신청 목록</_.ApplicationContainerTitle>
            <_.ApplicationBox>
              <_.ApplicationInnerBox>
                {isApplicationsLoading && cursorId === undefined ? (
                  <_.LoadingText>신청 목록을 불러오는 중...</_.LoadingText>
                ) : allApplications.length === 0 ? (
                  <_.EmptyMessage>아직 신청한 추모관이 없습니다.</_.EmptyMessage>
                ) : (
                  <>
                    {allApplications.map((app) => (
                        <Application
                          key={app.memorialApplicationId}
                          userId={app.userId}
                          createdAt={app.createdAt}
                          state={app.state}
                          likes={app.likes}
                          profileUrl={userProfiles[app.userId] || ''}
                          memorialApplicationId={app.memorialApplicationId}
                          isLiked={app.isLiked ?? app.didUserLiked ?? false}
                          onLikeToggle={handleLikeToggle}
                          isAdmin={isAdmin}
                          onApprove={handleApprove}
                          onReject={handleReject}
                          rejectedReason={app.rejectedReason}
                          onViewRejectedReason={handleViewRejectedReason}
                          currentUserId={currentUserId}
                          onDelete={handleDelete}
                          isDeleting={deletingId === app.memorialApplicationId}
                          onClick={() => {
                            const stackProps = {
                              stack: stack,
                              push: push,
                              pop: pop,
                              top: top,
                            };
                            push(
                              taskSearch?.('추모관 신청 뷰어', {
                                ...stackProps,
                                memorialApplicationId: app.memorialApplicationId,
                              }),
                            );
                          }}
                        />
                      ))}
                    {applicationsData?.data?.hasNext && (
                      <_.LoadMoreBtn
                        onClick={handleLoadMore}
                        disabled={isApplicationsLoading}
                      >
                        {isApplicationsLoading ? '로딩 중...' : '더보기'}
                      </_.LoadMoreBtn>
                    )}
                  </>
                )}
              </_.ApplicationInnerBox>
            </_.ApplicationBox>
          </_.ApplicationContainer>
        </_.ContentContainer>
      </_.InnerContainer>

      {/* 거절 사유 입력 모달 */}
      {isRejectModalOpen && (
        <ViewerStyle.ModalOverlay onClick={handleRejectModalClose}>
          <ViewerStyle.ModalContent onClick={(e) => e.stopPropagation()}>
            <ViewerStyle.ModalTitle>거절 사유 입력</ViewerStyle.ModalTitle>
            <ViewerStyle.ModalTextarea
              placeholder="거절 사유를 입력해주세요..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            />
            <ViewerStyle.ModalButtonGroup>
              <ViewerStyle.ModalButton
                variant="secondary"
                onClick={handleRejectModalClose}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                취소
              </ViewerStyle.ModalButton>
              <ViewerStyle.ModalButton
                variant="primary"
                onClick={handleRejectSubmit}
                disabled={rejectMutation.isPending}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                {rejectMutation.isPending ? '처리 중...' : '거절'}
              </ViewerStyle.ModalButton>
            </ViewerStyle.ModalButtonGroup>
          </ViewerStyle.ModalContent>
        </ViewerStyle.ModalOverlay>
      )}

      {/* 거절 사유 보기 모달 */}
      {isViewRejectedReasonModalOpen && (
        <ViewerStyle.ModalOverlay onClick={handleViewRejectedReasonModalClose}>
          <ViewerStyle.ModalContent onClick={(e) => e.stopPropagation()}>
            <ViewerStyle.ModalTitle>거절 사유</ViewerStyle.ModalTitle>
            <ViewerStyle.ModalTextarea
              value={viewingRejectedReason}
              readOnly
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.default)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            />
            <ViewerStyle.ModalButtonGroup>
              <ViewerStyle.ModalButton
                variant="primary"
                onClick={handleViewRejectedReasonModalClose}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                닫기
              </ViewerStyle.ModalButton>
            </ViewerStyle.ModalButtonGroup>
          </ViewerStyle.ModalContent>
        </ViewerStyle.ModalOverlay>
      )}

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <ViewerStyle.ModalOverlay onClick={handleDeleteModalClose}>
          <ViewerStyle.ModalContent onClick={(e) => e.stopPropagation()}>
            <ViewerStyle.ModalTitle>추모관 신청 삭제</ViewerStyle.ModalTitle>
            <ViewerStyle.ModalTextarea
              value="정말로 이 추모관 신청을 삭제하시겠습니까?"
              readOnly
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.default)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              style={{ resize: 'none', height: '60px' }}
            />
            <ViewerStyle.ModalButtonGroup>
              <ViewerStyle.ModalButton
                variant="secondary"
                onClick={handleDeleteModalClose}
                disabled={deleteMutation.isPending}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                취소
              </ViewerStyle.ModalButton>
              <ViewerStyle.ModalButton
                variant="primary"
                onClick={handleDeleteConfirm}
                disabled={deleteMutation.isPending}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                {deleteMutation.isPending ? '삭제 중...' : '삭제'}
              </ViewerStyle.ModalButton>
            </ViewerStyle.ModalButtonGroup>
          </ViewerStyle.ModalContent>
        </ViewerStyle.ModalOverlay>
      )}

      {/* 삭제 중 로딩 오버레이 */}
      {deleteMutation.isPending && <Loading overlay={true} text="삭제 중..." />}
    </_.Container>
  );
};

export default MemorialApplicationList;
