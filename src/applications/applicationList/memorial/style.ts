import styled from '@emotion/styled';

export const Main = styled.main`
  display: flex;
  padding: 12px;
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
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  border: 1px black solid;
`;

export const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  flex: 1 0 0;
  background: #fff;
  box-sizing: border-box;
`;

export const Section1 = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

export const Title = styled.h1`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-self: stretch;
`;

export const Subtitle = styled.p`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const History = styled.p`
  color: var(--Stroke, #e774dd);
  text-align: right;
  font-family: Galmuri11;
  font-size: 20px;
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
  padding: 10px 8px;
  justify-content: center;
  align-items: center;
`;

export const IndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
  align-self: stretch;
`;

export const Quote = styled.h2`
  height: fit-content;
  align-self: stretch;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
`;

export const Index = styled.div`
  display: flex;
  height: fit-content;
  padding: 12px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid var(--Stroke, #e774dd);
`;

export const IndexTitle = styled.p`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ProfileContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

export const ProfileInnerContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
`;
export const Ribbon = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;
export const Picture = styled.div<{ imgUrl: string }>`
  display: flex;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 12px solid #000;
  background: #fff;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  width: 144px;
  flex-shrink: 0;
`;

export const Name = styled.p`
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -1px;
  border: 1px solid var(--Stroke, #e774dd);
`;

export const Row = styled.div`
  display: flex;
  width: 328px;
  align-items: flex-start;
  gap: -1px;
`;

export const Attribute = styled.div`
  display: flex;
  width: 100px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid var(--Stroke, #e774dd);
  background: var(--LightPrimary, #ffd3fb);
  color: var(--off, #fd51a7);
  text-align: center;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 100%;
  box-sizing: border-box;
`;

export const Value = styled.div`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  border: 1px solid var(--Stroke, #e774dd);
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const GotoBow = styled.button`
  display: flex;
  width: 260px;
  height: 60px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  background: var(--LightPrimary, #ffd3fb);
  box-shadow:
    -1px -1px 0px 0px var(--Black, #2e2e2e) inset,
    1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px var(--DarkPrimary, #dcafdd) inset,
    2px 2px 0px 0px var(--Secondary, #ffbbf5) inset;
  color: var(--Black, #2e2e2e);
  text-align: center;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  border: none;
`;

export const Section2 = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const CommentContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const CommentTitle = styled.p`
  align-self: stretch;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CommentMain = styled.div`
  display: flex;
  height: 100%;
  padding: 0 12px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

export const CommentMainInner = styled.div`
  display: flex;
  align-self: stretch;
  padding: 1px 0;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  flex: 1 0 0;
  background: rgba(0, 0, 0, 0.2);
`;

export const InputComment = styled.div`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: #ffebfd;
`;

export const InputCommentText = styled.input`
  font-family: Galmuri11;
  font-size: 12px;
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
  gap: 20px;
`;

export const ArticleTitle = styled.h1`
  color: var(--Stroke, #e774dd);
  font-family: Galmuri11;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ArticleContent = styled.div`
  display: flex;
  padding: 0 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
