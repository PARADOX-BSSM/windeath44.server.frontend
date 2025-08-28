import * as _ from './style';
import { useMemorialChiefs } from '@/api/memorial/getMemorialChiefs.ts';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { memorialIdAtom } from '@/atoms/memorialManager.ts';

const Mourners = () => {
  const [memorialId] = useAtom(memorialIdAtom);
  const mutationMemorialChiefs = useMemorialChiefs({ memorialId });
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
