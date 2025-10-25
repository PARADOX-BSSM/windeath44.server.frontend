import styled from '@emotion/styled';

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
  padding: 16px;
  width: 384px;
  height: 448px;
  box-sizing: border-box;
  border: solid 4px #e774dd;
  gap: 24px;
`;

export const RangeSlider = styled.input<{ percent: number }>`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 1px;
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
  gap: 8px;
`;

export const CropText = styled.p`
  color: #2e2e2e;
  text-align: center;
  font-family: Galmuri11;
  font-size: 16px;
`;

export const Connnnn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  justify-items: center;
  justify-content: center;
  align-items: center;
`;
