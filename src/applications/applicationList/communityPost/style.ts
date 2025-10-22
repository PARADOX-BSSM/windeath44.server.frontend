import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    padding: 20px;
    align-items: flex-start;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
    background: var(--LightPrimary, #ffd3fb);
    height: 100%;
    box-sizing: border-box;
`;
export const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
`;
export const Header = styled.div`
    display: flex;
    height: 28px;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    gap: 20px;

    color: #000;
    text-align: center;
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;
export const BtnIcon = styled.button`
    background: none;
    outline: none;
    border: none;
`
export const Icon = styled.img`
    width: 24px;
    height: 24px;
`
export const PostArea = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    background-color: #FFEEFD;
    overflow-y: scroll;
`

export const Judgement = styled.div`
    width: 132px;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 18px;
    background: #ffd3fb;
    border: none;
    font-family: 'Galmuri11', sans-serif;
    font-size: 20px;
    color: var(--primary-black);
    cursor: none;
    box-shadow:
        -1px -1px 0px 0px inset #2e2e2e,
        1px 1px 0px 0px inset #ffffff,
        -2px -2px 0px 0px inset #dcafdd,
        2px 2px 0px 0px inset #ffbbf5;
    
`;
export const NavJudgement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`
export const JudgementImg = styled.img`
    width: 100%;
    height: 90px;
    background-color: #fff;
`
export const JudgementText = styled.p`
    color: #2e2e2e;
    text-align: center;
    font-family: Galmuri11;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const JudgementLankArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px
`
export const JudgementLankList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    padding: 6px 4px;
    align-items: flex-start;
    align-self: stretch;
    box-sizing: border-box;
    background-color: #fff;
`
export const JudgementLank = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px
`
export const JudgementName = styled.p`
    color: #000;
    font-family: Galmuri11;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const JudgementLankNum = styled.p`
    color: #FF8EF6;
    font-family: Galmuri11;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`