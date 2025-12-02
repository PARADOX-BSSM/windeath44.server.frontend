import * as _ from './style';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { alerterAtom } from '@/atoms/alerter.ts';
import { getCookie } from '@/api/auth/cookie.ts';

interface PropsType {
  userId: string;
  createdAt: string;
  state: string;
  likes: number;
  profileUrl: string;
  onClick?: () => void;
  memorialApplicationId: number;
  isLiked: boolean;
  onLikeToggle?: (memorialApplicationId: number, isLiked: boolean) => void;
  isAdmin?: boolean;
  onApprove?: (memorialApplicationId: number) => void;
  onReject?: (memorialApplicationId: number) => void;
  isApproving?: boolean;
  isRejecting?: boolean;
  rejectedReason?: string;
  onViewRejectedReason?: (rejectedReason: string) => void;
  currentUserId?: string;
  onDelete?: (memorialApplicationId: number) => void;
  isDeleting?: boolean;
  onEdit?: (memorialApplicationId: number) => void;
}

const Application = ({
  userId,
  createdAt,
  state,
  likes,
  profileUrl,
  onClick,
  memorialApplicationId,
  isLiked,
  onLikeToggle,
  isAdmin,
  onApprove,
  onReject,
  isApproving = false,
  isRejecting = false,
  rejectedReason,
  onViewRejectedReason,
  currentUserId,
  onDelete,
  isDeleting = false,
  onEdit,
}: PropsType) => {
  const getStateText = (state: string) => {
    switch (state) {
      case 'APPROVED':
        return '승인됨';
      case 'REJECTED':
        return '거절됨';
      case 'PENDING':
        return '대기 중';
      default:
        return state;
    }
  };
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);
  const token = getCookie('access_token');

  return (
    <_.Container>
      <_.Profile imgUrl={profileUrl} />
      <_.TextContainer>
        <_.ProfileTextContainer>
          <_.ProfileId>@{userId}</_.ProfileId>
          <_.CreatedAt>{createdAt}</_.CreatedAt>
        </_.ProfileTextContainer>
        <_.ProfileTextContainer>
          <_.StateText state={state}>{getStateText(state)}</_.StateText>
          <_.LikeButton
            $isLiked={isLiked}
            onClick={(e) => {
              e.stopPropagation();
              if (!token && setAlert) {
                setAlert(<> 좋아요 기능은 로그인 후 이용하실 수 있습니다.</>, () => {
                  taskTransform?.('경고', '');
                });
              } else {
                onLikeToggle?.(memorialApplicationId, isLiked);
              }
            }}
          >
            {isLiked ? '♥' : '♡'} {likes}
          </_.LikeButton>
        </_.ProfileTextContainer>
      </_.TextContainer>
      <_.ButtonContainer>
        {isAdmin && state === 'PENDING' && (
          <>
            <_.ApproveBtn
              onClick={(e) => {
                e.stopPropagation();
                onApprove?.(memorialApplicationId);
              }}
              disabled={isApproving || isRejecting}
            >
              {isApproving ? '처리 중...' : '승인'}
            </_.ApproveBtn>
            <_.RejectBtn
              onClick={(e) => {
                e.stopPropagation();
                onReject?.(memorialApplicationId);
              }}
              disabled={isApproving || isRejecting}
            >
              {isRejecting ? '처리 중...' : '거절'}
            </_.RejectBtn>
          </>
        )}
        {state === 'REJECTED' && rejectedReason && (
          <_.ViewRejectedReasonBtn
            onClick={(e) => {
              e.stopPropagation();
              onViewRejectedReason?.(rejectedReason);
            }}
          >
            거절 사유 보기
          </_.ViewRejectedReasonBtn>
        )}
        {currentUserId === userId && (
          <>
            {state === 'PENDING' && (
              <_.EditBtn
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(memorialApplicationId);
                }}
              >
                수정
              </_.EditBtn>
            )}
            <_.DeleteBtn
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(memorialApplicationId);
              }}
              disabled={isDeleting}
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </_.DeleteBtn>
          </>
        )}
        <_.ViewBtn onClick={onClick}>신청 내용 보기</_.ViewBtn>
      </_.ButtonContainer>
    </_.Container>
  );
};

export default Application;
