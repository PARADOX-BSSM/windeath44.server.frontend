import * as _ from './style';

interface PropsType {
    name : String
}

const MemorialBtn = ({name} : PropsType) => {
    return(
        <_.Btn>
            {name}
        </_.Btn>
    )
}

export default MemorialBtn;