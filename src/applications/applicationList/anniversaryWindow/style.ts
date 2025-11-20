import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideIn = keyframes`
    0% {
        transform: translateX(100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`;

export const Main = styled.div`
    padding: 5px 14px;
`;

export const Main_Text = styled.div`
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    line-height: normal;
    display: inline-block;

    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        color: #9A5A95;
    }
`;

export const CharacterName = styled.span`
    display: inline-block;
    animation: ${slideIn} 0.5s ease-in-out;
`;

