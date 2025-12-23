import styled from '@emotion/styled';

export const Post = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  flex: 1 0 0;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
`;
export const PostText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const PostTitle = styled.h3`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const PostContent = styled.p`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const PostBtnArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
export const PostBtn = styled.button`
  background: none;
  border: none;
  color: #e774dd;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
