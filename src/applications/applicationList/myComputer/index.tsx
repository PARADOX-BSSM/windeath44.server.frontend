import MemorialBtn from '@/applications/components/memorialBtn/index.tsx';
import * as _ from './style.ts';
import myComputer from '@/assets/appIcons/my_computer.svg';
import Choten from '@/assets/profile/choten.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { useAtomValue } from 'jotai';
import { useLogOut } from '@/api/auth/logout.ts';

const MyComputer = () => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const logOutMutation = useLogOut();

  const renderMemorialBtn = () => {
    const isLoggedIn = localStorage.getItem('isLogIned') === 'true';
    return (
      <MemorialBtn
        name={isLoggedIn ? '로그아웃' : '로그인'}
        onClick={() => {
          taskTransform?.('', isLoggedIn ? '' : '로그인');
          if (isLoggedIn) {
            localStorage.removeItem('access_token');
            localStorage.setItem('isLogIned', 'false');
            localStorage.setItem('hasBooted', 'false');
            // logOutMutation.mutate(undefined, {
            //   onSuccess: () => {},
            //   onError: (error) => {
            //     console.error('로그아웃 실패', error);
            //   },
            // });
          }
        }}
        type="submit"
        active={true}
        widthPercent={12}
        heightPercent={4.4}
        fontSize="0.85rem"
      />
    );
  };

  return (
    <_.Container>
      <_.LeftContainer>
        <_.ProfileContainer>
          <_.ProfileImg src={Choten} />
          <_.ProfileName>
            {localStorage.getItem('isLogIned') === 'true' ? '유승찬' : '게스트'}
          </_.ProfileName>
        </_.ProfileContainer>
        {renderMemorialBtn()}
      </_.LeftContainer>
      <_.Btn>
        <_.InnerItem>
          <_.Title>최근 방문한 추모관</_.Title>
          <_.Shadow>
            <_.Inputs>
              <_.Item>
                <_.Icon src={myComputer} />
                <_.Name>호시노 아이</_.Name>
              </_.Item>
              <_.Item>
                <_.Icon src={myComputer} />
                <_.Name>호시노 아이</_.Name>
              </_.Item>
              <_.Item>
                <_.Icon src={myComputer} />
                <_.Name>호시노 아이</_.Name>
              </_.Item>
            </_.Inputs>
          </_.Shadow>
        </_.InnerItem>
        <_.InnerItem>
          <_.Title>최근 작성한 추모글</_.Title>
          <_.Shadow>
            <_.Inputs></_.Inputs>
          </_.Shadow>
        </_.InnerItem>
      </_.Btn>
    </_.Container>
  );
};

export default MyComputer;
