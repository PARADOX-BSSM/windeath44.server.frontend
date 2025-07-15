import { getPixelFromPercent } from '@/lib/getPixelFromPercent';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  width: 100%;
  height: 100%;
  background: var(--light-primary-color);
  justify-content: flex-start;
  padding: 1rem;
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
  gap: 0.4rem;
`;

export const ProfileImg = styled.img`
  width: 5rem;
  height: 5rem;
`;

export const ProfileName = styled.div`
  font-size: 1rem;
  font-family: Galmuri11;
`;

export const Btn = styled.div`
  display: flex;
  flex: 1 0 0;
  padding: 0.5rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--light-primary-color);
  box-shadow:
    -0.094rem -0.094rem 0px 0px var(--primary-black) inset,
    0.094rem 0.094rem 0px 0px #fff inset,
    -0.188rem -0.188rem 0px 0px var(--dark-primary-color) inset,
    0.188rem 0.188rem 0px 0px var(--secondary-color) inset;
  color: var(--primary-black);
  border: none;
  cursor: none;
  gap: 0.5rem;
`;

export const InnerItem = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.15rem;
  display: inline-flex;
`;

export const Title = styled.div`
  text-align: center;
  color: var(--Black, #2e2e2e);
  font-size: 0.9rem;
  font-family: Galmuri11;
  font-weight: 400;
  word-wrap: break-word;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0.078rem 0 0 0.078rem;
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 0.5rem;
  outline: none;
  border-color: #dcafdd;
  border-style: solid;
  border-width: ${getPixelFromPercent('width', 0.125)}px;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const Shadow = styled.div`
  width: 100%;
  flex: 1 0 0;
  height: 1.75rem;
  background-color: #000;
  border-width: 0 0.078rem 0.078rem 0;
  border-style: solid;
  border-color: #fff;
  padding: 0.016rem 0.078rem 0.078rem 0.016rem;
`;

export const Item = styled.div`
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  display: inline-flex;
`;

export const Icon = styled.img`
  width: 2.25rem;
  height: 2.25rem;
`;

export const Name = styled.div`
  align-self: stretch;
  text-align: center;
  color: var(--Black, #2e2e2e);
  font-size: 0.7rem;
  font-family: Galmuri11;
  line-height: 0.8rem;
  word-wrap: break-word;
  max-width: 2.5rem;
`;
