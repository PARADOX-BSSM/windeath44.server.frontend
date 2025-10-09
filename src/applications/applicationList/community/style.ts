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
export const Judgement = styled.div`
    width: 132px;
    height: 100%;
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
export const Header = styled.div`
    display: flex;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;
export const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;
export const sortInput = styled.div`
    width: 90px;
    font-family: 'Galmuri11', sans-serif;
    font-size: 16px
`

export const InputArea = styled.div`
    display: flex;
    width: 100%;
    gap: 14px;
`

export const NavJudgement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`
export const JudgementImg = styled.image`
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