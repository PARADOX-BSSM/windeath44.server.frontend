import * as _ from './style';

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
              onLikeToggle?.(memorialApplicationId, isLiked);
            }}
          >
            {isLiked ? '♥' : '♡'} {likes}
          </_.LikeButton>
        </_.ProfileTextContainer>
      </_.TextContainer>
      <_.ViewBtn onClick={onClick}>신청 내용 보기</_.ViewBtn>
    </_.Container>
  );
};

export default Application;
