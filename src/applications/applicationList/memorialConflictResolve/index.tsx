import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import Choten from '@/assets/profile/choten.svg';
import MemorialBtn from '@/applications/components/memorialBtn';
import { useResolveMemorialPullRequestMutation } from '@/api/memorial/mergeMemorialPullRequest';
import { useState, useRef, useEffect } from 'react';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  prId: number;
  conflict: string;
  memorialName: string;
}

const MemorialConflictResolve = ({
  stack,
  push,
  pop,
  top,
  prId,
  conflict,
  memorialName,
}: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  const [editedConflict, setEditedConflict] = useState<string>(conflict);

  // 충돌 해결 mutation
  const resolveMutation = useResolveMemorialPullRequestMutation();

  // 충돌 해결 처리 함수
  const handleResolveConflict = async () => {
    if (!editedConflict.trim()) {
      setAlert?.(Choten, <>해결된 내용을 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    try {
      // 충돌 해결 API 호출 - 편집된 충돌 해결 내용을 전달
      await resolveMutation.mutateAsync({
        memorialPullRequestId: prId,
        resolved: editedConflict,
      });

      // 성공 시 알림과 함께 이전 태스크로 돌아가기
      setAlert?.(
        Choten,
        <>
          충돌이 성공적으로 해결되었습니다!
          <br />
          이제 다시 병합을 시도할 수 있습니다.
        </>,
        () => {
          taskTransform?.('경고', '');
          pop(); // 이전 태스크로 돌아가기
        },
      );
    } catch (error: any) {
      setAlert?.(
        Choten,
        <>
          충돌 해결 중 오류가 발생했습니다.
          <br />
          {error?.response?.data?.message || '알 수 없는 오류'}
        </>,
        () => {
          taskTransform?.('경고', '');
        },
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
                <_.Title>충돌 해결</_.Title>
                <_.Subtitle>
                  {memorialName}의 수정 요청 #{prId} 충돌 해결
                </_.Subtitle>
              </_.LeftHeader>
              <_.BackButton onClick={() => pop()}>돌아가기</_.BackButton>
            </_.InnerHeader>
          </_.Header>

          <_.ConflictResolveContainer>
            <_.InfoSection>
              <_.InfoTitle>충돌 해결 안내</_.InfoTitle>
              <_.InfoText>
                <span style={{ color: '#FF6B6B', fontWeight: 'bold' }}>{'>>>>>>> original'}</span>{' '}
                부터{' '}
                <span style={{ color: '#FF6B6B', fontWeight: 'bold' }}>{'>>>>>>> changed'}</span>{' '}
                윗줄까지: 원본 내용
                <br />
                <span style={{ color: '#28A745', fontWeight: 'bold' }}>
                  {'>>>>>>> changed'}
                </span>{' '}
                부터 <span style={{ color: '#28A745', fontWeight: 'bold' }}>{'<<<<<<< end'}</span>{' '}
                줄까지: 변경된 내용
                <br />
                불필요한 마커를 제거하고 원하는 내용만 남겨주세요.
              </_.InfoText>
            </_.InfoSection>

            <_.ResolveInputContainer>
              <_.ResolveLabel>충돌 내용 (직접 수정하세요):</_.ResolveLabel>
              <_.ResolveTextarea
                value={editedConflict}
                onChange={(e) => setEditedConflict(e.target.value)}
                placeholder="Git 충돌 마커를 포함한 내용을 직접 수정하세요..."
                rows={15}
              />
            </_.ResolveInputContainer>

            <_.ButtonContainer>
              <MemorialBtn
                name="해결 완료"
                onClick={handleResolveConflict}
                type="submit"
                active={!!editedConflict.trim() && !resolveMutation.isPending}
                width="100px"
                height="40px"
                fontSize="16px"
              />
              <MemorialBtn
                name="취소"
                onClick={() => pop()}
                type="submit"
                active={!resolveMutation.isPending}
                width="80px"
                height="40px"
                fontSize="16px"
              />
            </_.ButtonContainer>

            {resolveMutation.isPending && <_.LoadingText>충돌 해결 중...</_.LoadingText>}
          </_.ConflictResolveContainer>
        </_.ContentContainer>
      </_.InnerContainer>
    </_.Container>
  );
};

export default MemorialConflictResolve;
