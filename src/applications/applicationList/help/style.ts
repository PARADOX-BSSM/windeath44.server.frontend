import styled from '@emotion/styled';
import Content from '@/assets/help/contents.svg';
import Video from '@/assets/help/video.svg';
import Bold from '@/assets/help/bold.svg';
import Enter from '@/assets/help/enter.svg';
import Seori from '@/assets/help/seori.svg';
import '@/assets/font.css';
export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  background: var(--light-primary-color);
  box-sizing: border-box;
`;
export const Main = styled.main`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: var(--Black, #2e2e2e);
  box-sizing: border-box;
  display: flex;
`;
export const Contents = styled.section<{ url: number }>`
  width: 75%;
  height: 100%;
  padding: 1rem;
  background: var(--White, #ffffff);
  box-sizing: border-box;
  background-image: ${({ url }) => {
    if (url === 0) return `url(${Content})`;
    if (url === 1) return `url(${Video})`;
    if (url === 2) return `url(${Bold})`;
    return `url(${Enter})`;
  }};
  background-repeat: no-repeat;
  background-size: contain;
`;
export const Locate = styled.section`
  width: 30%;
  height: 100%;
  padding-left: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const Character = styled.div`
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  background-image: url(${Seori});
  background-repeat: no-repeat;
  background-size: contain;
`;
export const TagSet = styled.div`
  width: 100%;
  height: fit-content;
  margin-bottom: 1rem;
  padding: 0.5rem 0.25rem;
  box-sizing: border-box;
  border: solid 1px var(--White, #ffffff);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
export const Tag = styled.div<{ isActive: boolean }>`
  width: 100%;
  padding: 0.25rem;
  box-sizing: border-box;
  font-family: Galmuri11;
  font-size: 0.75rem;
  text-align: center;
  border: none;
  background-color: ${({ isActive }) =>
    !isActive ? 'var(--Black, #2e2e2e)' : 'var(--secondary-color)'};
  color: ${({ isActive }) => (!isActive ? 'var(--White, #ffffff)' : 'var(--Black, #2e2e2e)')};
`;
