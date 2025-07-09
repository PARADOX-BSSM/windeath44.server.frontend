import styled from "@emotion/styled";

export const AppContainer = styled.div`
    width:100%;
    height:100%;
    margin-top: 3rem;
    margin-left: 2rem;
`

export const AppBtn = styled.div<{ url?: string }>`
    height:75%;
    aspect-ratio: 1/1;
    margin: 0 auto;
    background-image: url('${({ url }) => url}');
    background-position: center;
    background-repeat: no-repeat;
`

export const AppName = styled.p`
    margin: 0.5em auto;
    color: var(--primary-black);
    text-align: center;
    font-family: Galmuri11;
    font-size: 0.825rem;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`