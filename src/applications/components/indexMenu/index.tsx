import * as _ from './style';

interface PropsType{
    idx : number
    text : string
}

const IndexMenu = ({text,idx} : PropsType) => {
    return(
        <_.IndexContainer>
            <_.IndexText>{idx+1+". "}{text}</_.IndexText>
        </_.IndexContainer>
    );
}

export default IndexMenu;