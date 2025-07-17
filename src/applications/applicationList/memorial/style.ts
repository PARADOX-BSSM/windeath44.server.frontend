import styled from '@emotion/styled';

export const Main = styled.main`
  display: flex;
  padding: 0.5rem;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  background: var(--LightPrimary, #ffd3fb);
  height: 100%;
  box-sizing: border-box;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
  border: 0.031rem black solid;
`;

export const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.15rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex: 1 0 0;
  background: #fff;
  box-sizing: border-box;
`;

export const Section1 = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.2rem;
  align-self: stretch;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  flex: 1 0 0;
`;

export const Title = styled.h1`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-self: stretch;
`;

export const Subtitle = styled.p`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const History = styled.p`
  color: var(--Stroke, #e774dd);
  text-align: right;
  font-family: Galmuri11;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const DocumentUpdate = styled(History)`
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-self: stretch;
  padding: 0.625rem 1rem;
  justify-content: center;
  align-items: center;
`;

export const IndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  flex: 1 0 0;
  align-self: stretch;
`;

export const Quote = styled.h2`
  height: fit-content;
  align-self: stretch;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
`;

export const Index = styled.div`
  display: flex;
  height: fit-content;
  padding: 0.75rem 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border: 0.063rem solid var(--Stroke, #e774dd);
`;

export const IndexTitle = styled.p`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ProfileContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
`;

export const ProfileInnerContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  position: relative;
`;
export const Ribbon = styled.img`
  position: absolute;
  top: -0.5em;
  width: 82%;
  z-index: 1;
`;
export const Picture = styled.div<{ imgUrl: string }>`
  display: flex;
  height: 12rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.8rem solid #000;
  background: #fff;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  width: 9rem;
  flex-shrink: 0;
`;

export const Name = styled.p`
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -0.05em;
  border: 0.05rem solid var(--Stroke, #e774dd);
`;

export const Row = styled.div`
  display: flex;
  width: 18rem;
  align-items: flex-start;
  gap: -0.05rem;
`;

export const Attribute = styled.div`
  display: flex;
  width: 4.75rem;
  padding: 0.2rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 0.05rem solid var(--Stroke, #e774dd);
  background: var(--LightPrimary, #ffd3fb);
  color: var(--off, #fd51a7);
  text-align: center;
  font-family: Galmuri11;
  font-size: 0.85rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 100%;
  box-sizing: border-box;
`;

export const Value = styled.div`
  display: flex;
  padding: 0.2rem;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  border: 0.05rem solid var(--Stroke, #e774dd);
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 0.85rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const GotoBow = styled.button`
  display: flex;
  width: 11rem;
  height: 4rem;
  padding: 0.55rem 1.5rem;
  justify-content: center;
  align-items: center;
  background: var(--LightPrimary, #ffd3fb);
  box-shadow:
    -0.094rem -0.094rem 0px 0px var(--Black, #2e2e2e) inset,
    0.094rem 0.094rem 0px 0px #fff inset,
    -0.188rem -0.188rem 0px 0px var(--DarkPrimary, #dcafdd) inset,
    0.188rem 0.188rem 0px 0px var(--Secondary, #ffbbf5) inset;
  color: var(--Black, #2e2e2e);
  text-align: center;
  font-family: Galmuri11;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  border: none;
`;

export const Section2 = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const CommentContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0.625rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;

export const CommentTitle = styled.p`
  align-self: stretch;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CommentMain = styled.div`
  display: flex;
  height: 100%;
  padding: 0 1rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

export const CommentMainInner = styled.div`
  display: flex;
  align-self: stretch;
  padding: 0.063rem 0;
  flex-direction: column;
  align-items: center;
  gap: 0.063rem;
  flex: 1 0 0;
  background: rgba(0, 0, 0, 0.2);
`;

export const InputComment = styled.div`
  display: flex;
  padding: 0.75rem 0.938rem;
  align-items: center;
  gap: 0.563rem;
  align-self: stretch;
  background: #ffebfd;
`;

export const InputCommentText = styled.input`
  font-family: Galmuri11;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  background: none;
  outline: none;
  box-shadow: none;
  padding: 0;
  border-width: 0;
  width: 100%;
  &::placeholder {
    color: var(--DarkPrimary, #dcafdd);
  }
`;

export const ArticleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
`;

export const ArticleTitle = styled.h1`
  color: var(--Stroke, #e774dd);
  font-family: Galmuri11;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ArticleContent = styled.div`
  display: flex;
  padding: 0 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
