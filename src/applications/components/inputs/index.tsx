import { CURSOR_IMAGES, setCursorImage } from '@/lib/setCursorImg';
import * as _ from './style';
type inputProps = {
  width: string;
  fontSize?: string;
  flex?: boolean;
  label?: string;
  value: string;
  type: string;
  setValue: (value: string) => void;
  placeHold?: string;
};
const Inputs = ({ width, fontSize, flex, label, value, type, setValue, placeHold }: inputProps) => {
  const inputElement = (
    <_.Shadow width={width}>
      <_.inputs
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        width={width}
        onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag)}
        onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        placeholder={placeHold ?? ''}
      />
    </_.Shadow>
  );

  if (!label) {
    return inputElement;
  }

  return (
    <_.inputsDiv
      fontSize={fontSize}
      flex={flex}
    >
      <_.label>{label}</_.label>
      {inputElement}
    </_.inputsDiv>
  );
};
export default Inputs;
