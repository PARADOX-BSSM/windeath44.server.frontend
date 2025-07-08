import styled from "@emotion/styled";
export const main = styled.div`
    box-sizing: border-box;
    background-color: var(--light-primary-color);
    font-family: "Galmuri11";
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 32px 24px;
    position: relative;
`;
export const container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 24px;
`;
export const place = styled.div`
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    gap: 36px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
`;
export const icon = styled.img`
    width: 64px;
    height: 64px;
`;
export const text = styled.p`
    color: #2E2E2E;
    font-size: 18px;
    font-weight: 400;
    word-wrap: break-word;
`;
export const btnContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
`;
