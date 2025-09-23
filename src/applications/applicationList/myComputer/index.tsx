import MemorialBtn from '@/applications/components/memorialBtn/index.tsx';
import * as _ from './style.ts';
import myComputer from '@/assets/appIcons/my_computer.svg';
import Choten from '@/assets/profile/choten.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { alerterAtom } from '@/atoms/alerter';
import { useAtomValue } from 'jotai';
import MemorialWithIcon from '@/applications/components/memorialWithIcon/index.tsx';
import { useLogOut } from '@/api/auth/logout.ts';
import { useGetUserMutation } from '@/api/user/getUser.ts';
import React from 'react';

const MyComputer = () => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  const logOutMutation = useLogOut();
  const { mutate: getUser, data: userData, isPending, error } = useGetUserMutation();
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('isLogIned') === 'true');

  React.useEffect(() => {
    if (loggedIn) {
      getUser(undefined as unknown as void, {
        onError: () => {
          // 세션 만료 등으로 401 발생 시 로그인 상태 해제
          localStorage.setItem('isLogIned', 'false');
          setLoggedIn(false);
        },
      });
    }
  }, [loggedIn, getUser]);

  // React.useEffect(() => {
  //   console.log('userData:', userData);
  // }, [userData]);

  const renderMemorialBtn = () => {
    const isLoggedIn = loggedIn;
    return (
      <MemorialBtn
        name={isLoggedIn ? '로그아웃' : '로그인'}
        onClick={() => {
          // console.log(isLoggedIn);
          taskTransform?.('', isLoggedIn ? '' : '로그인');
          if (isLoggedIn) {
            localStorage.removeItem('access_token');
            localStorage.setItem('isLogIned', 'false');
            sessionStorage.setItem('hasBootedSession', 'false');
            setLoggedIn(false);
            // logOutMutation.mutate(undefined, {
            //   onSuccess: () => {
            //     location.reload();
            //   },
            //   onError: (error) => {
            //     console.error('로그아웃 실패', error);
            //     setAlert?.(
            //       Choten,
            //       <>로그아웃 중 오류가 발생했습니다.</>,
            //       () => {
            //         taskTransform?.('경고', '');
            //       }
            //     );
            //     location.reload(); // 에러가 발생해도 로그아웃 처리
            //   },
            // });
          }
        }}
        type="submit"
        active={true}
        width="116px"
        fontSize="18px"
      />
    );
  };

  const isLoggedIn = loggedIn;
  const isUserReady =
    !!(userData && (userData as any).data && (userData as any).data.name) && !isPending && !error;

  if (isLoggedIn && !isUserReady) {
    return null;
  }

  return (
    <_.Container>
      <_.LeftContainer>
        <_.ProfileContainer>
          <_.ProfileImg src={Choten} />
          {isLoggedIn ? (
            isUserReady ? (
              <_.ProfileName>{(userData as any).data.name}</_.ProfileName>
            ) : null
          ) : (
            <_.ProfileName>게스트</_.ProfileName>
          )}
        </_.ProfileContainer>
        {renderMemorialBtn()}
      </_.LeftContainer>
      <_.Btn>
        <_.InnerItem>
          <_.Title>최근 방문한 추모관</_.Title>
          <_.Shadow>
            <_.Inputs>
              <MemorialWithIcon
                icon={myComputer}
                name="호시노 아이"
                onDoubleClick={() => undefined}
              />
              <MemorialWithIcon
                icon={myComputer}
                name="호시노 아이"
                onDoubleClick={() => undefined}
              />
              <MemorialWithIcon
                icon={myComputer}
                name="호시노 아이"
                onDoubleClick={() => undefined}
              />
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
