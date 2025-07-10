import * as _ from './style';
import {Shadow} from "./style";

type inputProps = {
    width: string;
    fontSize: string;
    label?: string;
    value: string;
    type: "text" | "password";
    setValue: (value: string) => void;
}

const Inputs = ({width, fontSize, label, value, type, setValue}:inputProps) =>{
    const inputElement = (
        <Shadow p={label ? undefined : "100%"} width={width}>
            <_.inputs
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                width={width}
            />
        </Shadow>
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