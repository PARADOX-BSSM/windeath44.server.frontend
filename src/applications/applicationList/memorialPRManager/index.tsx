import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import Choten from '@/assets/profile/choten.svg';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useGetMemorialPullRequestsQuery } from '@/api/memorial/getMemorialPullRequests';
import {
  useCheckMergeableMutation,
  useMergeMemorialPullRequestMutation,
  useResolveMemorialPullRequestMutation,
} from '@/api/memorial/mergeMemorialPullRequest';
import { useRejectMemorialPullRequestMutation } from '@/api/memorial/rejectMemorialPullRequest';
import { useState, useEffect } from 'react';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  memorialId: number;
  memorialName: string;
}

const MemorialPRManager = ({
  stack,
  push,
  pop,
  top,
  memorialId,
  memorialName,
}: dataStructureProps) => {
  const taskSearch = useAtomValue(taskSearchAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  // Pull Requests 조회
  const {
    data: pullRequestsData,
    isLoading: isPullRequestsLoading,
    error: pullRequestsError,
    refetch: refetchPullRequests,
  } = useGetMemorialPullRequestsQuery(memorialId);

  const pullRequests = pullRequestsData?.data || [];

  // 병합 관련 mutations
  const checkMergeableMutation = useCheckMergeableMutation();
  const mergeMutation = useMergeMemorialPullRequestMutation();
  const rejectMutation = useRejectMemorialPullRequestMutation();

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  // PR 상세보기 함수 - 새로운 태스크 push
  const handleViewPRDetail = (memorialPullRequestId: number, commitData: any) => {
    push(
      taskSearch?.('memorialPRDetail', {
        ...stackProps,
        prId: memorialPullRequestId,
        commitData: commitData,
        memorialName: memorialName,
      }),
    );
  };

  // PR 병합 처리 함수
  const handleMergePullRequest = async (memorialPullRequestId: number) => {
    try {
      // 1. 먼저 mergeable인지 확인
      const mergeableResult = await checkMergeableMutation.mutateAsync({
        memorialPullRequestId,
      });

      if (!mergeableResult.data?.mergeable) {
        // 충돌이 있는 경우 - 충돌 해결 태스크로 이동
        const conflict = mergeableResult.data?.conflict || '알 수 없는 충돌';

        push(
          taskSearch?.('memorialConflictResolve', {
            ...stackProps,
            prId: memorialPullRequestId,
            conflict: conflict,
            memorialName: memorialName,
          }),
        );
        return;
      }

      // 2. 충돌이 없으면 실제 병합 진행
      await mergeMutation.mutateAsync({
        memorialPullRequestId,
      });

      // 3. 성공 시 알림 및 목록 새로고침
      setAlert?.(Choten, <>수정 요청이 성공적으로 병합되었습니다!</>, () => {
        taskTransform?.('경고', '');
        refetchPullRequests(); // PR 목록 새로고침
      });
    } catch (error: any) {
      // 에러 처리
      setAlert?.(
        Choten,
        <>
          수정 요청 병합 중 오류가 발생했습니다.
          <br />
          {error?.response?.data?.message || '알 수 없는 오류'}
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    }
  };

  // PR 거절 처리 함수
  const handleRejectPullRequest = async (memorialPullRequestId: number) => {
    try {
      await rejectMutation.mutateAsync(memorialPullRequestId);

      // 성공 시 알림 및 목록 새로고침
      setAlert?.(Choten, <>수정 요청이 거절되었습니다.</>, () => {
        taskTransform?.('경고', '');
        refetchPullRequests(); // PR 목록 새로고침
      });
    } catch (error: any) {
      // 에러 처리
      setAlert?.(
        Choten,
        <>
          수정 요청 거절 중 오류가 발생했습니다.
          <br />
          {error?.response?.data?.message || '알 수 없는 오류'}
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    }
  };

  // 에러 처리
  useEffect(() => {
    if (pullRequestsError) {
      setAlert?.(
        Choten,
        <>
          수정 요청을 가져오는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    }
  }, [pullRequestsError, setAlert, taskTransform]);

  // 로딩 상태 처리
  if (isPullRequestsLoading) {
    return (
      <_.Container>
        <_.InnerContainer>
          <_.ContentContainer>
            <_.Header>
              <_.InnerHeader>
                <_.LeftHeader>
                  <_.Title>수정 요청 관리</_.Title>
                  <_.Subtitle>로딩 중...</_.Subtitle>
                </_.LeftHeader>
                <_.BackButton onClick={() => pop()}>돌아가기</_.BackButton>
              </_.InnerHeader>
            </_.Header>
          </_.ContentContainer>
        </_.InnerContainer>
      </_.Container>
    );
  }

  return (
    <_.Container>
      <_.InnerContainer>
        <_.ContentContainer>
          <_.Header>
            <_.InnerHeader>
              <_.LeftHeader>
                <_.Title>수정 요청 관리</_.Title>
                <_.Subtitle>{memorialName}의 수정 요청을 관리합니다</_.Subtitle>
              </_.LeftHeader>
              <_.BackButton onClick={() => pop()}>돌아가기</_.BackButton>
            </_.InnerHeader>
          </_.Header>

          <_.StatsContainer>
            <_.StatItem>
              <_.StatNumber>
                {
                  pullRequests.filter(
                    (pr) =>
                      pr.state !== 'APPROVED' &&
                      pr.state !== 'STORED' &&
                      pr.state !== 'RESOLVED' &&
                      pr.state !== 'REJECTED',
                  ).length
                }
              </_.StatNumber>
              <_.StatLabel>대기중인 수정 요청</_.StatLabel>
            </_.StatItem>
          </_.StatsContainer>

          <_.PullRequestsContainer>
            <_.ListTitle>Pull Requests</_.ListTitle>
            {isPullRequestsLoading ||
            checkMergeableMutation.isPending ||
            mergeMutation.isPending ||
            rejectMutation.isPending ? (
              <_.LoadingText>
                {isPullRequestsLoading && '수정 요청 로딩 중...'}
                {checkMergeableMutation.isPending && '병합 가능 여부 확인 중...'}
                {mergeMutation.isPending && '수정 요청 병합 중...'}
                {rejectMutation.isPending && '수정 요청 거절 중...'}
              </_.LoadingText>
            ) : (
              <_.MemorialListBox>
                <_.MemorialList>
                  {pullRequests.length === 0 ? (
                    <_.EmptyMessage>아직 P수정 요청이 없습니다.</_.EmptyMessage>
                  ) : (
                    pullRequests
                      .filter(
                        (pr) =>
                          pr.state !== 'APPROVED' &&
                          pr.state !== 'STORED' &&
                          pr.state !== 'RESOLVED' &&
                          pr.state !== 'REJECTED',
                      ) // 승인된 PR은 제외
                      .map((pr) => (
                        <_.MemorialItem key={pr.memorialPullRequestId}>
                          <_.MemorialInfo>
                            <_.MemorialName
                              style={{ cursor: 'pointer', color: '#E774DD' }}
                              onClick={() =>
                                handleViewPRDetail(pr.memorialPullRequestId, pr.memorialCommit)
                              }
                            >
                              PR #{pr.memorialPullRequestId}
                            </_.MemorialName>
                            <_.MemorialDetails>
                              <_.DetailText>사용자: {pr.userId}</_.DetailText>
                              <_.DetailText>상태: {pr.state}</_.DetailText>
                              <_.DetailText>수정일: {pr.updatedAt}</_.DetailText>
                            </_.MemorialDetails>
                          </_.MemorialInfo>

                          <_.ButtonContainer>
                            <MemorialBtn
                              name="병합"
                              onClick={() => handleMergePullRequest(pr.memorialPullRequestId)}
                              type="submit"
                              active={
                                pr.state === 'PENDING' &&
                                !checkMergeableMutation.isPending &&
                                !mergeMutation.isPending
                              }
                              width="50px"
                              height="32px"
                              fontSize="12px"
                            />
                            <MemorialBtn
                              name="거절"
                              onClick={() => handleRejectPullRequest(pr.memorialPullRequestId)}
                              type="submit"
                              active={pr.state === 'PENDING' && !rejectMutation.isPending}
                              width="50px"
                              height="32px"
                              fontSize="12px"
                            />
                          </_.ButtonContainer>
                        </_.MemorialItem>
                      ))
                  )}
                </_.MemorialList>
              </_.MemorialListBox>
            )}
          </_.PullRequestsContainer>
        </_.ContentContainer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default MemorialPRManager;
