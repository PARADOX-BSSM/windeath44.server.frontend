import styled from "@emotion/styled";
import '@/assets/font.css';

export const Black = styled.button`
    height: fit-content;
    border-width: 1.5px 3px 3px 1.5px; 
    border-style: solid;
    border-color: #000000;   
    cursor: none;
    & > div{
        border-width: 1.5px 0 0  1.5px;
        border-style: solid;
        border-color: #FFFFFF;
        & > div{
            border-width: 0 1.5px 1.5px 0;
            border-style: solid;
            border-color: var(--dark-primary-color);
            & > div{
                border-width: 1.5px 0 0  1.5px;
                border-style: solid;
                border-color: var(--secondary-color);
                background-color: var(--light-primary-color);
                font-family: "Galmuri11";
                font-size: 0.5rem;
                white-space: nowrap;
                padding: 0.25rem 1.25rem;
            }
        }
    }
`;