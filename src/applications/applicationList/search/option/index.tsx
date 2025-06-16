import {Dispatch} from "react";
import {SetStateAction} from "jotai/vanilla/typeUtils";

type OptionsProps = {
    list: string[];
    onChange: Dispatch<SetStateAction<string>>;
}
const Option = ({list, onChange}:OptionsProps) => {

    return (
        <div>
            {list.map((item)=>(
                <div onClick={() => onChange(item)}>{item}</div>
            ))}
        </div>
    );
}
export default Option;
