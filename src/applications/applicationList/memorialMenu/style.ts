import styled from '@emotion/styled';

const shadow = `
  -0.0625rem -0.0625rem 0px 0px #FFF inset,
  0.0625rem 0.0625rem 0px 0px var(--primary-black) inset,
  -0.125rem -0.125rem 0px 0px var(--dark-primary-color) inset,
  0.125rem 0.125rem 0px 0px var(--dark-primary-color) inset
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--light-primary-color);
  justify-content: flex-start;
  padding: 0px ${32 / 16}rem;
  box-sizing: border-box;
`;

export const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  padding: ${24 / 16}rem 0;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${16 / 16}rem;
  align-self: stretch;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${12 / 16}rem;
`;

export const Title = styled.h2`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: Galmuri11;
  font-size: ${42 / 16}rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Version = styled.p`
  display: flex;
  width: 21.6rem;
  flex-direction: column;
  justify-content: flex-end;
  align-self: stretch;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: Galmuri11;
  font-size: ${24 / 16}rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex: 1 0 0;
  min-height: 0;
  align-self: stretch;
`;

export const DescriptionBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding: ${24 / 16}rem;
  flex-direction: column;
  align-items: flex-start;
  gap: ${24 / 16}rem;
  flex: 1 1 0;
  align-self: stretch;
  background: #FFF;
  box-shadow: ${shadow};
`;

export const Description = styled.p`
  flex: 1 1 0;
  align-self: stretch;
  color: #2E2E2E;
  font-family: Galmuri11;
  font-size: ${24 / 16}rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const BtnWrapper = styled.div`
  padding: 0 0 0 2.304rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const BtnInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.44rem;
`;

export const BtnVoid = styled.div`
  height: 0.3375rem;
  flex-direction: column;
  align-self: stretch;
  background: #FFF;
  box-shadow: ${shadow};
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 1.8rem;
  align-self: stretch;
`;
