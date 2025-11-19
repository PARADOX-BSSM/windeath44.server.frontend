import styled from '@emotion/styled';

export const Post = styled.div`
  display: flex;
  padding: 12px 15px;
  justify-content: flex-start;
  gap: 14px;
  background-color: #fff;
  border-top: 1px solid #ccc;
`;
export const Main = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;
export const Line = styled.div`
  width: 2px;
  height: 100%;
  background: #ccc;
`;
export const ProfileImg = styled.div<{ imgUrl: string }>`
  width: 45px;
  height: 45px;
  background: #ffffff;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
`;
export const PostMain = styled.div`
  display: flex;
  padding: 0 7px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1;
`;
export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const PostInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;

  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const KebabContainer = styled.div`
  position: relative;
`;
export const KebabBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;
export const ContextMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: #ffffff;
  border: 1px solid #ccc;
  z-index: 1000;
  min-width: 80px;
`;
export const MenuItem = styled.button`
  width: 100%;
  padding: 8px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-family: Galmuri11;
  font-size: 12px;
  color: #2e2e2e;

  &:hover {
    background-color: #f5f5f5;
  }
`;
export const Name = styled.p`
  color: #9a5a95;
`;
export const UserId = styled.p`
  color: #dcafdd;
  font-size: 10px;
`;
export const Edited = styled.p`
  color: #ccc;
  font-size: 10px;
`;
export const PostContent = styled.p`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  color: #5f6368;
  font-family: Galmuri11;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Icon = styled.img`
  width: 12px;
  height: 12px;
`;
export const PostImg = styled.div<{ imgUrl: string }>`
  width: 110px;
  height: 110px;
  background: #fff;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
`;
export const CommentMain = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
export const InputArea = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 10px;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  background: #ffebfd;
`;
export const Input = styled.input`
  width: 100%;
  background: none;
  border: none;
  outline: none;

  &::focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: #dcafdd;
  }

  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const EditInputArea = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 10px;
  align-items: center;
  background: #ffebfd;
`;
export const EditInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  outline: none;

  &::focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: #dcafdd;
  }

  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const EditBtnGroup = styled.div`
  display: flex;
  gap: 16px;
`;
export const EditBtn = styled.button`
  background: none;
  border: none;
  color: #e774dd;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;
export const ReplyButton = styled.button`
  background: none;
  border: none;
  color: #5f6368;
  font-family: Galmuri11;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    color: #9a5a95;
  }
`;
