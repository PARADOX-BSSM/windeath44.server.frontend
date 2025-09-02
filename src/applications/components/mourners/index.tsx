import * as _ from './style';
import { useMemorialChiefBows } from '@/api/memorial/getMemorialChiefs.ts';
import { useEffect, useState } from 'react';

type bowData = {
  name: string;
  bowCount: number;
};
const Mourners = ({ memorialId }) => {
  console.log('아이디', memorialId);
  const [bowData, setbowData] = useState<bowData[]>();
  const mutationMemorialChiefs = useMemorialChiefBows(setbowData, memorialId);
  // console.log('bowData', bowData);

  useEffect(() => {
    if (!memorialId) return;
    mutationMemorialChiefs.mutate(setbowData, memorialId);
  }, [bowData]);
  return (
    <_.Container>
      <_.Title>조문객 명단</_.Title>
      <_.UserList>
        {bowData.map((user, index) => {
          return (
            <_.UserItem key={index}>
              <div>
                <_.UserIndex>#{index + 1}</_.UserIndex>
              </div>
              <_.UserInfo>
                <_.UserNameSet>
                  <_.UserName>{user.name ? user.name : 'user'}</_.UserName>
                  {index === 0 && <_.UserRoll>(상주)</_.UserRoll>}
                </_.UserNameSet>
                <_.UserNumber>{user.bowCount}회</_.UserNumber>
              </_.UserInfo>
            </_.UserItem>
          );
        })}
      </_.UserList>
    </_.Container>
  );
};
export default Mourners;
