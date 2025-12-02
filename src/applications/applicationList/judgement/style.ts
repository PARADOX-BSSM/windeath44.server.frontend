import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffd3fb;
  padding: 0.125rem;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  padding-buttom: 20px;
`;

export const Scroll_Div = styled.div``;

export const Top = styled.div`
  display: flex;
  width: 100%;
  height: 33px;

  margin: 20px 0px;

  gap: 20px;

  justify-content: space-between;
`;

export const Top_Text = styled.div`
  font-family: 'Galmuri11';
  margin: auto 0;
  font-size: 14px;
  white-space: nowrap;
`;

export const Search_div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 424px;
`;

export const Select = styled.div`
  min-width: 90px;
  font-family: 'Galmuri11', sans-serif;
`;

export const Main_Display = styled.div`
  width: 100%;
  height: 70%;
  min-height: 375px;

  background-color: #ffebfd;
  overflow-y: scroll;
`;

export const Judgement_List = styled.div`
  width: 100%;
  height: 420px;
  background-color: #ffebfd;
`;

export const Obj_Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Sort = styled.div`
  whith: 100%;
  height: 40px;
  background-color: #ffebfd;
  text-align: left;
  padding-left: 15px;

  display: flex;
  align-items: center;
  font-family: Galmuri11;
  font-size: 12px;
`;

export const loadingBack = styled.div`
  width: calc(100% - 36px);
  height: 99%;
  background-color: white;
  position: absolute;
  z-index: 999;
`;

export const PagingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 부모의 남는 공간을 채움 (fill) */
  box-sizing: border-box;
  overflow: hidden;
`;

export const Paging = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
`;

export const PagingGap = styled.p`
  font-size: 16px;
  color: #7c547b;
  user-select: none;
`;
