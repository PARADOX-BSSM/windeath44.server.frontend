import * as _ from './style';
type inputProps = {
    width: string;
    fontSize: string;
    label?: string;
    value: string;
    type: string;
    setValue: (value: string) => void;
}

const Inputs = ({width, fontSize, label, value, type, setValue}:inputProps) =>{
    const inputElement = (
        <_.Shadow  width={width}>
            <_.inputs
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                width={width}
            />
        </_.Shadow>
    );

    if (!label) {
        return inputElement;
    }

    return(
        <_.inputsDiv fontSize={fontSize}>
            <span>{label}</span>
            {inputElement}
        </_.inputsDiv>
    );
}
export default Inputs;