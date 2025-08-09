import styled from '@emotion/styled';


export const CommentDiv = styled.div`
    display: flex;
    padding: 12px 16px;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    background: #FFF;
`

export const ProfileImg = styled.div<{ imgUrl : string }>`
    width: 48px;
    height: 48px;
    background-image: url(${props => props.imgUrl});
    background-size: cover;
    background-position: center;
`

export const TextBox = styled.div`
    display: flex;
    padding: 0 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`
export const NickNameContainer = styled.div`
    display: flex;
    padding: 6px 0px;
    align-items: flex-end;
    gap: 8px;
`

export const Content = styled.p`
    color: var(--Black, #2E2E2E);
    font-family: Galmuri11;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const NickName = styled.p`
    color: #9A5A95;
    font-family: Galmuri11;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const UserId = styled.p`
    color: var(--DarkPrimary, #DCAFDD);
    font-family: Galmuri11;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`