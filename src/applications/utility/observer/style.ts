import styled from "@emotion/styled";

export const Container = styled.section<{ left: number }>`
    position: absolute;
    left: ${({ left }) => `${left}px`};
    bottom:50px;
    height: 500px;
    width: 300px;
    z-index: 998;
    background-color: var(--light-primary-color);
    box-shadow: -1px -1px 0px 0px var(--light-primary-color) inset, 1px 1px 0px 0px #FFF inset, -2px -2px 0px 0px var(--dark-primary-color) inset;
`;
export const Logo = styled.section`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    top: 0;
    background-color:var(--secondary-color);
    
`;
export const SnapshotList = styled.ul`
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-direction: column;
    display: flex;
    left: 50px;
    bottom: 0;
    top:0;
    right:0;
`;
export const Snapshot = styled.li`
    list-style: none;
    padding-bottom: 5px;
    width: 100%;
    display: flex;
    height: 48px;
    padding: 8px 12px;
    align-items: center;
    gap: 12px;
`

export const SnapshotText = styled.p`
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: Galmuri11;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    flex: 1 0 0;
`

export const SnapshotImg = styled.img`
    width: 38px;
    height: 38px;
`
