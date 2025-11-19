import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #ffd3fb;
`;
export const Title = styled.input`
  background: none;
  border: none;
  outline: none;
  &::focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: #2e2e2e;
  }
  color: #2e2e2e;
  text-align: left;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Content = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  overflow-y: scroll;

  background: #fff;
  padding: 12px 15px;
  box-sizing: border-box;
  border: none;
  outline: none;
  &::focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: #5f6368;
  }
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const BtnArea = styled.div`
  width: 100%;
  height: 52px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  gap: 18px;
  background: #ffd3fb;
  border: none;
  font-family: 'Galmuri11', sans-serif;
  font-size: 20px;
  color: var(--primary-black);
  cursor: none;
  box-shadow:
    -1px -1px 0px 0px inset #2e2e2e,
    1px 1px 0px 0px inset #ffffff,
    -2px -2px 0px 0px inset #dcafdd,
    2px 2px 0px 0px inset #ffbbf5;
`;

export const Header = styled.div`
  display: flex;
  height: 28px;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  gap: 20px;

  color: #000;
  text-align: center;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const BeforeBtn = styled.button`
  border: none;
  background: none;
  outline: none;
`;
export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
export const PostArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffeefd;
  overflow-y: scroll;
`;
export const NoDataMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #5f6368;
  font-family: Galmuri11;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
