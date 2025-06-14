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
