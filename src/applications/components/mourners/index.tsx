import * as _ from './style';
import { useMemorialChiefBows } from '@/api/memorial/getMemorialChiefs.ts';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { alerterAtom } from '@/atoms/alerter';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import Choten from '@/assets/profile/choten.svg';

type bowData = {
  name: string;
  bowCount: number;
};
interface bowProps {
  memorialId: number;
}
const Mourners = ({ memorialId }: bowProps) => {
  console.log('아이디', memorialId);
  const [bowData, setbowData] = useState<bowData[]>();
  const mutationMemorialChiefs = useMemorialChiefBows(setbowData, memorialId);
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  // console.log('bowData', bowData);

  useEffect(() => {
    if (!memorialId) return;
    mutationMemorialChiefs.mutate(undefined, {
      onError: () => {
        setAlert?.(
          Choten,
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
