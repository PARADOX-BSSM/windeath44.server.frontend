import styled from "@emotion/styled";

export const AppContainer = styled.div`
    width:100%;
    height:90px;
`

export const AppBtn = styled.div<{ url?: string }>`
    width: 80%;
    height: 80%;
    background-image: url('${({ url }) => url}');
    background-size: cover;
    background-position: center;
`