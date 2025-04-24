import * as _ from './style';

type ButtonProps = {
    props: string;
    onClick?: () => void;
}

const Button = ({props,onClick}:ButtonProps) =>{
    return(
        <_.Black onClick={onClick}>
                <_.Pink>{props}</_.Pink>
        </_.Black>
    );
}
export default Button;