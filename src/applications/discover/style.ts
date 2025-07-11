import { getPixelFromPercent } from "@/lib/getPixelFromPercent";
import styled from "@emotion/styled";

export const AppContainer = styled.div`
    width:100%;
    height:100%;
    margin-top: ${getPixelFromPercent('height', 2)}px;
    margin-left: ${getPixelFromPercent('height', 2)}px;
`

export const AppBtn = styled.div<{ url?: string }>`
    height: ${getPixelFromPercent('height', 8)}px;
    aspect-ratio: 1/1;
    margin: 0 auto;
    background-image: url('${({ url }) => url}');
    background-position: center;
    background-repeat: no-repeat;
`

export const AppName = styled.p`
    margin: ${getPixelFromPercent('height', 1)}px auto;
    color: var(--primary-black);
    text-align: center;
    font-family: Galmuri11;
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`