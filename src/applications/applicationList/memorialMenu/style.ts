import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background: var(--light-primary-color);
    padding: 26px 32px;
    box-sizing : border-box;
`

export const InnerContainer = styled.div`
    display: flex;
    padding: 8px 0px;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
    align-self: stretch;
`

export const TextContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const Title = styled.h2`
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: Galmuri11;
    font-size: 38px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const Version = styled.p`
    display: flex;
    width: 115px;
    flex-direction: column;
    justify-content: flex-end;
    align-self: stretch;
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const MainContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    flex: 1 0 0;
    align-self: stretch;
`

export const DescriptionBox = styled.div`
    display: flex;
    padding: 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    flex: 1 0 0;
    align-self: stretch;
    background: #FFF;
    box-shadow: -1px -1px 0px 0px #FFF inset, 1px 1px 0px 0px var(--primary-black) inset, -2px -2px 0px 0px var(--dark-primary-color) inset, 2px 2px 0px 0px var(--dark-primary-color) inset;
`

export const Description = styled.p`
    flex: 1 0 0;
    align-self: stretch;
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const BtnWrapper = styled.div`
    display: flex;
    width: 180px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`

export const BtnInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`

export const BtnVoid = styled.div`
    height: 3px;
    flex-direction: column;
    align-self: stretch;
    background: #FFF;
    box-shadow: -1px -1px 0px 0px #FFF inset, 1px 1px 0px 0px var(--Black, #2E2E2E) inset, -2px -2px 0px 0px var(--DarkPrimary, #DCAFDD) inset, 2px 2px 0px 0px var(--DarkPrimary, #DCAFDD) inset;
`



export const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;
    align-self: stretch;
`