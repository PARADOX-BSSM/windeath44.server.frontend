import * as _ from '@/applications/applicationList/bow/style.ts';
import Table from '@/assets/bow/table.svg';
import { useEffect, useState } from 'react';
import { useMemorialGet as useMemorialGetBowCount } from '@/api/memorial/countBowsByMi.ts';
import { useMemorialGet } from '@/api/memorial/memorialGet.ts';
import { useGetCharacter, type CharacterData } from '@/api/anime/getCharacter.ts';
import type { memorialData } from '@/api/memorial/memorialGet.ts';
import Mourners from '@/applications/components/mourners';
import { useAtom, useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import Choten from '@/assets/profile/choten.svg';
import { getCookie } from '@/api/auth/cookie.ts';
import { useGetBowByUserId, useMemorialBow } from '@/api/memorial/memorialBow.ts';
import { useGetUserMutation } from '@/api/user/getUser.ts';
import Loading from '@/applications/components/loading';

interface bowProps {
  memorialId: number;
}

const Bow = ({ memorialId }: bowProps) => {
  const [totalBow, setTotalBow] = useState<number | null>(null);
  const [memorialData, setMemorialData] = useState<memorialData>(null);
  const [characterData, setCharacterData] = useState<CharacterData>(null);
  const mutationMemorialGetBowCount = useMemorialGetBowCount(setTotalBow);
  const mutationMemorialGet = useMemorialGet(setMemorialData);
  const mutationGetCharacter = useGetCharacter(setCharacterData);
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const mutationMemorialBows = useGetBowByUserId();
  const { mutate: getUser, data: userData } = useGetUserMutation();
  const userId = userData?.data?.userId || 'user';
  const token = getCookie('access_token');
  const memorialBowMutation = useMemorialBow();
  const addBow = () => {
    if (!token && setAlert) {
      setAlert(
        Choten,
        <>
          게스트는 절을 할 수 없습니다.
          <br />
          로그인 후 사용 가능 합니다.
        </>,
        () => {
          taskTransform?.('경고', '로그인');
        },
      );
    } else {
      memorialBowMutation.mutate(memorialId, {
        onError: (error) => {
          const remainTime = error.response?.data.remainTime;
          const formatRemainTime = (timeStr?: string) => {
            if (!timeStr) return '';
            const [hours, minutes] = timeStr.split(':');
            return `${Number(hours)}시 ${Number(minutes)}분`;
          };
          (setAlert ?? userId)(
            Choten,
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
          // 서버 응답 성공 시에만 UI 숫자 증가
          (setAlert ?? userId)(
            Choten,
            <>
              절하기를 성공하였습니다.
              <br />
              절하기를 한 번 한 후엔 24시간이 지나야 다시 할 수 있습니다.
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
          setTotalBow((prev) => (prev ? prev + 1 : 1));
        },
      });
    }
  };
  useEffect(() => {
    getUser();
  }, [getUser]);
  useEffect(() => {
    // Bow count 가져오기
    mutationMemorialGetBowCount.mutate(memorialId, {
      onSuccess: () => {},
      onError: () => {
        setAlert?.(
          Choten,
          <>
            정보를 가져오는 중 문제가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </>,
          () => {
            taskTransform?.('경고', '');
          },
        );
      },
    });
    // Memorial 정보 가져오기
    mutationMemorialGet.mutate(memorialId, {
      onSuccess: (data) => {
        // Memorial 정보에서 characterId를 얻어 캐릭터 정보 가져오기
        if (data.data?.characterId) {
          mutationGetCharacter.mutate(data.data.characterId, {
            onError: () => {
              setAlert?.(
                Choten,
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
          Choten,
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
  }, []); // memorialId만 의존성으로 사용
  // 캐릭터 데이터가 로드되기 전에는 렌더링하지 않음
  if (!characterData) {
    return null;
  }
  if (mutationMemorialBows.isPending) {
    return <Loading />;
  }
  return (
    <_.main>
      <_.nbow>
        <div>절하고 간 사람 : {totalBow ? totalBow : '0'}명</div>
      </_.nbow>
      <_.place>
        <_.imgs>
          <_.character
            src={characterData.imageUrl}
            alt={'캐릭터'}
          />
          <_.table
            src={Table}
            alt={'테이블'}
          />
        </_.imgs>
        <_.bbow>
          <div>
            <div>
              <div>
                <button onClick={addBow}>절</button>
              </div>
            </div>
          </div>
        </_.bbow>
      </_.place>
      <Mourners memorialId={memorialId} />
    </_.main>
  );
};
export default Bow;
