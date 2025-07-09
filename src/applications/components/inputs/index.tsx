import * as _ from './style';
import {Shadow} from "./style";

type inputProps = {
    label?: string;
    value: string;
    type: "text" | "password";
    setValue: (value: string) => void;
}

const Inputs = ({label, value, type, setValue}:inputProps) =>{
    return(
        <_.inputsDiv>
            <span>{label}</span>
            <Shadow>
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
        </_.inputsDiv>
    );
}

export const Inputs2 = ({value, type, setValue}:inputProps) =>{
    return(
            <Shadow p={"100%"}>
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
}

export default Inputs;