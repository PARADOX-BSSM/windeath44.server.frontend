import * as _ from '@/applications/applicationList/bow/style.ts';
import Table from '@/assets/bow/table.svg';
import Character from '@/assets/character/hosino.svg';
import { useMemorialBow } from '@/api/memorial/memorialBow.ts';
import { useEffect, useState } from 'react';
import { useMemorialGet } from '@/api/memorial/countBowsByMi.ts';
import Mourners from '@/applications/components/mourners';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import Choten from '@/assets/profile/choten.svg';

interface bowProps {
  memorialId: number;
}

const Bow = ({ memorialId }: bowProps) => {
  const [totalBow, setTotalBow] = useState<number | null>(null);
  const mutationMemorialGet = useMemorialGet(setTotalBow);
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const mutationMemorialBows = useMemorialBow();
  const addBow = () => {
    mutationMemorialBows.mutate(memorialId);
  };
  useEffect(() => {
    mutationMemorialGet.mutate(memorialId, {
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
  }, []);
  console.log(totalBow);
  return (
    <_.main>
      <_.nbow>
        <div>절하고 간 사람 : {totalBow ? totalBow : '0'}명</div>
      </_.nbow>
      <_.place>
        <_.imgs>
          <_.character
            src={Character}
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
