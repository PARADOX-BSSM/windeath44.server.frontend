import styled from "@emotion/styled";

export const Container = styled.section<{ left: number }>`
    position: absolute;
    left: ${({ left }) => `${left}px`};
    bottom:50px;
    height: 500px;
    width: 300px;
    z-index: 998;
    background-color: aquamarine;
`;
export const Logo = styled.section`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    top: 0;
    background-color:aqua;
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
    & > button {
        width: 100%;
    }
`