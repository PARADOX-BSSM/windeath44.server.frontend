import styled from '@emotion/styled';
import '@/assets/font.css';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px;
  background: var(--light-primary-color, #ffd3fb);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const WindowFrame = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px 32px;
  background: var(--light-primary-color, #ffd3fb);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  box-shadow: inset -1px -1px 0px 0px var(--Black, #2e2e2e),
    inset 1px 1px 0px 0px #ffffff,
    inset -2px -2px 0px 0px var(--dark-primary-color, #dcafdd),
    inset 2px 2px 0px 0px var(--secondary-color, #ffbbf5);
`;

export const Setting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const SectionTitle = styled.p`
  font-family: Galmuri11;
  font-size: 16px;
  line-height: 15px;
  color: var(--Black, #2e2e2e);
  margin: 0;
  white-space: pre;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 8px;
  box-sizing: border-box;
`;

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7.5px;
  width: 250px;
`;

export const Label = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: none;
`;

export const RadioButtonIcon = styled.div`
  width: 18px;
  height: 18px;
  position: relative;
  flex-shrink: 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
    max-width: none;
    user-select: none;
    -webkit-user-drag: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;

export const CheckboxContainer = styled.div`
  width: 19.5px;
  height: 19.5px;
  background: white;
  position: relative;
  flex-shrink: 0;
  box-shadow: inset -1.5px -1.5px 0px 0px #ffffff,
    inset 1.5px 1.5px 0px 0px var(--Black, #2e2e2e),
    inset -3px -3px 0px 0px var(--dark-primary-color, #dcafdd),
    inset 3px 3px 0px 0px var(--dark-primary-color, #dcafdd);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckIcon = styled.img`
  width: 12px;
  height: 12px;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const LabelText = styled.p`
  font-family: Galmuri11;
  font-size: 16px;
  line-height: 15px;
  color: var(--Black, #2e2e2e);
  margin: 0;
  white-space: pre;
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;
