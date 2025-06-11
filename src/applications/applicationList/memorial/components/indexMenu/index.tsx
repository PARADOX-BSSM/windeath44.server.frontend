import * as _ from './style';

interface PropsType{
    idx? : number
    text : string
}

const IndexMenu = ({text} : PropsType) => {
    return(
        <_.IndexContainer>
            <_.IndexText>{text}</_.IndexText>
        </_.IndexContainer>
    );
}

export default IndexMenu;