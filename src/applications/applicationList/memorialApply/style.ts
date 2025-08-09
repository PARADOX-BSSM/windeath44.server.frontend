import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1.75rem 1.5rem 2.25rem 1.5rem;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
  flex: 1 0 0;
  background: #fff;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  overflow-x: hidden;
`;

export const Section1 = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  box-sizing: border-box;
`;

export const SubmitBtn = styled.p`
  color: var(--Stroke, #e774dd);
  text-align: right;
  font-family: Galmuri11;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  flex: 1 0 0;
`;

export const AuthorshipFrom = styled.p`
  color: var(--Stroke, #e774dd);
  text-align: right;
  font-family: Galmuri11;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CharacterNameInput = styled(TextareaAutosize)`
  display: flex;
  width: 100%;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-self: stretch;
  outline: none;
  border: none;
  resize: none;
`;

export const Status = styled.p`
  align-self: stretch;
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CharacterProfileContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0.625rem 0.5rem;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const CharacterProfileInnerContainer = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
  background: var(--VeryLightPrimary, #ffeefd);
`;

export const CharacterProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const CharacterProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

export const CharacterProfileImg = styled.div`
  height: 12em;
  width: 9em;
  border: 0.8em solid #000;
  background: #fff;
`;

export const CharacterProfileName = styled.p`
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CharacterInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -0.05rem;
  border: 0.05rem solid var(--Stroke, #e774dd);
`;

export const CharacterInformationInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -0.05rem;
  height: 100%;
  border: 0.05rem solid var(--Stroke, #e774dd);
`;

export const CharacterInformationRow = styled.div`
  display: flex;
  width: 18rem;
  height: 100%;
  align-items: flex-start;
  gap: -0.05rem;
`;

export const CharacterInformationRowAttribute = styled.div`
  display: flex;
  width: 4.75rem;
  align-self: stretch;
  padding: 0.2rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 0.05rem solid var(--Stroke, #e774dd);
  background: var(--LightPrimary, #ffd3fb);
`;

export const CharacterInformationRowAttributeText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--off, #fd51a7);
  text-align: center;
  font-family: Galmuri11;
  font-size: 0.85rem;
`;

export const CharacterInformationRowValue = styled.div`
  display: flex;
  padding: 0.2rem;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border: 0.05rem solid var(--Stroke, #e774dd);
`;

export const CharacterInformationRowValueText = styled.p`
  width: 100%;
  height: 100%;
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 0.85rem;
`;

export const CharacterInforInput = styled.input`
  width: 100%;
  height: 100%;
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 0.85rem;
  border: none;
  background: transparent;
  outline: none;
`;

export const ImgCropContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ImgCropInner = styled.div`
  background: var(--light-primary-color);
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
  padding: 1em;
  width: 24rem;
  height: 28rem;
  box-sizing: border-box;
  border: solid 0.25rem #e774dd;
  gap: 1.5em;
`;

export const RangeSlider = styled.input<{ percent: number }>`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 0.375rem;
  border-radius: 0.188rem;
  outline: none;
  cursor: none;

  &::-webkit-slider-runnable-track {
    height: 0.375rem;
    background: ${({ percent }) => `
      linear-gradient(
        to right,
        var(--Stroke, #e774dd) 0%,
        var(--Stroke, #e774dd) ${percent}%,
        var(--VeryLightPrimary, #ffeefd) ${percent}%,
        var(--VeryLightPrimary, #ffeefd) 100%
      )
    `};
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1em;
    height: 1em;
    background: var(--Stroke, #e774dd);
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
    margin-top: -0.25em;
    cursor: none;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CropText = styled.p`
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 1rem;
`;

export const Connnnn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  justify-items: center;
  justify-content: center;
  align-items: center;
`;

export const PhraseContainer = styled.input`
  width: 80%;
  height: 100%;
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 1.25rem;
  border: none;
  background: var(--VeryLightPrimary, #ffeefd);
  outline: none;
`;

export const TextAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;
  gap: 2em;
  padding: 0 1rem;
  box-sizing: border-box;
`;
