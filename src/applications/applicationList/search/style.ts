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
export const search_task = styled.div<{ isColumn: boolean }>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: ${({ isColumn }) => (isColumn ? "column" : "row")};
    gap: ${({ isColumn }) => (isColumn ? "0px" : "8px")};
`;

// *개체
export const object= styled.div`
        border-width: 1.5px 0 0 1.5px;
        border-style: solid;
        border-color: #808080;
        box-sizing: border-box;
        & > div{
            width: 100%;
            height: 100%;
            border-width: 0 1.5px 1.5px 0;
            border-style: solid;
            border-color: #ffffff;
            box-sizing: border-box;
            background-color: var(--dark-primary-color);
            display: flex;
            gap: 4px;
            padding-left: 4px;
            & > div{
                margin: auto 0;
            }
    }
`;
