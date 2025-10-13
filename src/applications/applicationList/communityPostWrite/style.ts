import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #FFD3FB;
`
export const Title = styled.input`
    background: none;
    border: none;
    outline: none;
    &::focus {
        border: none;
        outline: none;
    }

    &::placeholder {color: #2E2E2E;}
    color: #2E2E2E;
    text-align: left;
    font-family: Galmuri11;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const Content = styled.textarea`
    width: 100%;
    height: 100%;
    resize: none;
    overflow-y: scroll;

    background: #fff;
    padding: 12px 15px;
    box-sizing: border-box;
    border: none;
    outline: none;
    &::focus {
        border: none;
        outline: none;
    }

    &::placeholder {color: #5F6368;}
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const BtnArea = styled.div`
    width: 100%;
    height: 52px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

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
`

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
export const BeforeBtn = styled.button`
    border: none;
    background: none;
    outline: none;
`
export const Icon = styled.img`
    width: 24px;
    height: 24px;
`
export const PostArea = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FFEEFD;
    overflow-y: scroll;
`
export const Post = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    flex: 1 0 0;
    background-color: #fff;
    border-bottom: 1px solid #CCC;
`
export const PostText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`
export const PostTitle = styled.h3`
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const PostContent = styled.p`
    color: #2E2E2E;
    font-family: Galmuri11;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const PostBtnArea = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`
export const PostBtn = styled.button`
    background: none;
    border: none;
    color: #E774DD;
    font-family: Galmuri11;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`