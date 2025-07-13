import { getPixelFromPercent } from '@/lib/getPixelFromPercent';
import * as _ from './style';

interface PropsType {
    name: string;
    selected?: boolean;
    onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void>);
    type?: string;
    active?: boolean;
    widthPercent?: number;
    heightPercent?: number;
    fontSize?: string;
}

const MemorialBtn = ({ name, selected = false, onClick, type = "none", active, widthPercent, heightPercent, fontSize = "20px" }: PropsType) => {
    const width = `${getPixelFromPercent('width', widthPercent!)}px`;
    const height = `${getPixelFromPercent('height', heightPercent!)}px`;

    if (type === "submit") {
        return !active ? (
            <_.SubmitDefault width={width} height={height} fontSize={fontSize}>
                {name}
            </_.SubmitDefault>
        ) : (
            <_.SubmitActive onClick={onClick} width={width} height={height} fontSize={fontSize}>
                {name}
            </_.SubmitActive>
        )
    } else if (type === "menu") {
        return !selected ? (
            <_.Btn onClick={onClick} width={width} height={height} fontSize={fontSize}>
                {name}
            </_.Btn>
        ) : (
            <_.SelectedBtn width={width} height={height} fontSize={fontSize}>
                {name}
            </_.SelectedBtn>
        );
    }
}

export default MemorialBtn;