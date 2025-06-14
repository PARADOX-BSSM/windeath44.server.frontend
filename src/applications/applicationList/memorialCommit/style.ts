import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

export const Container = styled.div`
    display: flex;
    padding: 28px 24px 36px 24px;
    flex-direction: column;
    align-items: center;
    gap: 56px;
    flex: 1 0 0;
    background: #FFF;
    overflow:auto;
    box-sizing: border-box;
    height:100%;
    overflow-x: hidden;
`

export const Section1 = styled.section`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    box-sizing: border-box;
`

export const Section2 = styled.section`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    box-sizing: border-box;
`

export const SubmitBtn = styled.p`
    color: var(--Stroke, #E774DD);
    text-align: right;
    font-family: Galmuri11;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: none;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
`

export const Header = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 24px;
    align-self: stretch;
`

export const HeaderTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    flex: 1 0 0;
`

export const AuthorshipFrom = styled.p`
    color: var(--Stroke, #E774DD);
    text-align: right;
    font-family: Galmuri11;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const CharacterName = styled.h2`
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-self: stretch;
`

export const Status = styled.p`
    align-self: stretch;
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const CharacterProfileContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 10px 8px;
    justify-content: center;
    align-items: center;
    background: #FFF;
`

export const CharacterProfileInnerContainer = styled.div`
    display: flex;
    padding: 8px 16px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    background: var(--VeryLightPrimary, #FFEEFD);
`

export const CharacterProfileBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`

export const CharacterProfile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

export const CharacterProfileImg = styled.div`
    width: 194px;
    height: 237.229px;
    border: 18.418px solid #000;
    background: #FFF;
`

export const CharacterProfileName = styled.p`
    color: #2E2E2E;
    text-align: center;
    font-family: Galmuri11;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const CharacterInformation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: -1px;
    border: 1px solid var(--Stroke, #E774DD);
`

export const CharacterInformationInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: -1px;
    border: 1px solid var(--Stroke, #E774DD);
`

export const CharacterInformationRow = styled.div`
    display: flex;
    width: 328px;
    align-items: flex-start;
    gap: -1px;
`

export const CharacterInformationRowAttribute = styled.div`
    display: flex;
    width: 100px;
    padding: 4px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border: 1px solid var(--Stroke, #E774DD);
    background: var(--LightPrimary, #FFD3FB);
`

export const CharacterInformationRowAttributeText = styled.p`
    width: 100%;
    height: 20px;
    flex-shrink: 0;
    color: var(--off, #FD51A7);
    text-align: center;
    font-family: Galmuri11;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const CharacterInformationRowValue = styled.div`
    display: flex;
    padding: 4px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    align-self: stretch;
    border: 1px solid var(--Stroke, #E774DD);
`

export const CharacterInformationRowValueText = styled.p`
    width: 100%;
    height: 20px;
    color: #2E2E2E;
    text-align: center;
    font-family: Galmuri11;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const Section2Title = styled.h2`
    width: 772px;
    color: var(--Black, #2E2E2E);
    hiehgt:;
    font-family: Galmuri11;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const Section2CommitAreaContainer = styled.div`
    display: flex;
    width: 772px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    background: var(--VeryLightPrimary, #FFEEFD);
`

export const Section2CommitArea = styled(TextareaAutosize)`
    display: flex;
    padding: 0px 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    resize:none;
    background:none;
    border:none;
    width:100%;
    outline: none;
    min-height: 50px;
`