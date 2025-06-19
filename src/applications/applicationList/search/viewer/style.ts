import styled from "@emotion/styled";
// *검색결과창
export const view= styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap:2px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;
export const styles_in= styled.div`
    width: 100%;
    height: 100%;
    border-width: 1.5px 0 0 1.5px;
    border-style: solid;
    border-color: var(--primary-black);
    box-sizing: border-box;
    & > div{
        width: 100%;
        height: 100%;
        border-width: 0 1.5px 1.5px 0;
        border-style: solid;
        border-color: #ffffff;
        box-sizing: border-box;
        & > div{
            width: 100%;
            height: 100%;
            border-width: 1.5px;
            border-style: solid;
            border-color: var(--dark-primary-color);
            background-color: var(--light-primary-color);
            box-sizing: border-box;
        }
    }
`;
export const viewer= styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;


