import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  padding: 12px 15px;
  align-items: center;
  gap: 9px;
  align-self: stretch;
  background: #fff;
`;

export const Profile = styled.div<{ imgUrl: string }>`
  width: 45px;
  height: 45px;
  background-image: url(${(props) => props.imgUrl});
  background-color: #fff;
  background-size: cover;
  background-position: center;
`;

export const TextContainer = styled.div`
  display: flex;
  padding: 0px 7px;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  flex: 1;
`;

export const ProfileTextContainer = styled.div`
  display: flex;
  padding: 5px 0px;
  align-items: flex-end;
  gap: 8px;
`;

export const ProfileId = styled.p`
  color: #9a5a95;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CreatedAt = styled.p`
  color: var(--DarkPrimary, #dcafdd);
  font-family: Galmuri11;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StateText = styled.p<{ state: string }>`
  color: ${(props) => {
    switch (props.state) {
      case 'APPROVED':
        return '#4CAF50';
      case 'REJECTED':
        return '#F44336';
      case 'PENDING':
        return '#FF9800';
      default:
        return '#2e2e2e';
    }
  }};
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const LikesText = styled.p`
  color: var(--Stroke, #e774dd);
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const LikeButton = styled.button<{ $isLiked: boolean }>`
  color: ${(props) => (props.$isLiked ? 'var(--off, #fd51a7)' : 'var(--Stroke, #e774dd)')};
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: none;
  border: none;
  cursor: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    opacity: 0.7;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ViewBtn = styled.p`
  color: var(--Stroke, #e774dd);
  text-align: right;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  cursor: none;

  &:hover {
    opacity: 0.7;
  }
`;

export const ApproveBtn = styled.button`
  color: var(--Stroke, #e774dd);
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: none;

  &:hover:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const RejectBtn = styled.button`
  color: #999;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: none;

  &:hover:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CancelBtn = styled.button`
  color: #f44336;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: none;

  &:hover:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
