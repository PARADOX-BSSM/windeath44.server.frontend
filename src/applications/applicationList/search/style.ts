import styled from "@emotion/styled";

export const main = styled.div`
    box-sizing: border-box;
    background-color: var(--light-primary-color);
    font-family: "Galmuri11";
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 12px 24px;
`;
export const main_serve= styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap:4px;
`;
export const search_task= styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
`;
export const styles= styled.div`
    border-width: 0 1.5px 1.5px 0;
    border-style: solid;
    border-color: var(--primary-black);
    & > div{
        border-width: 1.5px 0 0 1.5px;
        border-style: solid;
        border-color: var(--light-primary-color);
        & > div{
            border-width: 0 1.5px 1.5px 0;
            border-style: solid;
            border-color: var(--dark-primary-color);
            & > div{
                border-width: 1.5px 0 0 1.5px;
                border-style: solid;
                border-color: #ffffff;
                background-color: var(--light-primary-color);
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
    img{
        object-fit: cover;
    }
`;
export const option= styled.div`
    margin: auto 0;
`;
export const name= styled.div`
    display: flex;
    flex-direction: column;
`;
// *검색결과창
export const view= styled.div`
    width: 100%;
    height: 100%;
    padding: 8px 0;
`;
// *개체
export const object= styled.div`
    display: flex;
    gap: 4px;
    padding: 8px;
    div{
        padding-top: 4px;
    }
`;
