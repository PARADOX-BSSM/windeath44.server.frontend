import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import Choten from '@/assets/profile/choten.svg';
import MemorialBtn from '@/applications/components/memorialBtn';
interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  prId: number;
  commitData: {
    memorialCommitId: number;
    userId: string;
    memorialId: number;
    content: string;
    createdAt: string;
  };
  memorialName: string;
}

const MemorialPRDetail = ({
  stack,
  push,
  pop,
  top,
  prId,
  commitData,
  memorialName,
}: dataStructureProps) => {
  return (
    <_.Container>
      <_.InnerContainer>
        <_.ContentContainer>
          <_.Header>
            <_.InnerHeader>
              <_.LeftHeader>
                <_.Title>수정 요청 #{prId} 상세보기</_.Title>
                <_.Subtitle>{memorialName}의 수정 요청 내용</_.Subtitle>
              </_.LeftHeader>
              <_.BackButton onClick={() => pop()}>돌아가기</_.BackButton>
            </_.InnerHeader>
          </_.Header>

          <_.PRDetailContainer>
            <_.InfoSection>
              <_.InfoTitle>커밋 정보</_.InfoTitle>
              <_.InfoGrid>
                <_.InfoItem>
                  <_.InfoLabel>커밋 ID:</_.InfoLabel>
                  <_.InfoValue>{commitData.memorialCommitId}</_.InfoValue>
                </_.InfoItem>
                <_.InfoItem>
                  <_.InfoLabel>작성자:</_.InfoLabel>
                  <_.InfoValue>{commitData.userId}</_.InfoValue>
                </_.InfoItem>
                <_.InfoItem>
                  <_.InfoLabel>작성일:</_.InfoLabel>
                  <_.InfoValue>{commitData.createdAt}</_.InfoValue>
                </_.InfoItem>
                <_.InfoItem>
                  <_.InfoLabel>추모관 ID:</_.InfoLabel>
                  <_.InfoValue>{commitData.memorialId}</_.InfoValue>
                </_.InfoItem>
              </_.InfoGrid>
            </_.InfoSection>

            <_.ContentSection>
              <_.ContentTitle>전체 내용</_.ContentTitle>
              <_.ContentBox>{commitData.content}</_.ContentBox>
            </_.ContentSection>

            <_.ButtonContainer>
              <MemorialBtn
                name="돌아가기"
                onClick={() => pop()}
                type="button"
                active={true}
                width="80px"
                height="36px"
                fontSize="14px"
              />
            </_.ButtonContainer>
          </_.PRDetailContainer>
        </_.ContentContainer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default MemorialPRDetail;
