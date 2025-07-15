import { getPixelFromPercent } from '@/lib/getPixelFromPercent';
import styled from '@emotion/styled';
// *검색결과창
export const view = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 0.125rem;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const inputs = styled.div`
  background-color: var(--light-primary-color);
  margin: 0.078rem 0 0 0.078rem;
  width: 100%;
  height: 100%;
  font-family: 'Galmuri11';
  padding: 0 0 0 0;
  outline: none;
  border-color: #dcafdd;
  border-style: solid;
  border-width: ${getPixelFromPercent('width', 0.125)}px;
  box-sizing: border-box;
`;
export const Shadow = styled.div`
  display: flex;
  height: 100%;
  background-color: #000;
  border-width: 0 0.078rem 0.078rem 0;
  border-style: solid;
  border-color: #fff;
  padding: 0.016rem 0.078rem 0.078rem 0.016rem;
`;

export const viewer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 0 0.156rem 0;
`;
