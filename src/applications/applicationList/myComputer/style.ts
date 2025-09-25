import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${30 / 16}rem;
  width: 100%;
  height: 100%;
  background: var(--light-primary-color);
  justify-content: flex-start;
  padding: ${30 / 16}rem;
  box-sizing: border-box;
`;

export const LeftContainer = styled.div`
  width: fit-content;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

export const ProfileContainer = styled.div`
  width: fit-content;
  height: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;
  gap: 9px;
`;

export const ProfileImg = styled.div<{ imgUrl: string }>`
  width: 116px;
  height: 116px;
  background: #ffffff00;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
`;

export const ProfileName = styled.div`
  font-size: 20px;
  font-family: Galmuri11;
`;

export const Btn = styled.div`
  display: flex;
  flex: 1 0 0;
  padding: 8px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--light-primary-color);
  box-shadow:
    -0.0625rem -0.0625rem 0px 0px var(--primary-black) inset,
    0.0625rem 0.0625rem 0px 0px #fff inset,
    -0.125rem -0.125rem 0px 0px var(--dark-primary-color) inset,
    0.125rem 0.1258rem 0px 0px var(--secondary-color) inset;
  color: var(--primary-black);
  border: none;
  cursor: none;
  gap: 4px;
`;

export const InnerItem = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: inline-flex;
`;

export const Title = styled.div`
  text-align: center;
  color: var(--Black, #2e2e2e);
  font-size: 20px;
  font-family: Galmuri11;
  word-wrap: break-word;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0.0625rem 0 0 0.0625rem;
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 8px;
  outline: none;
  border-color: #dcafdd;
  border-style: solid;
  border-width: 0.1125rem;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 24px;
  flex-wrap: wrap;
`;

export const Shadow = styled.div`
  width: 100%;
  flex: 1 0 0;
  height: 1.75rem;
  background-color: #000;
  border-width: 0 0.0625rem 0.0625rem 0;
  border-style: solid;
  border-color: #fff;
  padding: 0.016rem 0.0625rem 0.0625rem 0.016rem;
`;

export const MessageText = styled.div`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  padding: 20px;
  width: 100%;
`;
