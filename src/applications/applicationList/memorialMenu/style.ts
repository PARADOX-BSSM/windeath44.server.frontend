import { getPixelFromPercent } from '@/lib/getPixelFromPercent';

import styled from '@emotion/styled';

const shadow = `
  -${getPixelFromPercent("width", 0.125)}px -${getPixelFromPercent("width", 0.125)}px 0px 0px #FFF inset,
  ${getPixelFromPercent("width", 0.125)}px ${getPixelFromPercent("width", 0.125)}px 0px 0px var(--primary-black) inset,
  -${getPixelFromPercent("width", 0.25)}px -${getPixelFromPercent("width", 0.25)}px 0px 0px var(--dark-primary-color) inset,
  ${getPixelFromPercent("width", 0.25)}px ${getPixelFromPercent("width", 0.25)}px 0px 0px var(--dark-primary-color) inset
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: var(--light-primary-color);
    justify-content: flex-start;
    padding: 0px ${getPixelFromPercent("width", 2.5)}px;
    box-sizing : border-box;
`

export const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 0;
    display: flex;
    padding: ${getPixelFromPercent("height", 2.5)}px 0;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${getPixelFromPercent("width", 1.3)}px;
    align-self: stretch;
`

export const TextContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${getPixelFromPercent("width", 1.1)}px;
`

export const Title = styled.h2`
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: Galmuri11;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const Version = styled.p`
    display: flex;
    width: ${getPixelFromPercent("width", 24)}px;
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
    width: 100%;
    display: flex;
    align-items: center;
    flex: 1 0 0;
    min-height: 0;
    align-self: stretch;
`

export const DescriptionBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    padding: ${getPixelFromPercent("width", 1.8)}px;
    flex-direction: column;
    align-items: flex-start;
    gap: ${getPixelFromPercent("width", 2)}px;
    flex: 1 1 0;
    align-self: stretch;
    background: #FFF;
    box-shadow: ${shadow};
`

export const Description = styled.p`
    flex: 1 1 0;
    align-self: stretch;
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const BtnWrapper = styled.div`
    padding: 0 0 0 ${getPixelFromPercent("width", 1.6)}px;
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
    box-shadow: ${shadow};
`



export const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: ${getPixelFromPercent("width", 2)}px;
    align-self: stretch;
`