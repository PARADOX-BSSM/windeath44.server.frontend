import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import Choten from '@/assets/profile/choten.svg';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useGetMemorialPullRequestsQuery } from '@/api/memorial/getMemorialPullRequests';
import {
  useCheckMergeableMutation,
  useMergeMemorialPullRequestMutation,
  useResolveMemorialPullRequestMutation,
} from '@/api/memorial/mergeMemorialPullRequest';
import { useGetCommitsByIdQuery } from '@/api/memorial/userCommit';
import { useState, useEffect } from 'react';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  memorialId: number;
  memorialName: string;
}

const MemorialPRManager = ({ stack, push, pop, top, memorialId, memorialName }: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  const [conflictPR, setConflictPR] = useState<{ id: number; conflict: string } | null>(null);
  const [editedConflict, setEditedConflict] = useState<string>('');
  const [selectedPR, setSelectedPR] = useState<{ id: number; commitId: number } | null>(null);

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
  const resolveMutation = useResolveMemorialPullRequestMutation();

  // 선택된 PR의 커밋 내용 조회
  const { data: commitData, isLoading: isCommitLoading } = useGetCommitsByIdQuery({
    commitId: selectedPR?.commitId || 0,
  });

  // PR 상세보기 함수
  const handleViewPRDetail = (memorialPullRequestId: number, commitId: number) => {
    setSelectedPR({ id: memorialPullRequestId, commitId });
  };

  // PR 병합 처리 함수
  const handleMergePullRequest = async (memorialPullRequestId: number) => {
    try {
      // 1. 먼저 mergeable인지 확인
      const mergeableResult = await checkMergeableMutation.mutateAsync({
        memorialPullRequestId,
      });

      if (!mergeableResult.data?.mergeable) {
        // 충돌이 있는 경우 - 충돌 해결 UI 표시
        const conflict = mergeableResult.data?.conflict || '알 수 없는 충돌';

        setConflictPR({
          id: memorialPullRequestId,
          conflict: conflict,
        });
        setEditedConflict(conflict); // 원본 충돌 내용으로 시작
        return;
      }

      // 2. 충돌이 없으면 실제 병합 진행
      await mergeMutation.mutateAsync({
        memorialPullRequestId,
      });

      // 3. 성공 시 알림 및 목록 새로고침
      setAlert?.(Choten, <>Pull Request가 성공적으로 병합되었습니다!</>, () => {
        taskTransform?.('성공', '');
        refetchPullRequests(); // PR 목록 새로고침
      });
    } catch (error: any) {
      // 에러 처리
      setAlert?.(
        Choten,
        <>
          Pull Request 병합 중 오류가 발생했습니다.
          <br />
          {error?.response?.data?.message || '알 수 없는 오류'}
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    }
  };

  // 충돌 해결 처리 함수
  const handleResolveConflict = async () => {
    if (!conflictPR || !editedConflict.trim()) {
      setAlert?.(Choten, <>해결된 내용을 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    try {
      // 충돌 해결 API 호출 - 편집된 충돌 해결 내용을 전달
      await resolveMutation.mutateAsync({
        memorialPullRequestId: conflictPR.id,
        resolved: editedConflict,
      });

      // 성공 시 충돌 UI 숨기고 PR 목록 새로고침
      setAlert?.(
        Choten,
        <>
          충돌이 성공적으로 해결되었습니다!
          <br />
          이제 다시 병합을 시도할 수 있습니다.
        </>,
        () => {
          taskTransform?.('성공', '');
          setConflictPR(null);
          setEditedConflict('');
          refetchPullRequests();
        },
      );
    } catch (error: any) {
      setAlert?.(
        Choten,
        <>
          충돌 해결 중 오류가 발생했습니다.
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
          Pull Requests를 가져오는 중 오류가 발생했습니다.
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
                  <_.Title>Pull Request 관리</_.Title>
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
                <_.Title>Pull Request 관리</_.Title>
                <_.Subtitle>{memorialName}의 수정 요청을 관리합니다</_.Subtitle>
              </_.LeftHeader>
              <_.BackButton onClick={() => pop()}>돌아가기</_.BackButton>
            </_.InnerHeader>
          </_.Header>

          <_.StatsContainer>
            <_.StatItem>
              <_.StatNumber>
                {pullRequests.filter((pr) => pr.state !== 'APPROVED').length}
              </_.StatNumber>
              <_.StatLabel>대기중인 Pull Requests</_.StatLabel>
            </_.StatItem>
          </_.StatsContainer>

          <_.PullRequestsContainer>
            <_.ListTitle>Pull Requests</_.ListTitle>
            {isPullRequestsLoading ||
            checkMergeableMutation.isPending ||
            mergeMutation.isPending ||
            resolveMutation.isPending ? (
              <_.LoadingText>
                {isPullRequestsLoading && 'Pull Requests 로딩 중...'}
                {checkMergeableMutation.isPending && '병합 가능 여부 확인 중...'}
                {mergeMutation.isPending && 'Pull Request 병합 중...'}
                {resolveMutation.isPending && '충돌 해결 중...'}
              </_.LoadingText>
            ) : (
              <_.MemorialListBox>
                <_.MemorialList>
                  {pullRequests.length === 0 ? (
                    <_.EmptyMessage>아직 Pull Request가 없습니다.</_.EmptyMessage>
                  ) : (
                    pullRequests
                      .filter((pr) => pr.state !== 'APPROVED') // 승인된 PR은 제외
                      .map((pr) => (
                        <_.MemorialItem key={pr.memorialPullRequestId}>
                          <_.MemorialInfo>
                            <_.MemorialName
                              style={{ cursor: 'pointer', color: '#E774DD' }}
                              onClick={() => handleViewPRDetail(pr.memorialPullRequestId, pr.memorialCommit.memorialCommitId)}
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
                                !mergeMutation.isPending &&
                                !resolveMutation.isPending
                              }
                              width="50px"
                              height="32px"
                              fontSize="12px"
                            />
                            <MemorialBtn
                              name="거절"
                              onClick={() => {
                                // TODO: PR 거절 API 호출
                                console.log('PR 거절:', pr.memorialPullRequestId);
                              }}
                              type="submit"
                              active={pr.state === 'PENDING'}
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

          {conflictPR && (
            <_.ConflictResolveContainer>
              <_.ListTitle>충돌 해결 (PR #{conflictPR.id})</_.ListTitle>

              <_.ResolveInputContainer>
                <_.ResolveLabel>충돌 내용 (직접 수정하세요):</_.ResolveLabel>
                <_.ResolveTextarea
                  value={editedConflict}
                  onChange={(e) => setEditedConflict(e.target.value)}
                  placeholder="Git 충돌 마커를 포함한 내용을 직접 수정하세요..."
                  rows={12}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    backgroundColor: '#f8f9fa',
                    border: '2px solid #dee2e6',
                    borderRadius: '4px',
                    padding: '12px'
                  }}
                />
              </_.ResolveInputContainer>

              <_.ConflictButtonContainer>
                <MemorialBtn
                  name="해결 완료"
                  onClick={handleResolveConflict}
                  type="submit"
                  active={!!editedConflict.trim() && !resolveMutation.isPending}
                  width="80px"
                  height="36px"
                  fontSize="14px"
                />
                <MemorialBtn
                  name="취소"
                  onClick={() => {
                    setConflictPR(null);
                    setEditedConflict('');
                  }}
                  type="submit"
                  active={true}
                  width="60px"
                  height="36px"
                  fontSize="14px"
                />
              </_.ConflictButtonContainer>
            </_.ConflictResolveContainer>
          )}

          {selectedPR && (
            <_.ConflictResolveContainer style={{ borderTop: '2px solid #4299E1', background: '#F0F8FF' }}>
              <_.ListTitle>PR #{selectedPR.id} 상세 내용</_.ListTitle>

              {isCommitLoading ? (
                <_.LoadingText>PR 내용을 불러오는 중...</_.LoadingText>
              ) : (
                <>
                  <_.ConflictInfo>
                    <_.ConflictLabel>커밋 정보:</_.ConflictLabel>
                    <_.MemorialDetails>
                      <_.DetailText>커밋 ID: {selectedPR.commitId}</_.DetailText>
                      <_.DetailText>사용자: {commitData?.data?.userId}</_.DetailText>
                      <_.DetailText>작성일: {commitData?.data?.createdAt}</_.DetailText>
                    </_.MemorialDetails>
                  </_.ConflictInfo>

                  <_.ResolveInputContainer>
                    <_.ResolveLabel>수정 내용:</_.ResolveLabel>
                    <_.ConflictText style={{
                      color: '#2E2E2E',
                      border: '1px solid #4299E1',
                      maxHeight: '300px',
                      overflowY: 'auto',
                      lineHeight: '1.6',
                      minHeight: '100px'
                    }}>
                      {commitData?.data?.content || '내용을 불러올 수 없습니다.'}
                    </_.ConflictText>
                  </_.ResolveInputContainer>

                  <_.ConflictButtonContainer>
                    <MemorialBtn
                      name="닫기"
                      onClick={() => setSelectedPR(null)}
                      type="button"
                      active={true}
                      width="60px"
                      height="32px"
                      fontSize="12px"
                    />
                  </_.ConflictButtonContainer>
                </>
              )}
            </_.ConflictResolveContainer>
          )}
        </_.ContentContainer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default MemorialPRManager;