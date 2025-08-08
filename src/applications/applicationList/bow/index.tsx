import * as _ from '@/applications/applicationList/bow/style.ts';
import Table from '@/assets/bow/table.svg';
import Character from '@/assets/character/hosino.svg';
import { useMemorialBow } from '@/api/memorial/memorialBow.ts';
import { useEffect, useState } from 'react';
import { useMemorialGet } from '@/api/memorial/countBowsByMi.ts';
import { useAtom } from 'jotai';
import { memorialIdAtom } from '@/atoms/memorialManager';
const Bow = () => {
  const [totalBow, setTotalBow] = useState<number | null>(null);
  const mutationMemorialGet = useMemorialGet(setTotalBow);
  const mutationMemorialBows = useMemorialBow();
  const [memorialId] = useAtom(memorialIdAtom);
  const addBow = () => {
    mutationMemorialBows.mutate(memorialId);
  };
  useEffect(() => {
    mutationMemorialGet.mutate(memorialId);
  }, []);
  console.log(totalBow);
  return (
    <_.main>
      <_.nbow>
        <div>절하고 간 사람 : {totalBow?totalBow:"0"}명</div>
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
    </_.main>
  );
};
export default Bow;
