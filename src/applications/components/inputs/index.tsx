import * as _ from './style';
import {Shadow} from "./style";

type inputProps = {
    label?: string;
    value: string;
    type: string;
    setValue: (value: string) => void;
}

const Inputs = ({label, value, type, setValue}:inputProps) =>{
    const inputElement = (
        <Shadow p={label ? undefined : "100%"}>
            <div>
                <div>
                    <_.inputs
                        type={type}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </div>
        </Shadow>
    );

    if (!label) {
        return inputElement;
    }

    return(
        <_.inputsDiv>
            <span>{label}</span>
            {inputElement}
        </_.inputsDiv>
    );
}
export default Inputs;