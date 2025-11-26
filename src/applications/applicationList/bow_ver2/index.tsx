import * as _ from '@/applications/applicationList/bow_ver2/style.ts';
import { useEffect, useState } from 'react';
import { useMemorialGet } from '@/api/memorial/memorialGet.ts';
import { useGetCharacter, type CharacterData } from '@/api/anime/getCharacter.ts';
import type { memorialData } from '@/api/memorial/memorialGet.ts';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { getCookie } from '@/api/auth/cookie.ts';
import { useMemorialBow, useGetBowStatus } from '@/api/memorial/memorialBow.ts';
import { useGetUserMutation } from '@/api/user/getUser.ts';
import Loading from '@/applications/components/loading';
import { useMemorialChiefBows } from '@/api/memorial/getMemorialChiefs.ts';
import type { BowData } from '@/modules/interface.ts';
import ribbon from '@/assets/memorial_ribbon.svg';
import table from '@/assets/bow/table.svg';
import MemorialBtn from '@/applications/components/memorialBtn';

interface bowProps {
  memorialId: number;
}

const NewBow = ({ memorialId }: bowProps) => {
  const [memorialData, setMemorialData] = useState<memorialData>(null);
  const [characterData, setCharacterData] = useState<CharacterData>(null);
  const [bowData, setBowData] = useState<BowData[]>();
  const [canBow, setCanBow] = useState<boolean>(true);
  const [availableAt, setAvailableAt] = useState<string>('');
  const [remainingTime, setRemainingTime] = useState<string>('00:00:00');
  const [remainClick, setRemainClick] = useState<number>(2);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const mutationMemorialGet = useMemorialGet(setMemorialData);
  const mutationGetCharacter = useGetCharacter(setCharacterData);
  const mutationMemorialChiefs = useMemorialChiefBows(setBowData, memorialId);
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const { mutate: getUser, data: userData } = useGetUserMutation();
  const userId = userData?.data?.userId || 'user';
  const token = getCookie('access_token');
  const memorialBowMutation = useMemorialBow();
  const bowStatusMutation = useGetBowStatus();

  useEffect(() => {
    getUser();
  }, [getUser]);

  // 카운트다운 타이머
  useEffect(() => {
    if (!availableAt) {
      setRemainingTime('00:00:00');
      return;
    }

    const updateRemainingTime = () => {
      try {
        // "2025-11-26 17:27:29" -> "2025-11-26T17:27:29" (ISO 8601 형식으로 변환)
        const isoString = availableAt.replace(' ', 'T');
        const targetDate = new Date(isoString);
        const now = new Date();

        // 유효한 날짜인지 확인
        if (isNaN(targetDate.getTime())) {
          setRemainingTime('00:00:00');
          return;
        }

        const diff = targetDate.getTime() - now.getTime();

        if (diff <= 0) {
          setRemainingTime('00:00:00');
          setCanBow(true);
          return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        setRemainingTime(formattedTime);
      } catch (error) {
        setRemainingTime('00:00:00');
      }
    };

    // 즉시 실행
    updateRemainingTime();

    // 1초마다 업데이트
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [availableAt]);

  // bow 상태 확인 함수
  const checkBowStatus = () => {
    if (token && userId && userId !== 'user') {
      bowStatusMutation.mutate(
        { userId, memorialId },
        {
          onSuccess: (response: any) => {
            console.log('Bow status response:', response);
            // 응답 구조: { message: "...", data: { canBow, availableAt } }
            const data = response.data || response;
            console.log('Extracted data:', data);
            setCanBow(data.canBow);
            setAvailableAt(data.availableAt);
            // canBow가 true로 변경되면 remainClick 초기화
            if (data.canBow) {
              setRemainClick(2);
            }
          },
          onError: (error) => {
            console.error('Failed to check bow status:', error);
          },
        },
      );
    }
  };

  const getMemorialData = () => {
    mutationMemorialGet.mutate(memorialId, {
      onSuccess: (data) => {
        // 초기 로딩 완료
        setIsInitialLoad(false);

        // Memorial 정보에서 characterId를 얻어 캐릭터 정보 가져오기
        if (data.data?.characterId) {
          mutationGetCharacter.mutate(data.data.characterId, {
            onError: () => {
              setAlert?.(
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
      },
      onError: () => {
        setAlert?.(
          <>
            추모관 정보를 가져오는 중 문제가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </>,
          () => {
            taskTransform?.('경고', '');
          },
        );
      },
    });
  };
  useEffect(() => {
    // Memorial 정보 가져오기
    getMemorialData();
    // 상주목록 초기 로드
    mutationMemorialChiefs.mutate(undefined, {
      onError: () => {
        setAlert?.(
          <>
            조문객 명단을 가져오는 중 문제가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </>,
          () => {
            taskTransform?.('경고', '');
          },
        );
      },
    });
  }, [memorialId]);

  // userId가 로드되면 bow 상태 확인
  useEffect(() => {
    if (userId && userId !== 'user') {
      checkBowStatus();
    }
  }, [userId, memorialId]);

  const addBow = () => {
    // 이미 절을 한 경우 아무 동작도 하지 않음
    if (remainClick === 0) {
      return;
    }

    if (!token && setAlert) {
      setAlert(
        <>
          게스트는 절을 할 수 없습니다.
          <br />
          로그인 후 사용 가능 합니다.
        </>,
        () => {
          taskTransform?.('경고', '로그인');
        },
      );
      return;
    }

    if (!canBow && setAlert) {
      const formatAvailableTime = (timeStr: string) => {
        if (!timeStr) return '';
        try {
          // "2025-11-26 17:27:29" -> "2025-11-26T17:27:29"
          const isoString = timeStr.replace(' ', 'T');
          const date = new Date(isoString);

          if (isNaN(date.getTime())) {
            return '잠시 후';
          }

          const now = new Date();
          const diff = date.getTime() - now.getTime();

          if (diff <= 0) {
            return '0분';
          }

          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          return `${hours}시간 ${minutes}분`;
        } catch {
          return '잠시 후';
        }
      };

      setAlert(
        <>
          아직 절을 할 수 없습니다
          <br />
          절은 24시간마다 할 수 있습니다.
          <br />* 남은 시간: {formatAvailableTime(availableAt)}
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    }

    // 2번 클릭 메커니즘: remainClick이 1보다 크면 카운트만 감소
    if (remainClick > 1) {
      setRemainClick((prev) => prev - 1);
      return;
    }

    // remainClick이 1이면 즉시 UI 업데이트하고 백그라운드에서 API 호출
    setRemainClick(0);

    memorialBowMutation.mutate(memorialId, {
      onError: (error) => {
        // API 실패 시 remainClick 복원
        setRemainClick(1);
        const remainTime = error.response?.data.remainTime;
        const formatRemainTime = (timeStr?: string) => {
          if (!timeStr) return '';
          const [hours, minutes] = timeStr.split(':');
          return `${Number(hours)}시 ${Number(minutes)}분`;
        };
        (setAlert ?? userId)(
          <>
            아직 절을 할 수 없습니다
            <br />
            절은 24시간마다 할 수 있습니다.
            <br />* 남은 시간: {formatRemainTime(remainTime)}
          </>,
          () => {
            taskTransform?.('경고', '');
          },
        );
      },
      onSuccess: () => {
        // 백그라운드에서 데이터 갱신
        getMemorialData();
        // 상주목록 revalidation
        mutationMemorialChiefs.mutate(undefined, {
          onError: () => {
            console.error('상주목록 갱신 실패');
          },
        });
        // bow 상태 다시 확인
        checkBowStatus();
      },
    });
  };

  // 캐릭터 데이터가 로드되기 전에는 렌더링하지 않음
  if (!characterData) {
    return null;
  }
  // 초기 로딩 시에만 로딩 화면 표시
  if (mutationMemorialGet.isPending && isInitialLoad) {
    return (
      <Loading
        overlay={true}
        text="정보를 가져오는 중입니다..."
      />
    );
  }
  // 사용자 데이터 찾기
  const userRank = bowData?.findIndex((mourner) => mourner.userId === userId);
  const userMourner =
    userRank !== undefined && userRank !== -1 && bowData ? bowData[userRank] : null;

  return (
    <_.Container>
      <_.MainContent>
        <_.LeftPanel>
          <_.TopSection>
            <_.InfoBox>
              <_.InfoLabel>절 한 사람:</_.InfoLabel>
              <_.InfoValue>{memorialData?.bowCount || 0}명</_.InfoValue>
            </_.InfoBox>

            <_.InfoBox>
              <_.InfoLabel>다음 절 까지:</_.InfoLabel>
              <_.InfoValue>{canBow ? '00:00' : remainingTime}</_.InfoValue>
            </_.InfoBox>

            <_.InfoBox>
              <_.InfoLabel>내 보유 토큰:</_.InfoLabel>
              <_.InfoValue>{userData?.data?.remainToken || 0}</_.InfoValue>
            </_.InfoBox>
          </_.TopSection>

          <_.MournersWrapper>
            <_.MournersTitle>조문객 명단</_.MournersTitle>
            <_.MournersListContainer>
              <_.MournersList>
                {bowData?.slice(0, 3).map((mourner, index) => (
                  <_.MournerItem key={index}>
                    <_.MournerRankGroup>
                      <_.MournerRank>#{index + 1}</_.MournerRank>
                      {mourner.profileUrl && (
                        <_.MournerAvatar
                          src={mourner.profileUrl}
                          alt="profile"
                        />
                      )}
                    </_.MournerRankGroup>
                    <_.MournerInfo>
                      <_.MournerNameRow>
                        <_.MournerName>{mourner.name || 'user'}</_.MournerName>
                        <_.MournerBadge>(상주)</_.MournerBadge>
                      </_.MournerNameRow>
                      <_.MournerCount>{mourner.bowCount}회</_.MournerCount>
                    </_.MournerInfo>
                  </_.MournerItem>
                ))}
              </_.MournersList>
            </_.MournersListContainer>

            {userMourner && (
              <_.MournersListContainer>
                <_.MournersList>
                  <_.MournerItem>
                    <_.MournerRankGroup>
                      <_.MournerRank>#{userRank !== undefined ? userRank + 1 : 0}</_.MournerRank>
                      {userMourner.profileUrl && (
                        <_.MournerAvatar
                          src={userMourner.profileUrl}
                          alt="profile"
                        />
                      )}
                    </_.MournerRankGroup>
                    <_.MournerInfo>
                      <_.MournerNameRow>
                        <_.MournerName>나</_.MournerName>
                      </_.MournerNameRow>
                      <_.MournerCount>{userMourner.bowCount}회</_.MournerCount>
                    </_.MournerInfo>
                  </_.MournerItem>
                </_.MournersList>
              </_.MournersListContainer>
            )}
          </_.MournersWrapper>
        </_.LeftPanel>

        <_.RightPanel>
          <_.MemorialArea>
            <_.PictureContainer>
              <_.Ribbon
                src={ribbon}
                alt="ribbon"
              />
              <_.CharacterImage
                src={characterData.imageUrl}
                alt={characterData.name || '캐릭터'}
              />
            </_.PictureContainer>
            <_.TableImage
              src={table}
              alt="table"
            />
          </_.MemorialArea>

          <_.BowButtonSection>
            <MemorialBtn
              key={'절'}
              name={`절(${remainClick === 0 || !canBow ? '0' : remainClick}회 남음)`}
              active={canBow && remainClick > 0}
              onClick={addBow}
              type="submit"
              fontSize="32px"
              width="300px"
              height="70px"
            />
            {!canBow && remainClick === 0 && <_.BowStatus>절을 이미 했습니다</_.BowStatus>}
          </_.BowButtonSection>
        </_.RightPanel>
      </_.MainContent>
    </_.Container>
  );
};
export default NewBow;
