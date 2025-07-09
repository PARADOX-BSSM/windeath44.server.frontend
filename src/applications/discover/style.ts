import styled from "@emotion/styled";

export const AppContainer = styled.div`
    width:100%;
    height:90px;
`

export const AppBtn = styled.div<{ url?: string }>`
    width: 80%;
    height: 80%;
    background-image: url('${({ url }) => url}');
    background-size: cover;
    background-position: center;
`

export const AppName = styled.span`
    color: var(--primary-black);
    text-align: center;
    font-family: Galmuri11;
    font-size: 0.825rem;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`