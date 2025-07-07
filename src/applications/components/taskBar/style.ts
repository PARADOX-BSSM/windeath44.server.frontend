import styled from "@emotion/styled";

export const TTaskBar = styled.footer`
    position: absolute;
    bottom: 0;
    width: inherit;
    height: 3.25rem;
    z-index: 998;
    background-color: var(--light-primary-color);
    border : 1px black solid;
    display: flex;
    padding: 8px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    box-sizing:border-box;
`;

export const TaskList = styled.ul`
    margin:0;
    padding: 0;
    height: 100%;
    width: 100%;
    list-style: none;
    display: flex;
    gap:6px;
    align-content: center;
    box-sizing:border-box;
`;

export const TaskItem = styled.div`
    display: flex;
    width: 180px;
    padding: 4px 6px;
    align-items: center;
    gap: 6px;
    height:100%;
    flex-shrink: 0;
    box-shadow: -1.539px -1.539px 0px 0px var(--secondary-color) inset, 1.539px 1.539px 0px 0px #FFF inset, -3.078px -3.078px 0px 0px #DCAFDD inset;
    box-sizing:border-box;
`

export const ImgContainer = styled.img`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
`

export const TaskName = styled.p`
    overflow: hidden;
    color: var(--primary-black);
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Galmuri11;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    height: 16px;
`

export const taskButtonStyle = {
    height: "100%",
    backgroundColor: "var(--light-primary-color)",
};
export const taskSelectButtonStyle = {
    height: "100%",
    backgroundColor: "var(--dark-primary-color)",
    BoxShadow: "-1.5px -1.5px 0px 0px #FFF inset, 1.5px 1.5px 0px 0px var(--Black, #2E2E2E) inset, -3px -3px 0px 0px var(--Secondary, #FFBBF5) inset, 3px 3px 0px 0px var(--DarkPrimary, #DCAFDD) inset"
}