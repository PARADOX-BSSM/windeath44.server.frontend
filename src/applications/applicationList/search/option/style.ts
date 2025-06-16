import styled from "@emotion/styled";

export const option_set= styled.div`
    position: absolute;
    margin-top: 4px;
    width: 100%;
    box-sizing: border-box;
    z-index: 1000000;
`;
export const black= styled.div`
    width: 100%;
    border-width: 1.5px 0 0 1.5px;
    border-style: solid;
    border-color: var(--primary-black);
    box-sizing: border-box;
`;
export const white= styled.div`
    width: 100%;
    border-width: 0 1.5px 1.5px 0;
    border-style: solid;
    border-color: #ffffff;
    box-sizing: border-box;
`;
export const dark= styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 4px;
    border-width: 1.5px;
    border-style: solid;
    border-color: var(--dark-primary-color);
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;
export const options= styled.div`
    &:hover {
        background-color: #efefef;
    }
`;