import * as _ from '@/applications/applicationList/bow/style.ts';
import Table from '@/assets/bow/table.svg';
import { useEffect, useState } from 'react';
import { useMemorialGet } from '@/api/memorial/memorialGet.ts';
import { useGetCharacter, type CharacterData } from '@/api/anime/getCharacter.ts';
import type { memorialData } from '@/api/memorial/memorialGet.ts';
import Mourners from '@/applications/components/mourners';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { getCookie } from '@/api/auth/cookie.ts';
import { useGetBowByUserId, useMemorialBow, useGetBowStatus } from '@/api/memorial/memorialBow.ts';
import { useGetUserMutation } from '@/api/user/getUser.ts';
import Loading from '@/applications/components/loading';
import { useMemorialChiefBows } from '@/api/memorial/getMemorialChiefs.ts';
import type { BowData } from '@/modules/interface.ts';
import ribbon from '@/assets/memorial_ribbon.svg';
import MemorialBtn from '@/applications/components/memorialBtn';
import Inputs from '@/applications/components/inputs';

interface bowProps {
  memorialId: number;
}

const Bow = ({ memorialId }: bowProps) => {
  const [totalBow, setTotalBow] = useState<number | null>(null);
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
  return (
    <_.main>
      <_.nbow>
        <div>절하고 간 사람 : {memorialData?.bowCount ? memorialData.bowCount : '0'}명</div>
      </_.nbow>
      <_.place>
        <_.imgs>
          <_.PictureContainer>
            <_.Ribbon
              src={ribbon}
              alt="ribbon"
            />
            <_.character
              src={characterData.imageUrl}
              alt={'캐릭터'}
            />
          </_.PictureContainer>
          <_.table
            src={Table}
            alt={'테이블'}
          />
        </_.imgs>
        <_.bbow>
          <_.BowCount>
            {remainClick === 0 || !canBow ? '절을 이미 했습니다' : `${remainClick}번 남았습니다.`}
          </_.BowCount>
          <Inputs
            width="100px"
            fontSize="16px"
            flex={true}
            value={remainingTime}
            type="text"
            disabled={false}
            setValue={() => {}}
          />
          <MemorialBtn
            key={'절'}
            name={'절'}
            active={canBow && remainClick > 0}
            onClick={addBow}
            type="submit"
            fontSize="1.2rem"
            width="20%"
            height="2.8rem"
          />
        </_.bbow>
      </_.place>
      <Mourners bowData={bowData} />
    </_.main>
  );
};
export default Bow;
