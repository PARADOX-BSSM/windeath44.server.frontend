import styled from "@emotion/styled";
import '@/assets/font.css';
import { getPixelFromPercent } from "@/lib/getPixelFromPercent";

export const inputsDiv = styled.div<{fontSize?: string;}>`
    font-family: "Galmuri11";
    font-size: ${({ fontSize }) => fontSize || "1rem"};
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;
export const inputs = styled.input<{width: string;}>`
    margin: 0.078rem 0 0 0.078rem;
    width: 100%;
    height: 100%;
    font-family: "Galmuri11";
    padding: 0 0 0 0;
    outline: none;
    border-color: #DCAFDD;
    border-style: solid;
    border-width: ${getPixelFromPercent("width", 0.125)}px;
    box-sizing: border-box;
`;
export const Shadow = styled.div<{width: string;}>`
    width: ${({ width }) => width || "30.688rem"};
    height: 1.75rem;
    background-color: #000;
    border-width: 0 0.078rem 0.078rem 0;
    border-style: solid;
    border-color: #fff;
    padding: 0.016rem 0.078rem 0.078rem 0.016rem;
`;