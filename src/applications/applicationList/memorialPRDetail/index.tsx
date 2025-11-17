import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import MemorialBtn from '@/applications/components/memorialBtn';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
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
  characterId?: number;
}

const MemorialPRDetail = ({
  stack,
  push,
  pop,
  top,
  prId,
  commitData,
  memorialName,
  characterId,
}: dataStructureProps) => {
  const taskSearch = useAtomValue(taskSearchAtom);

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  const handlePreview = () => {
    if (characterId) {
      push(
        taskSearch?.('memorialPRPreview', {
          ...stackProps,
          characterId: characterId,
          content: commitData.content,
          userId: commitData.userId,
          prId: prId,
        }),
      );
    }
  };

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
              <_.BackButton
                onClick={() => pop()}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                돌아가기
              </_.BackButton>
            </_.InnerHeader>
          </_.Header>

          <_.PRDetailContainer>
            <_.InfoSection>
              <_.InfoTitle>저장 정보</_.InfoTitle>
              <_.InfoGrid>
                <_.InfoItem>
                  <_.InfoLabel>저장 ID:</_.InfoLabel>
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
              <_.ButtonContainer>
                <MemorialBtn
                  name="미리보기"
                  onClick={handlePreview}
                  type="submit"
                  active={!!characterId}
                  width="120px"
                  height="40px"
                  fontSize="16px"
                />
              </_.ButtonContainer>
              <_.ContentBox>{commitData.content}</_.ContentBox>
            </_.ContentSection>
          </_.PRDetailContainer>
        </_.ContentContainer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default MemorialPRDetail;
