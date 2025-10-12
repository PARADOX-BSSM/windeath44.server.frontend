import styled from '@emotion/styled';

export const Post = styled.div`
    display: flex;
    padding: 12px 15px;
    justify-content: flex-start;
    gap: 14px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
`
export const Main = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
`
export const Line = styled.div`
    width: 2px;
    height: 100%;
    background: #ccc;
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
export const CommentMain = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`
export const InputArea = styled.div`
    display: flex;
    width: 100%;
    padding: 8px 10px;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 0;
    background: #FFEBFD;
`
export const Input = styled.input`
    background: none;
    border: none;
    outline: none;
    &::focus {
        border: none;
        outline: none;
    }

    &::placeholder {color: #DCAFDD;}
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const Icon = styled.img`
    width: 16px;
    height: 15px;
    aspect-ratio: 16/15;
`
export const SubmitBtn = styled.button``