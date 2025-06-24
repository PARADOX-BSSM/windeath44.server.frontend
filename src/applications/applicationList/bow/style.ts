import styled from "@emotion/styled";
export const main = styled.div`
    box-sizing: border-box;
    background-color: var(--light-primary-color);
    font-family: "Galmuri11";
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 12px 24px;
    position: relative;
`;
export const nbow = styled.div`
    padding: 24px;
    position: absolute;
    top: 0;
    left: 0;
`;
export const place = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;
export const imgs = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;
export const character = styled.img`
    width: 20%;
    height: 50%;
`;
export const table = styled.img`
    margin-top: -26%;
    width: 70%;
    height: 78%;
`;
export const bbow = styled.div`
    margin-top: -16%;
    border-width: 0 1.5px 1.5px 0;
    border-style: solid;
    border-color: var(--primary-black);
    box-sizing: border-box;
    & > div{
        width: 100%;
        height: 100%;
        border-width: 1.5px 0 0 1.5px;
        border-style: solid;
        border-color: #ffffff;
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
                border-color:var(--secondary-color);
                box-sizing: border-box;
                & > button {
                    border: none;
                    background-color: var(--light-primary-color);
                    font-family: "Galmuri11";
                    font-size: 16px;
                    padding: 8px 32px;
                }
            }
        }
    }
`;
