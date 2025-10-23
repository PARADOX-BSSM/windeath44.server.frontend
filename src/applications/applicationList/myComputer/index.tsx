import MemorialBtn from '@/applications/components/memorialBtn/index.tsx';
import * as _ from './style.ts';
import myComputer from '@/assets/appIcons/my_computer.svg';
import Choten from '@/assets/profile/choten.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { alerterAtom } from '@/atoms/alerter';
import { useAtomValue, useAtom } from 'jotai';
import { isLogInedAtom } from '@/atoms/windowManager';
import MemorialWithIcon from '@/applications/components/memorialWithIcon/index.tsx';
import { useLogOut } from '@/api/auth/logout.ts';
import { useGetUserMutation } from '@/api/user/getUser.ts';
import {
  useGetMemorialTracing,
  type MemorialTracingData,
} from '@/api/memorial/getMemorialTracing.ts';
import { useGetMemorialsByIdsQuery, type MemorialData } from '@/api/memorial/getMemorialsByIds.ts';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { memorial, anime } from '@/config';
import React, { useEffect, useState, useMemo } from 'react';

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
  memorialData,
  taskTransform,
}: {
  memorialData: MemorialData;
  taskTransform: any;
}) => {
  const { data: characterData } = useCharacterInfo(memorialData.characterId);

  return (
    <MemorialWithIcon
      key={memorialData.memorialId}
      icon={myComputer}
      name={characterData?.name || `추모관 #${memorialData.memorialId}`}
      onDoubleClick={() => {
        taskTransform?.('', '추모관 뷰어', {
          memorialId: memorialData.memorialId,
          characterId: memorialData.characterId,
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
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);
  const loggedIn = isLogIned === 'true';

  // 최근 방문한 추모관 데이터 상태 관리
  const [memorialTracingData, setMemorialTracingData] = useState<MemorialTracingData[]>([]);
  const [hasNextTracing, setHasNextTracing] = useState<boolean>(false);
  const mutationGetMemorialTracing = useGetMemorialTracing(
    setMemorialTracingData,
    setHasNextTracing,
    false,
  );
  const mutationLoadMoreTracing = useGetMemorialTracing(
    setMemorialTracingData,
    setHasNextTracing,
    true,
  );

  // memorialTracingData에서 고유한 memorialId 목록 추출
  const uniqueMemorialIds = useMemo(
    () => Array.from(new Set(memorialTracingData.map((item) => item.memorialId))),
    [memorialTracingData],
  );

  // 여러 추모관 정보를 한 번에 가져오기
  const { data: memorialsData, isLoading: isMemorialsLoading } = useGetMemorialsByIdsQuery(
    uniqueMemorialIds,
    loggedIn && uniqueMemorialIds.length > 0,
  );

  useEffect(() => {
    if (loggedIn) {
      getUser(undefined as unknown as void, {
        onError: () => {
          // 세션 만료 등으로 401 발생 시 로그인 상태 해제
          localStorage.setItem('isLogIned', 'false');
          setIsLogIned('false');
        },
      });
      // 로그인 시 추모관 방문 기록 조회
      mutationGetMemorialTracing.mutate({ size: 6 });
    }
  }, [loggedIn, getUser, setIsLogIned]);

  const handleLoadMoreTracing = () => {
    if (memorialTracingData.length === 0) return;
    // 마지막 항목의 viewedAt을 cursor로 사용
    const lastViewedAt = memorialTracingData[memorialTracingData.length - 1].viewedAt;
    mutationLoadMoreTracing.mutate({ size: 6, cursor: lastViewedAt });
  };

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
            setIsLogIned('false');
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
              ) : mutationGetMemorialTracing.isPending || isMemorialsLoading ? (
                <_.MessageText>로딩 중...</_.MessageText>
              ) : mutationGetMemorialTracing.isError ? (
                <_.MessageText>데이터를 불러오는 중 오류가 발생했습니다.</_.MessageText>
              ) : memorialTracingData.length === 0 ? (
                <_.MessageText>방문한 추모관이 없습니다.</_.MessageText>
              ) : memorialsData?.data && memorialsData.data.length > 0 ? (
                <>
                  {/* 추모관 목록 렌더링 */}
                  {memorialsData.data.map((memorial) => (
                    <MemorialItem
                      key={memorial.memorialId}
                      memorialData={memorial}
                      taskTransform={taskTransform}
                    />
                  ))}
                  {hasNextTracing && (
                    <MemorialBtn
                      name="더보기"
                      onClick={handleLoadMoreTracing}
                      type="button"
                      active={true}
                      width="100%"
                      fontSize="14px"
                    />
                  )}
                </>
              ) : (
                <_.MessageText>추모관 정보를 불러올 수 없습니다.</_.MessageText>
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
