import styled from "styled-components";

export const TTaskBar = styled.footer`
    position: absolute;
    bottom: 0;
    width: inherit;
    height: 3.125rem;
    z-index: 998;
    background-color: var(--light-primary-color);
    border : 1px black solid;
`;

export const TaskList = styled.ul`
    margin:0;
    padding: 0;
    height: 100%;
    width: 100%;
    list-style: none;
    display: flex;
    align-content: center;
`;
