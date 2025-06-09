import * as _ from './style';

interface PropsType {
    name: string;
    selected?: boolean;
    onClick?: () => void;
}

const MemorialBtn = ({ name, selected = false, onClick }: PropsType) => {
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

export default MemorialBtn;