import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useGetMyChiefMemorialsQuery } from '@/api/memorial/getChiefMemorials';
import { CharacterData } from '@/api/anime/getCharacter';
import { useEffect, useMemo } from 'react';
import Block from '@/../public/assets/cursor/cursor_block.svg';
import { MemorialNoneIMesssege } from './style';
import { useGetMemorialsByIdsQuery } from '@/api/memorial/getMemorialsByIds';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { anime } from '@/config';

interface dataStructureProps {
  stack?: any[];
  push?: any;
  pop?: any;
  top?: any;
}

// 캐릭터 정보를 가져오는 커스텀 hook
const useCharacterInfo = (characterId: number) => {
  return useQuery({
    queryKey: ['character', characterId],
    queryFn: async () => {
      const response = await axiosInstance.get(`${anime}/characters/${characterId}`);
      return response.data.data;
    },
    enabled: !!characterId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시
  });
};

// 개별 추모관 아이템 컴포넌트
const ChiefMemorialItem = ({
  memorialData,
  taskTransform,
}: {
  memorialData: any;
  taskTransform: any;
}) => {
  const { data: characterData } = useCharacterInfo(memorialData.characterId);

  const handleVisitMemorial = () => {
    if (memorialData) {
      taskTransform?.('', '추모관 뷰어', {
        memorialId: memorialData.memorialId,
        characterId: memorialData.characterId,
      });
    }
  };

  const handleManagePullRequests = () => {
    if (memorialData && characterData) {
      taskTransform?.('', '추모관 수정 요청', {
        memorialId: memorialData.memorialId,
        memorialName: `${characterData.name}의 추모관`,
      });
    }
  };

  return (
    <_.MemorialItem>
      <_.MemorialInfo>
        <_.MemorialName>{characterData?.name || '로딩 중...'}의 추모관</_.MemorialName>
        <_.MemorialDetails>
          <_.DetailText>추모관 ID: {memorialData.memorialId}</_.DetailText>
          <_.DetailText>상주 권한으로 관리 가능</_.DetailText>
        </_.MemorialDetails>
      </_.MemorialInfo>

      <_.ButtonContainer>
        <MemorialBtn
          name="방문"
          onClick={handleVisitMemorial}
          type="submit"
          active={true}
          width="60px"
          height="32px"
          fontSize="12px"
        />
        <MemorialBtn
          name="수정 요청 관리"
          onClick={handleManagePullRequests}
          type="submit"
          active={true}
          width="120px"
          height="32px"
          fontSize="12px"
        />
      </_.ButtonContainer>
    </_.MemorialItem>
  );
};

const MemorialChief = ({ stack, push, pop, top }: dataStructureProps = {}) => {
  const taskSearch = useAtomValue(taskSearchAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);

  // 실제 API로 상주 추모관 목록 조회
  const { data: chiefMemorialsData, isLoading, error } = useGetMyChiefMemorialsQuery();

  // 중복 제거된 추모관 ID 목록
  const chiefMemorialIds = useMemo(() => {
    if (!chiefMemorialsData?.data) return [];
    return Array.from(new Set(chiefMemorialsData.data.map(Number)));
  }, [chiefMemorialsData]);

  // 여러 추모관 정보를 한 번에 가져오기
  const { data: memorialsData, isLoading: isMemorialsLoading } = useGetMemorialsByIdsQuery(
    chiefMemorialIds,
    chiefMemorialIds.length > 0,
  );

  // 추모관 데이터 중복 제거
  const uniqueMemorialsData = useMemo(() => {
    if (!memorialsData?.data) return null;

    // memorialId 기준으로 중복 제거
    const uniqueMemorials = Array.from(
      new Map(memorialsData.data.map((memorial) => [memorial.memorialId, memorial])).values(),
    );

    return { ...memorialsData, data: uniqueMemorials };
  }, [memorialsData]);

  // 에러 처리 - useEffect로 한 번만 실행
  useEffect(() => {
    if (error) {
      setAlert?.(
        Seori,
        <>
          상주 추모관 목록을 가져오는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    }
  }, [error, setAlert, taskTransform]);

  // 로딩 상태 처리
  if (isLoading || isMemorialsLoading) {
    return (
      <_.ContentContainer>
        <_.Header>
          <_.InnerHeader>
            <_.LeftHeader>
              <_.Title>상주 관리</_.Title>
              <_.Subtitle>로딩 중...</_.Subtitle>
            </_.LeftHeader>
          </_.InnerHeader>
        </_.Header>
      </_.ContentContainer>
    );
  }

  return (
    <_.MemorialListContainer>
      <_.MemorialListBox>
        <_.MemorialList>
          {chiefMemorialIds.length === 0 ? (
            <_.MemorialNone>
              <_.MemorialNoneImg src={Block} />
              <_.MemorialNoneIMesssege>
                상주인 추모관이 없습니다.
                <br />
                새로운 추모관을 신청하거나, 해당 추모관에서 절을 많이 하면 상주가 될 수 있습니다.
              </_.MemorialNoneIMesssege>
            </_.MemorialNone>
          ) : uniqueMemorialsData?.data && uniqueMemorialsData.data.length > 0 ? (
            uniqueMemorialsData.data.map((memorial) => (
              <ChiefMemorialItem
                key={memorial.memorialId}
                memorialData={memorial}
                taskTransform={taskTransform}
              />
            ))
          ) : (
            <_.MemorialNone>
              <_.MemorialNoneImg src={Block} />
              <_.MemorialNoneIMesssege>추모관 정보를 불러올 수 없습니다.</_.MemorialNoneIMesssege>
            </_.MemorialNone>
          )}
        </_.MemorialList>
      </_.MemorialListBox>
    </_.MemorialListContainer>
  );
};

export default MemorialChief;
