import * as _ from './style';
import type { BowData } from '@/modules/interface.ts';

interface bowProps {
  bowData?: BowData[];
}

const Mourners = ({ bowData }: bowProps) => {
  return (
    <_.Container>
      <_.Title>조문객 명단</_.Title>
      <_.UserList>
        {bowData?.slice(0, 10).map((user, index) => {
          return (
            <_.UserItem key={index}>
              <div>
                <_.UserIndex>#{index + 1}</_.UserIndex>
              </div>
              <_.UserInfo>
                <_.UserNameSet>
                  <_.UserName>{user.name ? user.name : 'user'}</_.UserName>
                  {index < 3 && <_.UserRoll>(상주)</_.UserRoll>}
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
