import styled from "@emotion/styled";

export const Container = styled.section<{ left: number }>`
    position: absolute;
    left: ${({ left }) => `${left}px`};
    bottom: 2.5rem;
    height: 20rem;
    width: 14rem;
    z-index: 998;
    background-color: var(--light-primary-color);
    box-shadow: 
      -0.063rem -0.063rem 0px 0px var(--light-primary-color) inset, 
       0.063rem  0.063rem 0px 0px #FFF inset, 
      -0.125rem -0.125rem 0px 0px var(--dark-primary-color) inset;
`;

export const Logo = styled.section`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 2.6rem;
    top: 0;
    background-color: var(--secondary-color);
`;

export const SnapshotList = styled.ul`
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-direction: column;
    display: flex;
    left: 2.7rem;
    bottom: 0;
    top: 0;
    right: 0;
`;

export const Snapshot = styled.li`
    list-style: none;
    padding-bottom: 0.3rem;
    width: 100%;
    display: flex;
    height: 3rem;
    padding: 0.15rem 0.7rem;
    align-items: center;
    gap: 0.75rem;
`;

export const SnapshotText = styled.p`
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: Galmuri11;
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    flex: 1 0 0;
`;

export const SnapshotImg = styled.img`
    width: 2rem;
    height: 2rem;
`;