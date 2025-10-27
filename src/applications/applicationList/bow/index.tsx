import * as _ from '@/applications/applicationList/bow/style.ts';
import Table from '@/assets/bow/table.svg';
// import { useMemorialBow } from '@/api/memorial/memorialBow.ts';
import { useEffect, useState } from 'react';
import { useMemorialGet as useMemorialGetBowCount } from '@/api/memorial/countBowsByMi.ts';
import { useMemorialGet } from '@/api/memorial/memorialGet.ts';
import { useGetCharacter, type CharacterData } from '@/api/anime/getCharacter.ts';
import type { memorialData } from '@/api/memorial/memorialGet.ts';
import Mourners from '@/applications/components/mourners';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import Choten from '@/assets/profile/choten.svg';
import { getCookie } from '@/api/auth/cookie.ts';
import { useGetBowByUserId } from '@/api/memorial/memorialBow.ts';

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
  const token = getCookie('access_token');
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
          taskTransform?.('경고', '');
        },
      );
    } else {
      mutationMemorialBows.mutate(memorialId, {
        onSuccess: () => {
          // 서버 응답 성공 시에만 UI 숫자 증가
          setTotalBow((prev) => (prev ? prev + 1 : 1));
        },
      });
    }
  };
  useEffect(() => {
    // Bow count 가져오기
    mutationMemorialGetBowCount.mutate(memorialId, {
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
  }, [memorialId]); // memorialId만 의존성으로 사용
  // console.log(totalBow);

  // 캐릭터 데이터가 로드되기 전에는 렌더링하지 않음
  if (!characterData) {
    return null;
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
