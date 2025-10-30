import * as _ from './style';
import Application from './components/application';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom, taskSearchAtom } from '@/atoms/taskTransformer';
import Choten from '@/assets/profile/choten.svg';
import { useEffect, useMemo, useState } from 'react';
import { useGetMyMemorialApplicationsQuery } from '@/api/memorial/getMyMemorialApplications';
import { useGetUsersQuery } from '@/api/user/getUsers';
import { useMemorialApplicationLikeMutation } from '@/api/memorial/memorialApplicationLike';
import { useGetUserMutation } from '@/api/user/getUser';
import {
  useMemorialApplicationApproveMutation,
  useMemorialApplicationRejectMutation,
} from '@/api/memorial/memorialApplicationApprove';

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
  const likeMutation = useMemorialApplicationLikeMutation();
  const approveMutation = useMemorialApplicationApproveMutation();
  const rejectMutation = useMemorialApplicationRejectMutation();
  const { mutate: getUser, data: userData } = useGetUserMutation();

  const isAdmin = userData?.data?.role === 'ADMIN';

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
        Choten,
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
        Choten,
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
          Choten,
          <>추모관 신청이 승인되었습니다.</>,
          () => {
            taskTransform?.('경고', '');
          },
        );
      },
      onError: () => {
        setAlert?.(
          Choten,
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

  // 거절 핸들러
  const handleReject = (memorialApplicationId: number) => {
    rejectMutation.mutate(memorialApplicationId, {
      onSuccess: () => {
        setAlert?.(
          Choten,
          <>추모관 신청이 거절되었습니다.</>,
          () => {
            taskTransform?.('경고', '');
          },
        );
      },
      onError: () => {
        setAlert?.(
          Choten,
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
            Choten,
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
                          isLiked={app.didUserLiked || false}
                          onLikeToggle={handleLikeToggle}
                          isAdmin={isAdmin}
                          onApprove={handleApprove}
                          onReject={handleReject}
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
    </_.Container>
  );
};

export default MemorialApplicationList;
