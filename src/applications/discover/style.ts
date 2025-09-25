import styled from '@emotion/styled';

export const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
`;

export const AppBtn = styled.div<{ url?: string }>`
  height: ${64 / 16}rem;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  background-image: url('${({ url }) => url}');
  background-position: center;
  background-repeat: no-repeat;
`;

export const AppName = styled.p`
  margin: 0.675rem auto;
  color: var(--primary-black);
  text-align: center;
  font-family: Galmuri11;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
