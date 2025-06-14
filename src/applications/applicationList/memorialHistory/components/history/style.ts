import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    padding: 12px 15px;
    align-items: center;
    gap: 9px;
    align-self: stretch;
    background: #FFF;
`

export const Profile = styled.div<{imgUrl : string}>`
    width: 45px;
    height: 45px;
    background-image: url(${props => props.imgUrl});
    background-color:gray;
`

export const TextContainer = styled.div`
    display: flex;
    padding: 0px 7px;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
`

export const ProfileTextContainer = styled.div`
    display: flex;
    padding: 5px 0px;
    align-items: flex-end;
    gap: 8px;
`

export const ProfileId = styled.p`
    color: #9A5A95;
    font-family: Galmuri11;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const EditedAt = styled.p`
    color: var(--DarkPrimary, #DCAFDD);
    font-family: Galmuri11;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const EditDescription = styled.p`
    color: var(--Black, #2E2E2E);
    font-family: Galmuri11;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const ViewBtn = styled.p`
    color: var(--Stroke, #E774DD);
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
    flex: 1 0 0;
`