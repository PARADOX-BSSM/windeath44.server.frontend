import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import Choten from '@/assets/profile/choten.svg';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useGetMyChiefMemorialsQuery } from '@/api/memorial/getChiefMemorials';
import { useGetMemorialPullRequestsQuery } from '@/api/memorial/getMemorialPullRequests';
import {
  useCheckMergeableMutation,
  useMergeMemorialPullRequestMutation,
  useResolveMemorialPullRequestMutation,
} from '@/api/memorial/mergeMemorialPullRequest';
import { useMemorialGet, memorialData } from '@/api/memorial/memorialGet';
import { useGetCharacter, CharacterData } from '@/api/anime/getCharacter';
import { useState, useEffect, useCallback } from 'react';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const MemorialChief = ({ stack, push, pop, top }: dataStructureProps) => {
  const taskSearch = useAtomValue(taskSearchAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  const [selectedMemorialId, setSelectedMemorialId] = useState<number | null>(null);
  const [conflictPR, setConflictPR] = useState<{ id: number; conflict: string } | null>(null);
  const [resolveText, setResolveText] = useState<string>('');
  const [memorialDetails, setMemorialDetails] = useState<{
    [key: string]: { memorial: memorialData; character: CharacterData };
  }>({});

  // 실제 API로 상주 추모관 목록 조회
  const { data: chiefMemorialsData, isLoading, error } = useGetMyChiefMemorialsQuery();

  const chiefMemorialIds = chiefMemorialsData?.data || []; // string[] 형태

  // 추모관 정보를 가져오는 mutation들
  const memorialMutation = useMemorialGet(() => {});
  const characterMutation = useGetCharacter(() => {});

  // 추모관 상세 정보를 가져오는 함수
  const fetchMemorialDetails = useCallback(async (memorialId: string) => {
    if (memorialDetails[memorialId]) return; // 이미 로드된 경우 스킵

    try {
      const memorialResult = await memorialMutation.mutateAsync(parseInt(memorialId));
      if (memorialResult.data) {
        const characterResult = await characterMutation.mutateAsync(
          memorialResult.data.characterId,
        );
        setMemorialDetails((prev) => ({
          ...prev,
          [memorialId]: {
            memorial: memorialResult.data,
            character: characterResult.data,
          },
        }));
      }
    } catch (error) {
      console.error('추모관 정보 로딩 실패:', error);
    }
  }, [memorialDetails, memorialMutation, characterMutation]);

  // 추모관 목록이 로드되면 각 추모관의 상세 정보를 가져옴
  useEffect(() => {
    if (chiefMemorialIds.length > 0) {
      chiefMemorialIds.forEach((memorialId) => {
        fetchMemorialDetails(memorialId);
      });
    }
  }, [chiefMemorialIds, fetchMemorialDetails]);

  // 선택된 추도관의 Pull Requests 조회
  const {
    data: pullRequestsData,
    isLoading: isPullRequestsLoading,
    refetch: refetchPullRequests,
  } = useGetMemorialPullRequestsQuery(selectedMemorialId!);

  const pullRequests = pullRequestsData?.data || [];

  // 병합 관련 mutations
  const checkMergeableMutation = useCheckMergeableMutation();
  const mergeMutation = useMergeMemorialPullRequestMutation();
  const resolveMutation = useResolveMemorialPullRequestMutation();

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  const handleVisitMemorial = (memorialId: string) => {
    const details = memorialDetails[memorialId];
    if (details?.memorial) {
      push(
        taskSearch?.('memorial', {
          ...stackProps,
          memorialId: parseInt(memorialId),
          characterId: details.memorial.characterId,
        }),
      );
    }
  };

  const handleManagePullRequests = (memorialId: string) => {
    setSelectedMemorialId(parseInt(memorialId));
  };

  // PR 병합 처리 함수
  const handleMergePullRequest = async (memorialPullRequestId: number) => {
    try {
      // 1. 먼저 mergeable인지 확인
      const mergeableResult = await checkMergeableMutation.mutateAsync({
        memorialPullRequestId,
      });

      if (!mergeableResult.mergeable) {
        // 충돌이 있는 경우 - 충돌 해결 UI 표시
        setConflictPR({
          id: memorialPullRequestId,
          conflict: mergeableResult.conflict || '알 수 없는 충돌',
        });
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
    if (!conflictPR || !resolveText.trim()) {
      setAlert?.(Choten, <>해결 내용을 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    try {
      // 충돌 해결 API 호출
      await resolveMutation.mutateAsync({
        memorialPullRequestId: conflictPR.id,
        resolved: resolveText,
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
          setResolveText('');
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

  // 에러 처리 - useEffect로 한 번만 실행
  useEffect(() => {
    if (error) {
      setAlert?.(
        Choten,
        <>
          상주 추모관 목록을 가져오는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    }
  }, [error, setAlert, taskTransform]);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <_.Container>
        <_.InnerContainer>
          <_.ContentContainer>
            <_.Header>
              <_.InnerHeader>
                <_.LeftHeader>
                  <_.Title>상주 관리</_.Title>
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
                <_.Title>상주 관리</_.Title>
                <_.Subtitle>내가 상주인 추모관을 관리할 수 있습니다</_.Subtitle>
              </_.LeftHeader>
              <_.BackButton
                onClick={() => {
                  pop();
                }}
              >
                돌아가기
              </_.BackButton>
            </_.InnerHeader>
          </_.Header>

          <_.StatsContainer>
            <_.StatItem>
              <_.StatNumber>{chiefMemorialIds.length}</_.StatNumber>
              <_.StatLabel>총 상주 추모관</_.StatLabel>
            </_.StatItem>
            <_.StatItem>
              <_.StatNumber>
                {selectedMemorialId
                  ? pullRequests.filter((pr) => pr.state !== 'APPROVED').length
                  : 0}
              </_.StatNumber>
              <_.StatLabel>선택된 대기중인 추모관 수정 요청</_.StatLabel>
            </_.StatItem>
          </_.StatsContainer>

          <_.MemorialListContainer>
            <_.ListTitle>상주 추모관 목록</_.ListTitle>
            <_.MemorialListBox>
              <_.MemorialList>
                {chiefMemorialIds.map((memorialId) => {
                  const details = memorialDetails[memorialId];
                  const characterName = details?.character?.name || '로딩 중...';
                  return (
                    <_.MemorialItem key={memorialId}>
                      <_.MemorialInfo>
                        <_.MemorialName>{characterName}의 추모관</_.MemorialName>
                        <_.MemorialDetails>
                          <_.DetailText>추모관 ID: {memorialId}</_.DetailText>
                          <_.DetailText>상주 권한으로 관리 가능</_.DetailText>
                        </_.MemorialDetails>
                      </_.MemorialInfo>

                      <_.ButtonContainer>
                        <MemorialBtn
                          name="방문"
                          onClick={() => handleVisitMemorial(memorialId)}
                          type="submit"
                          active={true}
                          width="60px"
                          height="32px"
                          fontSize="12px"
                        />
                        <MemorialBtn
                          name="PR 관리"
                          onClick={() => handleManagePullRequests(memorialId)}
                          type="submit"
                          active={true}
                          width="60px"
                          height="32px"
                          fontSize="12px"
                        />
                      </_.ButtonContainer>
                    </_.MemorialItem>
                  );
                })}
              </_.MemorialList>
            </_.MemorialListBox>
          </_.MemorialListContainer>

          {selectedMemorialId && (
            <_.PullRequestsContainer>
              <_.ListTitle>Pull Requests (추모관 ID: {selectedMemorialId})</_.ListTitle>
              {isPullRequestsLoading ||
              checkMergeableMutation.isPending ||
              mergeMutation.isPending ||
              resolveMutation.isPending ? (
                <_.LoadingText>
                  {isPullRequestsLoading && '수정 요청 로딩 중...'}
                  {checkMergeableMutation.isPending && '병합 가능 여부 확인 중...'}
                  {mergeMutation.isPending && '수정 요청 병합 중...'}
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
                              <_.MemorialName>PR #{pr.memorialPullRequestId}</_.MemorialName>
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
                                  pr.state === 'pending' &&
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
                                active={pr.state === 'pending'}
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
          )}

          {conflictPR && (
            <_.ConflictResolveContainer>
              <_.ListTitle>충돌 해결 (PR #{conflictPR.id})</_.ListTitle>
              <_.ConflictInfo>
                <_.ConflictLabel>충돌 내용:</_.ConflictLabel>
                <_.ConflictText>{conflictPR.conflict}</_.ConflictText>
              </_.ConflictInfo>
              <_.ResolveInputContainer>
                <_.ResolveLabel>해결 내용:</_.ResolveLabel>
                <_.ResolveTextarea
                  value={resolveText}
                  onChange={(e) => setResolveText(e.target.value)}
                  placeholder="충돌을 어떻게 해결했는지 설명해주세요..."
                  rows={4}
                />
              </_.ResolveInputContainer>
              <_.ConflictButtonContainer>
                <MemorialBtn
                  name="해결 완료"
                  onClick={handleResolveConflict}
                  type="submit"
                  active={!!resolveText.trim() && !resolveMutation.isPending}
                  width="80px"
                  height="36px"
                  fontSize="14px"
                />
                <MemorialBtn
                  name="취소"
                  onClick={() => {
                    setConflictPR(null);
                    setResolveText('');
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
        </_.ContentContainer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default MemorialChief;
