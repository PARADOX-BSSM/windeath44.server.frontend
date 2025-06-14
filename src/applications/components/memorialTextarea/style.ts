import styled from '@emotion/styled'
import TextareaAutosize from 'react-textarea-autosize';


export const Container = styled.section`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    box-sizing: border-box;
`

export const Title = styled.h2`
    width: 772px;
    color: var(--Black, #2E2E2E);
    hiehgt:;
    font-family: Galmuri11;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const CommitAreaContainer = styled.div`
    display: flex;
    width: 772px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    background: var(--VeryLightPrimary, #FFEEFD);
`

export const CommitArea = styled(TextareaAutosize)`
    display: flex;
    padding: 0px 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    resize:none;
    background:none;
    color: #000;
    font-family: Galmuri11;
    font-size: 18.582px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border:none;
    width:100%;
    outline: none;
    min-height: 50px;
`