import * as _ from './style';

interface PropsType {
    name: string;
    selected?: boolean;
    onClick?: () => void;
    type?: string;
    active?: boolean;
    widthPercent?: number;
    heightPercent?: number;
}

const MemorialBtn = ({ name, selected = false, onClick, type = "none", active, widthPercent, heightPercent }: PropsType) => {
    if (type === "submit") {
        return !active ? (
            <_.SubmitDefault width={widthPercent} height={heightPercent}>
                {name}
            </_.SubmitDefault>
        ) : (
            <_.SubmitActive onClick={onClick} width={widthPercent} height={heightPercent}>
                {name}
            </_.SubmitActive>
        )
    } else if (type === "menu") {
        return !selected ? (
            <_.Btn onClick={onClick} width={widthPercent} height={heightPercent}>
                {name}
            </_.Btn>
        ) : (
            <_.SelectedBtn width={widthPercent} height={heightPercent}>
                {name}
            </_.SelectedBtn>
        );
    }
}

export default MemorialBtn;