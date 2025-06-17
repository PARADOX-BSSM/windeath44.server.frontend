import * as _ from './style';

interface PropsType {
    name: string;
    selected?: boolean;
    onClick?: () => void;
    type?: string;
    active?: boolean;
}

const MemorialBtn = ({ name, selected = false, onClick, type = "none", active }: PropsType) => {
    if (type === "submit") {
        return !active ? (
            <_.SubmitDefault>
                {name}
            </_.SubmitDefault>
        ) : (
            <_.SubmitActive>
                {name}
            </_.SubmitActive>
        )
    } else if (type === "menu") {
        return !selected ? (
            <_.Btn onClick={onClick}>
                {name}
            </_.Btn>
        ) : (
            <_.SelectedBtn>
                {name}
            </_.SelectedBtn>
        );
    }
}

export default MemorialBtn;