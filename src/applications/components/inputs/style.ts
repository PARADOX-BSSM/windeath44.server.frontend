import styled from "@emotion/styled";
import '@/assets/font.css';

export const inputsDiv = styled.div<{fontSize?: string; flex?:boolean;}>`
    font-family: "Galmuri11";
    font-size: ${({ fontSize }) => fontSize || "1rem"};
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: ${({flex})=>flex?"space-between":"flex-start"};
    flex-direction: ${({flex})=>flex?"row":"column"};
`;
export const inputs = styled.input<{width: string;}>`
    margin: 1.5px 0 0 1.5px;
    width: 100%;
    height: 100%;
    font-family: "Galmuri11";
    padding: 0 0px 0 0;
    outline: none;
    border-color: #DCAFDD;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
`;
export const Shadow = styled.div<{width: string;}>`
    width: ${({ width }) => width || "491px"};
    height: 28px;
    background-color: #000;
    border-width: 0 1.5px 1.5px 0;
    border-style: solid;
    border-color: #fff;
    padding: 0.5px 1.5px 1.5px 0.5px;
`;