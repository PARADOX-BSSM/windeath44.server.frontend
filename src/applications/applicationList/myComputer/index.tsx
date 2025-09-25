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
import { useGetMemorialTracingQuery } from '@/api/memorial/getMemorialTracing.ts';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { memorial, anime } from '@/config';
import React from 'react';

// 추모관 정보를 가져오는 커스텀 hook
const useMemorialInfo = (memorialId: number) => {
  return useQuery({
    queryKey: ['memorial', memorialId],
    queryFn: async () => {
      const response = await axiosInstance.get(`${memorial}/${memorialId}`);
      return response.data.data;
    },
    enabled: !!memorialId,
  });
};

// 캐릭터 정보를 가져오는 커스텀 hook
const useCharacterInfo = (characterId: number) => {
  return useQuery({
    queryKey: ['character', characterId],
    queryFn: async () => {
      const response = await axiosInstance.get(`${anime}/characters/${characterId}`);
      return response.data.data;
    },
    enabled: !!characterId,
  });
};

// 개별 추모관 아이템 컴포넌트
const MemorialItem = ({
  memorialId,
  taskTransform,
}: {
  memorialId: number;
  taskTransform: any;
}) => {
  const { data: memorialData } = useMemorialInfo(memorialId);
  const { data: characterData } = useCharacterInfo(memorialData?.characterId);

  return (
    <MemorialWithIcon
      key={memorialId}
      icon={myComputer}
      name={characterData?.name || `추모관 #${memorialId}`}
      onDoubleClick={() => {
        taskTransform?.('', '추모관 뷰어', {
          memorialId: memorialId,
          characterId: memorialData?.characterId || 0,
        });
      }}
    />
  );
};

const MyComputer = () => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  const logOutMutation = useLogOut();
  const { mutate: getUser, data: userData, isPending, error } = useGetUserMutation();
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('isLogIned') === 'true');

  // localStorage 변경 감지하여 로그인 상태 업데이트
  React.useEffect(() => {
    const handleStorageChange = () => {
      const isLoggedIn = localStorage.getItem('isLogIned') === 'true';
      setLoggedIn(isLoggedIn);
    };

    // storage 이벤트 리스너 (다른 탭에서 변경 시)
    window.addEventListener('storage', handleStorageChange);

    // 주기적으로 localStorage 확인 (같은 탭에서 변경 시)
    const intervalId = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  // 최근 방문한 추모관 데이터 조회
  const userId = userData?.data?.userId || '';
  const {
    data: memorialTracingData,
    isLoading: isTracingLoading,
    error: tracingError,
  } = useGetMemorialTracingQuery(userId);

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
          {isLoggedIn ? (
            isUserReady ? (
              <>
                <_.ProfileImg
                  imgUrl={(userData as any).data.profile}
                  draggable="false"
                />
                <_.ProfileName>{(userData as any).data.name}</_.ProfileName>
              </>
            ) : null
          ) : (
            <>
              <_.ProfileImg
                imgUrl=""
                draggable="false"
              />
              <_.ProfileName>게스트</_.ProfileName>
            </>
          )}
        </_.ProfileContainer>
        {renderMemorialBtn()}
      </_.LeftContainer>
      <_.Btn>
        <_.InnerItem>
          <_.Title>최근 방문한 추모관</_.Title>
          <_.Shadow>
            <_.Inputs>
              {!loggedIn ? (
                <_.MessageText>로그인 후 이용할 수 있습니다.</_.MessageText>
              ) : isTracingLoading ? (
                <_.MessageText>로딩 중...</_.MessageText>
              ) : tracingError ? (
                <_.MessageText>데이터를 불러오는 중 오류가 발생했습니다.</_.MessageText>
              ) : memorialTracingData?.data?.length === 0 ? (
                <_.MessageText>방문한 추모관이 없습니다.</_.MessageText>
              ) : (
                // memorialId로 고유한 추모관 목록 생성
                Array.from(new Set(memorialTracingData?.data?.map((comment) => comment.memorialId)))
                  .slice(0, 3) // 최대 3개만 표시
                  .map((memorialId) => (
                    <MemorialItem
                      key={memorialId}
                      memorialId={memorialId}
                      taskTransform={taskTransform}
                    />
                  ))
              )}
            </_.Inputs>
          </_.Shadow>
        </_.InnerItem>
        <_.InnerItem>
          <_.Title>인벤토리</_.Title>
          <_.Shadow>
            <_.Inputs>
              {!loggedIn ? (
                <_.MessageText>로그인 후 이용할 수 있습니다.</_.MessageText>
              ) : (
                <_.MessageText>추후 추가될 기능입니다.</_.MessageText>
              )}
            </_.Inputs>
          </_.Shadow>
        </_.InnerItem>
      </_.Btn>
    </_.Container>
  );
};

export default MyComputer;
