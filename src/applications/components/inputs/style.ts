import styled from "@emotion/styled";
import '@/assets/font.css';
import * as string_decoder from "node:string_decoder";

export const inputsDiv = styled.div`
    font-family: "Galmuri11";
    font-size: 20px;
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
`;
export const inputs = styled.input`
    width: 100%;
    height: auto;
    display: block;
    box-sizing: border-box;
    font-family: "Galmuri11";
    font-size: 16px;
    padding: 2px 4px;
    outline: none;
    border: none;
`;
interface Props {
    p?: string;
}
export const Shadow = styled.div<Props>`
    width: ${props => props.p?props.p:'70%'};
    height: fit-content;
    display: inline-block;
    border-width: 0 1.5px 1.5px 0;
    border-style: solid;
    border-color: #fff;
    &>div{
        width: 100%;
        display: inline-block;
        box-sizing: border-box;
        border-width: 1.5px 0 0 1.5px;
        border-style: solid;
        border-color: #000;
        &>div{
            width: 100%;
            box-sizing: border-box;
            border: 1px solid var(--dark-primary-color);
        }
    }
`;