import * as _ from './style';
import History from './components/history';
import { useAtomValue } from 'jotai';
import { taskSearchAtom } from '@/atoms/taskTransformer';
import { useGetMemorialPullRequestsQuery } from '@/api/memorial/getMemorialPullRequests';
import { useGetUsersQuery } from '@/api/user/getUsers';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import Choten from '@/assets/profile/choten.svg';
import { useEffect, useMemo } from 'react';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  memorialId: number;
  characterName: string;
  lastModified: string;
}

const MemorailHistory = ({
  stack,
  push,
  pop,
  top,
  memorialId,
  characterName,
  lastModified,
}: dataStructureProps) => {
  const taskSearch = useAtomValue(taskSearchAtom);
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);

  // APPROVED 또는 STORED 상태의 PR 조회
  const {
    data: pullRequestsData,
    isLoading: isPullRequestsLoading,
    error: pullRequestsError,
  } = useGetMemorialPullRequestsQuery(memorialId);

  const completedPullRequests = (pullRequestsData?.data || []).filter(
    (pr) => pr.state === 'APPROVED' || pr.state === 'STORED',
  );

  // 고유한 사용자 ID 목록 추출
  const userIds = useMemo(() => {
    const uniqueUserIds = [...new Set(completedPullRequests.map((pr) => pr.userId))];
    return uniqueUserIds;
  }, [completedPullRequests]);

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
    if (pullRequestsError) {
      setAlert?.(
        Choten,
        <>
          수정 기록을 가져오는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    }
  }, [pullRequestsError, setAlert, taskTransform]);

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

  return (
    <_.Container>
      <_.InnerContainer>
        <_.ContentContainer>
          <_.Header>
            <_.InnerHeader>
              <_.LeftHeader>
                <_.Title>{characterName}</_.Title>
                <_.SubTitle>최근 수정: {lastModified}</_.SubTitle>
              </_.LeftHeader>
              <_.GoToBackBtn
                onClick={() => {
                  pop();
                }}
              >
                돌아가기
              </_.GoToBackBtn>
            </_.InnerHeader>
          </_.Header>
          <_.HistoryContainer>
            <_.HistoryContainerTitle>수정 기록</_.HistoryContainerTitle>
            <_.HistoryBox>
              <_.HistoryInnerBox>
                {isPullRequestsLoading || isUsersLoading ? (
                  <_.LoadingText>수정 기록을 불러오는 중...</_.LoadingText>
                ) : completedPullRequests.length === 0 ? (
                  <_.EmptyMessage>아직 완료된 수정 기록이 없습니다.</_.EmptyMessage>
                ) : (
                  completedPullRequests
                    .sort(
                      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
                    )
                    .map((pr) => (
                      <History
                        key={pr.memorialPullRequestId}
                        id={pr.userId.toString()}
                        editedAt={pr.updatedAt}
                        description={`수정 요청이 ${pr.state === 'APPROVED' ? '승인' : '저장'}되었습니다.`}
                        profileUrl={userProfiles[pr.userId] || ''}
                        onClick={() => {
                          taskTransform?.('', '추모관 뷰어', {
                            characterId: pr.memorialCommit.memorial.characterId,
                            content: `${pr.memorialCommit.content}`,
                          });
                        }}
                      />
                    ))
                )}
              </_.HistoryInnerBox>
            </_.HistoryBox>
          </_.HistoryContainer>
        </_.ContentContainer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default MemorailHistory;
