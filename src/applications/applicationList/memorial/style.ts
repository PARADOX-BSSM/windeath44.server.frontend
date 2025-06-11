import styled from '@emotion/styled';


export const Container = styled.div`
    display: flex;
    width:100%;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
    box-sizing:border-box;
    height:100%;
    overflow: hidden;
`

export const InnerContainer = styled.div`
    display: flex;
    width:100%;
    height:100%;
    max-height: 100%;
    overflow-y: auto;
    padding: 27px 23px;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    flex: 1 0 0;
    background: #FFF;
    box-sizing:border-box;
`


export const Section1 = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`

export const Header = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 24px;
    align-self: stretch;
`

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    flex: 1 0 0;
`

export const Title = styled.h1`
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-self: stretch;
`

export const Subtitle = styled.p`
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const History = styled.p`
    color: var(--Stroke, #E774DD);
    text-align: right;
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const DocumentUpdate = styled.p`
    color: var(--Stroke, #E774DD);
    text-align: right;
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
`

export const ContentContainer = styled.div`
    display: flex;
    width: 774px;
    padding: 10px 8px;
    justify-content: center;
    align-items: center;
`

export const IndexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    flex: 1 0 0;
    align-self: stretch;
`

export const Quote = styled.h2`
    height: 31px;
    align-self: stretch;
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 31px;
    align-self: stretch;
`

export const Index = styled.div`
    display: flex;
    height: 322px;
    padding: 12px 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border: 1px solid var(--Stroke, #E774DD);
`


export const IndexTitle = styled.p`
        color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const ProfileContainer = styled.div`
    display: flex;
    padding: 4px 16px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`

export const ProfileInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`

export const PictureContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

export const Picture = styled.div`
    display: flex;
    height: 237.229px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 18.418px solid #000;
    background: #FFF;
    width: 168px;
    flex-shrink: 0;
`

export const Name = styled.p`
    color: #2E2E2E;
    text-align: center;
    font-family: Galmuri11;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const Information = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: -1px;
    border: 1px solid var(--Stroke, #E774DD);
`

export const Row = styled.div`
    display: flex;
    width: 328px;
    align-items: flex-start;
    gap: -1px;
`

export const Attribute = styled.div`
    display: flex;
    width: 100px;
    padding: 4px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border: 1px solid var(--Stroke, #E774DD);
    background: var(--LightPrimary, #FFD3FB);
    color: var(--off, #FD51A7);
    text-align: center;
    font-family: Galmuri11;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const Value = styled.div`
    display: flex;
    padding: 4px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    align-self: stretch;
    border: 1px solid var(--Stroke, #E774DD);
    color: #2E2E2E;
    text-align: center;
    font-family: Galmuri11;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`