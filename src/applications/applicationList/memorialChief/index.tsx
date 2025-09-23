import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import Choten from '@/assets/profile/choten.svg';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useGetMyChiefMemorialsQuery } from '@/api/memorial/getChiefMemorials';

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

  // 실제 API로 상주 추모관 목록 조회
  const { data: chiefMemorialsData, isLoading, error } = useGetMyChiefMemorialsQuery();

  const chiefMemorials = chiefMemorialsData?.data || [];

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  const handleVisitMemorial = (memorialId: number, characterId: number) => {
    push(
      taskSearch?.('memorial', {
        ...stackProps,
        memorialId: memorialId,
        characterId: characterId,
      }),
    );
  };

  // 에러 처리
  if (error) {
    setAlert?.(
      Choten,
      <>
        상주 추모관 목록을 가져오는 중 오류가 발생했습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </>,
      () => {
        taskTransform?.('경고', '');
      }
    );
  }

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <_.Container>
        <_.InnerContainer>
          <_.ContentContainer>
            <_.Header>
              <_.InnerHeader>
                <_.LeftHeader>
                  <_.Title>상주 관리</_.Title>
                  <_.Subtitle>로딩 중...</_.Subtitle>
                </_.LeftHeader>
                <_.BackButton onClick={() => pop()}>
                  돌아가기
                </_.BackButton>
              </_.InnerHeader>
            </_.Header>
          </_.ContentContainer>
        </_.InnerContainer>
      </_.Container>
    );
  }

  return (
    <_.Container>
      <_.InnerContainer>
        <_.ContentContainer>
          <_.Header>
            <_.InnerHeader>
              <_.LeftHeader>
                <_.Title>상주 관리</_.Title>
                <_.Subtitle>내가 상주인 추모관을 관리할 수 있습니다</_.Subtitle>
              </_.LeftHeader>
              <_.BackButton
                onClick={() => {
                  pop();
                }}
              >
                돌아가기
              </_.BackButton>
            </_.InnerHeader>
          </_.Header>

          <_.StatsContainer>
            <_.StatItem>
              <_.StatNumber>{chiefMemorials.length}</_.StatNumber>
              <_.StatLabel>총 상주 추모관</_.StatLabel>
            </_.StatItem>
            <_.StatItem>
              <_.StatNumber>{chiefMemorials.reduce((sum, m) => sum + m.bowCount, 0)}</_.StatNumber>
              <_.StatLabel>총 절 횟수</_.StatLabel>
            </_.StatItem>
          </_.StatsContainer>

          <_.MemorialListContainer>
            <_.ListTitle>상주 추모관 목록</_.ListTitle>
            <_.MemorialListBox>
              <_.MemorialList>
                {chiefMemorials.map((memorial, index) => (
                  <_.MemorialItem key={memorial.memorialId}>
                    <_.MemorialInfo>
                      <_.MemorialName>{memorial.characterName}</_.MemorialName>
                      <_.MemorialDetails>
                        <_.DetailText>최근 수정: {memorial.lastUpdated}</_.DetailText>
                        <_.DetailText>절 횟수: {memorial.bowCount}회</_.DetailText>
                      </_.MemorialDetails>
                    </_.MemorialInfo>

                    <_.ButtonContainer>
                      <MemorialBtn
                        name="방문"
                        onClick={() => handleVisitMemorial(memorial.memorialId, memorial.characterId)}
                        type="submit"
                        active={true}
                        width="80px"
                        height="32px"
                        fontSize="14px"
                      />
                    </_.ButtonContainer>
                  </_.MemorialItem>
                ))}
              </_.MemorialList>
            </_.MemorialListBox>
          </_.MemorialListContainer>
        </_.ContentContainer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default MemorialChief;