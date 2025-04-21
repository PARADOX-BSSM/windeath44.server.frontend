import * as _ from './style';
import {Shadow} from "./style";

const Button = ({label, value, type, setValue}:string) =>{
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
export default Button;