import styled from '@emotion/styled';

export const Btn = styled.button`
    display: flex;
    width: 180px;
    height: 42px;
    padding: 9px 24px;
    justify-content: center;
    align-items: center;
    background: var(--light-primary-color);
    box-shadow: -1.5px -1.5px 0px 0px var(--primary-black) inset, 1.5px 1.5px 0px 0px #FFF inset, -3px -3px 0px 0px var(--dark-primary-color) inset, 3px 3px 0px 0px var(--secondary-color) inset;
    color: var(--primary-black);
    border:none;
    text-align: center;
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px; /* 75% */
`

export const SelectedBtn = styled.button`
    display: flex;
    width: 180px;
    height: 42px;
    padding: 9px 24px;
    justify-content: center;
    align-items: center;
    background: var(--LightPrimary, #FFD3FB);
    box-shadow: -1.5px -1.5px 0px 0px #FFF inset, 1.5px 1.5px 0px 0px var(--primary-black) inset, -3px -3px 0px 0px var(--secondary-color) inset, 3px 3px 0px 0px var(--dark-primary-color) inset;
    color: var(--primary-black);
    text-align: center;
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px; /* 75% */
    border:none;
`

export const SubmitDefault = styled.button`
    display: flex;
    width: 180px;
    height: 42px;
    padding: 9px 24px;
    justify-content: center;
    align-items: center;
    background: var(--LightPrimary, #FFD3FB);
    box-shadow: -1.5px -1.5px 0px 0px var(--primary-black) inset, 1.5px 1.5px 0px 0px #FFF inset, -3px -3px 0px 0px var(--dark-primary-color) inset, 3px 3px 0px 0px var(--secondary-color) inset;
    color: var(--dark-primary-color);
    text-align: center;
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px; /* 75% */
    border : none;
`

export const SubmitActive = styled.button`
    height: 42px;
    width: 180px;
    padding: 9px 24px;
    justify-content: center;
    align-items: center;
    background: var(--LightPrimary, #FFD3FB);
    box-shadow: -1.5px -1.5px 0px 0px var(--primary-black) inset, 1.5px 1.5px 0px 0px #FFF inset, -3px -3px 0px 0px var(--dark-primary-color) inset, 3px 3px 0px 0px var(--secondary-color) inset;
    color: var(--Black, #2E2E2E);
    text-align: center;
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px; /* 75% */
    border : none;
`