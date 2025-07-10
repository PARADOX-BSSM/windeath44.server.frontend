import { getPixelFromPercent } from '@/lib/getPixelFromPercent';
import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background: var(--light-primary-color);
    padding: ${getPixelFromPercent("width", 5)}px ${getPixelFromPercent("height", 2.5)}px;
    box-sizing : border-box;
`

export const InnerContainer = styled.div`
    display: flex;
    padding: ${getPixelFromPercent("height", 2.5)}px 0;
    flex-direction: column;
    justify-content: center;
    gap: ${getPixelFromPercent("width", 1.3)}px;
    align-self: stretch;
`

export const TextContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${getPixelFromPercent("width", 1.3)}px;
`

export const Title = styled.h2`
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: Galmuri11;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const Version = styled.p`
    display: flex;
    width: ${getPixelFromPercent("width", 24)}px
    flex-direction: column;
    justify-content: flex-end;
    align-self: stretch;
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: Galmuri11;
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const MainContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${getPixelFromPercent("width", 5)}p;
    flex: 1 0 0;
    align-self: stretch;
`

export const DescriptionBox = styled.div`
    display: flex;
    padding: ${getPixelFromPercent("width", 2)}px;
    flex-direction: column;
    align-items: flex-start;
    gap: ${getPixelFromPercent("width", 2)}px;
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
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const BtnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`

export const BtnInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${getPixelFromPercent("width", 1.2)}px;
`

export const BtnVoid = styled.div`
    height: ${getPixelFromPercent("height", 0.5)}px;
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
    gap: ${getPixelFromPercent("width", 2)}px;
    align-self: stretch;
`