import styled from "@emotion/styled";


export const TTaskBar = styled.footer`
    position: absolute;
    bottom: 0;
    width: inherit;
    height: 2.75rem;
    z-index: 998;
    background-color: var(--light-primary-color);
    border : 0.063rem black solid;
    display: flex;
    padding: 0.25rem 1.25rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.625rem;
    box-sizing:border-box;
`;

export const TaskList = styled.ul`
    margin:0;
    padding: 0;
    height: 100%;
    width: 100%;
    list-style: none;
    display: flex;
    gap: 0.375rem;
    align-content: center;
    box-sizing:border-box;
`;

export const TaskItem = styled.div`
    display: flex;
    width: 11.25rem;
    padding: 0.25rem 0.375rem;
    align-items: center;
    gap: 0.375rem;
    height:100%;
    flex-shrink: 0;
    box-shadow: 
        -0.094rem -0.094rem 0px 0px var(--secondary-color) inset,
       0.094rem  0.094rem 0px 0px #FFF inset,
      -0.188rem -0.188rem 0px 0px #DCAFDD inset;
    box-sizing:border-box;
`

export const ImgContainer = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
`

export const TaskName = styled.p`
    color: var(--primary-black);
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Galmuri11;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
    height: 1rem;
`

export const taskButtonStyle = {
    height: "100%",
    backgroundColor: "var(--light-primary-color)",
};
export const taskSelectButtonStyle = {
    height: "100%",
    backgroundColor: "var(--dark-primary-color)",
    BoxShadow: 
        "-0.094rem -0.094rem 0px 0px #FFF inset, " +
        "0.094rem 0.094rem 0px 0px var(--primary-black) inset, " +
        "-0.188rem -0.188rem 0px 0px var(--secondary-color) inset, " +
        "0.188rem 0.188rem 0px 0px var(--dark-primary-color) inset"
}

export const Observer = styled.div<{ selected?: boolean }>`
    display: flex;
    width: 4.625rem;
    padding: 0.25rem 0.75rem;
    justify-content: center;
    align-items: center;
    background: ${({ selected }) =>
        selected ? "var(--dark-primary-color)" : "var(--light-primary-color)"};
    box-shadow: -0.094rem -0.094rem 0px 0px var(--secondary-color) inset,
                0.094rem 0.094rem 0px 0px #FFF inset,
                -0.188rem -0.188rem 0px 0px #DCAFDD inset;
`

export const StartImg = styled.img`
    width:100%;
    height:100%;
`