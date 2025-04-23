import * as _ from './style';
import {Shadow} from "./style";

type inputProps = {
    label: string;
    value: string;
    type: "text" | "password";
    setValue: (value: string) => void;
}

const Inputs = ({label, value, type, setValue}:inputProps) =>{
    return(
        <_.inputsDiv>
            <span>{label}</span>
            <Shadow>
                <_.inputs
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Shadow>
        </_.inputsDiv>
    );
}
export default Inputs;