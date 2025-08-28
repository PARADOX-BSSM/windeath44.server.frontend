import * as _ from './style';
import { useMemorialChiefBows } from '@/api/memorial/getMemorialChiefs.ts';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { memorialIdAtom } from '@/atoms/memorialManager.ts';
type bowData = {
  name: string;
  bowCount: number;
};
const Mourners = () => {
  const [memorialId] = useAtom(memorialIdAtom);
  console.log('아이디', memorialId);
  const [bowData, setbowData] = useState<bowData[]>();
  const mutationMemorialChiefs = useMemorialChiefBows(setbowData, memorialId);
  console.log('bowData', bowData);
  const mockList = [
    {
      name: '소메링링',
      num: 1234,
    },
    {
      name: '이케아 연필도둑',
      num: 536,
    },
  ];

  useEffect(() => {
    if (!memorialId) return;
    mutationMemorialChiefs.mutate();
  }, [memorialId]);
  return (
    <_.Container>
      <_.Title>조문객 명단</_.Title>
      <_.UserList>
        {mockList.map((user, index) => {
          return (
            <_.UserItem key={index}>
              <div>
                <_.UserIndex>#{index + 1}</_.UserIndex>
              </div>
              <_.UserInfo>
                <_.UserNameSet>
                  <_.UserName>{user.name}</_.UserName>
                  {index === 0 && <_.UserRoll>(상주)</_.UserRoll>}
                </_.UserNameSet>
                <_.UserNumber>{user.num}회</_.UserNumber>
              </_.UserInfo>
            </_.UserItem>
          );
        })}
      </_.UserList>
    </_.Container>
  );
};
export default Mourners;
