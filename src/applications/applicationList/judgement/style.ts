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
  min-width: 78px;
`;

export const Main_Display = styled.div`
  width: 100%;
  height: 82%;
  min-height: 420px;

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
