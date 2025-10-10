import styled from '@emotion/styled';

export const Post = styled.div`
    display: flex;
    padding: 12px 15px;
    justify-content: space-between;
    gap: 9px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
`
export const Main = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
`
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
`
export const PostInfo = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 8px;

    font-family: Galmuri11;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const Name = styled.p`
    color: #9A5A95;
`
export const UserId = styled.p`
    color: #DCAFDD;
    font-size: 10px;
`
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;

    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const PostTitle = styled.h3`
    font-weight: 400;
`
export const PostContent = styled.p`
    font-size: 14px;
`
export const Datetime = styled.p`
    color: #999;
    font-family: Galmuri11;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const Icons = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;

    color: #5F6368;
    font-family: Galmuri11;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const Icon = styled.img`
    width: 10px;
    height: 10px;
`
export const PostImg = styled.div<{imgUrl: string}>`
    width: 110px;
    height: 110px;
    background: #fff;
    background-image: url(${(props) => props.imgUrl});
    background-size: cover;
`