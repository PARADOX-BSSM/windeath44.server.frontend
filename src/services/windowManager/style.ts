import styled from "@emotion/styled";
import bgImg from '@/assets/Background.png';
import skeleton from '@/assets/skeleton.png';

export const Display = styled.main`
    height : 100vh;
    aspect-ratio: 4/3;
    inset: 0;
    margin: 0 auto;
    cursor: none;
    background-color: var(--background);
   background-image:url("${skeleton}");
    background-size: cover;
`;
export const BackgroundDiv = styled.div<{width:number}>`
    margin:0;
    padding:0;
    height:100vh;
    width: ${({ width }) => `${width}px`};
    z-index : 9999;
    background-image:url("${bgImg}");
    background-size:cover;
`
export const Desktop = styled.div`
  margin:0;
  padding:0;
  display:flex;
`