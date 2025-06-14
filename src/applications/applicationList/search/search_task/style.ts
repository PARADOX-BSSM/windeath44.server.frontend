import styled from "@emotion/styled";

export const styles= styled.div`
    width: 100%;
    height: 100%;
    border-width: 0 1.5px 1.5px 0;
    border-style: solid;
    border-color: var(--primary-black);
    box-sizing: border-box;
    & > div{
        width: 100%;
        height: 100%;
        border-width: 1.5px 0 0 1.5px;
        border-style: solid;
        border-color: var(--light-primary-color);
        box-sizing: border-box;
        & > div{
            width: 100%;
            height: 100%;
            border-width: 0 1.5px 1.5px 0;
            border-style: solid;
            border-color: var(--dark-primary-color);
            box-sizing: border-box;
            & > div{
                width: 100%;
                height: 100%;
                border-width: 1.5px 0 0 1.5px;
                border-style: solid;
                border-color: #ffffff;
                background-color: var(--light-primary-color);
                box-sizing: border-box;
            }
        }
    }
`;
// *검색창
export const search= styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;
export const search_main= styled.div`
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
export const black= styled.div`
    border-width: 1.5px 0 0 1.5px;
    border-style: solid;
    border-color: #000000;
`;
export const white= styled.div`
    border-width: 0 1.5px 1.5px 0;
    border-style: solid;
    border-color: #ffffff;
`;
export const dark= styled.div`
    border-width: 1.5px;
    border-style: solid;
    border-color: var(--dark-primary-color);
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding-left: 4px;
`;
export const input= styled.input`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    font-family: "Galmuri11";
    font-size: 16px;
    border: none;
    outline: none;
`;
export const button= styled.button`
    width: 24px;
    height: 24px;
    margin: 1px;
    border: none;
    display: flex;
`;
export const option= styled.div`
    margin: auto 0;
`;
export const name= styled.div`
    display: flex;
    flex-direction: column;
`;