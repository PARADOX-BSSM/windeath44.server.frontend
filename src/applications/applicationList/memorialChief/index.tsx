import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useGetMyChiefMemorialsQuery } from '@/api/memorial/getChiefMemorials';
import { useMemorialGet, memorialData } from '@/api/memorial/memorialGet';
import { useGetCharacter, CharacterData } from '@/api/anime/getCharacter';
import { useState, useEffect, useCallback, useRef } from 'react';
import Block from '@/../public/assets/cursor/cursor_block.svg';
import { MemorialNoneIMesssege } from './style';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const MemorialChief = ({ stack, push, pop, top }: dataStructureProps) => {
  const taskSearch = useAtomValue(taskSearchAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  const [memorialDetails, setMemorialDetails] = useState<{
    [key: string]: { memorial: memorialData; character: CharacterData };
  }>({});
  const requestedIds = useRef<Set<string>>(new Set());

  // 실제 API로 상주 추모관 목록 조회
  const { data: chiefMemorialsData, isLoading, error } = useGetMyChiefMemorialsQuery();

  const chiefMemorialIds = chiefMemorialsData?.data || []; // string[] 형태

  // 추모관 정보를 가져오는 mutation들
  const memorialMutation = useMemorialGet(() => {});
  const characterMutation = useGetCharacter(() => {});

  // 추모관 상세 정보를 가져오는 함수
  const fetchMemorialDetails = useCallback(
    async (memorialId: string) => {
      // 이미 요청한 ID인 경우 스킵
      if (requestedIds.current.has(memorialId)) return;

      requestedIds.current.add(memorialId);

      try {
        const memorialResult = await memorialMutation.mutateAsync(parseInt(memorialId));
        if (memorialResult.data) {
          const characterResult = await characterMutation.mutateAsync(
            memorialResult.data.characterId,
          );
          setMemorialDetails((prev) => ({
            ...prev,
            [memorialId]: {
              memorial: memorialResult.data,
              character: characterResult.data,
            },
          }));
        }
      } catch (error) {
        console.error('추모관 정보 로딩 실패:', error);
        // 에러 발생 시 재요청 가능하도록 제거
        requestedIds.current.delete(memorialId);
      }
    },
    [memorialMutation, characterMutation],
  );

  // 추모관 목록이 로드되면 각 추모관의 상세 정보를 가져옴
  useEffect(() => {
    if (chiefMemorialIds.length > 0) {
      chiefMemorialIds.forEach((memorialId) => {
        fetchMemorialDetails(memorialId);
      });
    }
  }, [chiefMemorialIds, fetchMemorialDetails]);

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  const handleVisitMemorial = (memorialId: string) => {
    const details = memorialDetails[memorialId];
    if (details?.memorial) {
      taskTransform?.('', '추모관 뷰어', {
        memorialId: parseInt(memorialId),
        characterId: details.memorial.characterId,
      });
      // push(
      //   taskSearch?.('memorial', {
      //     ...stackProps,
      //     memorialId: parseInt(memorialId),
      //     characterId: details.memorial.characterId,
      //   }),
    }
  };

  const handleManagePullRequests = (memorialId: string) => {
    const details = memorialDetails[memorialId];
    if (details?.memorial && details?.character) {
        taskTransform?.('','추모관 수정 요청', {
          memorialId: parseInt(memorialId),
          memorialName: `${details.character.name}의 추모관`,
        });
    }
  };

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
  if (isLoading) {
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
  console.log('d없어',chiefMemorialIds);
  return (
          <_.MemorialListContainer>
            <_.MemorialListBox>
              <_.MemorialList>
                {chiefMemorialIds.length === 0 ?
                  <_.MemorialNone>
                    <_.MemorialNoneImg src={Block} />
                    <_.MemorialNoneIMesssege>
                    상주인 추모관이 없습니다.
                    <br/>
                    새로운 추모관을 신청하거나, 해당 추모관에서 절을 많이 하면 상주가 될 수 있습니다.
                    </_.MemorialNoneIMesssege>
                  </_.MemorialNone>
                  :
                  chiefMemorialIds.map((memorialId) => {
                  const details = memorialDetails[memorialId];
                  const characterName = details?.character?.name || '로딩 중...';
                  return (
                    <_.MemorialItem key={memorialId}>
                      <_.MemorialInfo>
                        <_.MemorialName>{characterName}의 추모관</_.MemorialName>
                        <_.MemorialDetails>
                          <_.DetailText>추모관 ID: {memorialId}</_.DetailText>
                          <_.DetailText>상주 권한으로 관리 가능</_.DetailText>
                        </_.MemorialDetails>
                      </_.MemorialInfo>

                      <_.ButtonContainer>
                        <MemorialBtn
                          name="방문"
                          onClick={() => handleVisitMemorial(memorialId)}
                          type="submit"
                          active={true}
                          width="60px"
                          height="32px"
                          fontSize="12px"
                        />
                        <MemorialBtn
                          name="수정 요청 관리"
                          onClick={() => handleManagePullRequests(memorialId)}
                          type="submit"
                          active={true}
                          width="120px"
                          height="32px"
                          fontSize="12px"
                        />
                      </_.ButtonContainer>
                    </_.MemorialItem>
                  );
                })
                }
              </_.MemorialList>
            </_.MemorialListBox>
          </_.MemorialListContainer>
  );
};

export default MemorialChief;
