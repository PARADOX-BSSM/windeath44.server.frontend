import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';
import { getPixelFromPercent } from '@/lib/getPixelFromPercent';

export const Container = styled.div`
  display: flex;
  padding: 28px 24px 36px 24px;
  flex-direction: column;
  align-items: center;
  gap: 56px;
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
  gap: 16px;
  box-sizing: border-box;
`;

export const SubmitBtn = styled.p`
  color: var(--Stroke, #e774dd);
  text-align: right;
  font-family: Galmuri11;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

export const AuthorshipFrom = styled.p`
  color: var(--Stroke, #e774dd);
  text-align: right;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CharacterNameInput = styled(TextareaAutosize)`
  color: #2e2e2e;
  font-family: Galmuri11;
  font-size: 36px;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CharacterProfileContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const CharacterProfileInnerContainer = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  background: var(--VeryLightPrimary, #ffeefd);
`;

export const CharacterProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const CharacterProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const CharacterProfileImg = styled.div`
  height: 10em;
  width: 7.25em;
  border: 18.418px solid #000;
  background: #fff;
`;

export const CharacterProfileName = styled.p`
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CharacterInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -1px;
  border: 1px solid var(--Stroke, #e774dd);
`;

export const CharacterInformationInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -1px;
  border: 1px solid var(--Stroke, #e774dd);
`;

export const CharacterInformationRow = styled.div`
  display: flex;
  width: 328px;
  height: 100%;
  align-items: flex-start;
  gap: -1px;
`;

export const CharacterInformationRowAttribute = styled.div`
  display: flex;
  width: 100px;
  height: fit-content;
  padding: 4px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid var(--Stroke, #e774dd);
  background: var(--LightPrimary, #ffd3fb);
`;

export const CharacterInformationRowAttributeText = styled.p`
  width: 100%;
  height: fit-content;
  flex-shrink: 0;
  color: var(--off, #fd51a7);
  text-align: center;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CharacterInformationRowValue = styled.div`
  display: flex;
  padding: 4px;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border: 1px solid var(--Stroke, #e774dd);
`;

export const CharacterInformationRowValueText = styled.p`
  width: 100%;
  height: 100%;
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CharacterInforInput = styled.input`
  width: 100%;
  height: 100%;
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  padding: 20;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
  padding: 1em;
  width: 25%;
  height: 50%;
  box-sizing: border-box;
  border: solid ${getPixelFromPercent('width', 0.25)}px #e774dd;
  gap: 1.5em;
`;

export const RangeSlider = styled.input<{ percent: number }>`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  outline: none;
  cursor: none;

  &::-webkit-slider-runnable-track {
    height: 6px;
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

  &::-moz-range-track {
    height: 6px;
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
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    margin-top: -0.25em;
    cursor: none;
  }

  &::-moz-range-thumb {
    width: 1em;
    height: 1em;
    background: var(--Stroke, #e774dd);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    cursor: none;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: 0.5em;
`;

export const CropText = styled.p`
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Connnnn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25em;
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
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  background: transparent;
  outline: none;
  background: var(--VeryLightPrimary, #ffeefd);
`;

export const TextAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;
  gap: 2em;
  padding: 0 10%;
  box-sizing: border-box;
`;
