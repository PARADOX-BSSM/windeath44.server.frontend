import styled from '@emotion/styled'

export const Container = styled.div`
    display: flex;
    padding: 12px;
    justify-content: center;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;
    background: #FFF;
    box-shadow: -1px -1px 0px 0px #FFF inset, 1px 1px 0px 0px var(--Black, #2E2E2E) inset, -2px -2px 0px 0px var(--DarkPrimary, #DCAFDD) inset, 2px 2px 0px 0px var(--DarkPrimary, #DCAFDD) inset;
`

export const InnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
    background: #FFF;
    box-shadow: -1px -1px 0px 0px #FFF inset, 1px 1px 0px 0px var(--Black, #2E2E2E) inset, -2px -2px 0px 0px var(--DarkPrimary, #DCAFDD) inset, 2px 2px 0px 0px var(--DarkPrimary, #DCAFDD) inset;
`

export const ContentContainer = styled.div`
    display: flex;
    padding: 27px 23px;
    flex-direction: column;
    align-items: center;
    gap: 56px;
    flex: 1 0 0;
`

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    align-items: center;
    gap: 24px;
    align-self: stretch;
`

export const GoToBackBtn = styled.p`
    color: var(--Stroke, #E774DD);
    text-align: right;
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`


export const LeftHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    flex: 1 0 0;
`

export const Title = styled.h2`
    align-self: stretch;
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const SubTitle = styled.p`
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const HistoryContainer = styled.div`
    display: flex;
    padding: 10px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    align-self: stretch;
`

export const HistoryContainerTitle = styled.h3`
    height: 31px;
    align-self: stretch;
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`


export const HistoryContainerBox = styled.div`
    padding: 0px 12px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    width: 744px;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    background: #000000;
`

