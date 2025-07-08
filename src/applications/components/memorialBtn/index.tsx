import * as _ from './style';

interface PropsType {
    name: string;
    selected?: boolean;
    onClick?: () => void;
    type?: string;
    active?: boolean;
    widthPercent?: number;
    heightPercent?: number;
    fontSize?: string;
}

const MemorialBtn = ({ name, selected = false, onClick, type = "none", active, widthPercent, heightPercent, fontSize = "20px" }: PropsType) => {
    if (type === "submit") {
        return !active ? (
            <_.SubmitDefault width={widthPercent} height={heightPercent} fontSize={fontSize}>
                {name}
            </_.SubmitDefault>
        ) : (
            <_.SubmitActive onClick={onClick} width={widthPercent} height={heightPercent} fontSize={fontSize}>
                {name}
            </_.SubmitActive>
        )
    } else if (type === "menu") {
        return !selected ? (
            <_.Btn onClick={onClick} width={widthPercent} height={heightPercent} fontSize={fontSize}>
                {name}
            </_.Btn>
        ) : (
            <_.SelectedBtn width={widthPercent} height={heightPercent} fontSize={fontSize}>
                {name}
            </_.SelectedBtn>
        );
    }
}

export default MemorialBtn;