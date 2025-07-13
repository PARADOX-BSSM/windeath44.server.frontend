import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import * as _ from './style';

type ButtonProps = {
    props: string;
    onClick?:React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({props,onClick}:ButtonProps) =>{
    return(
        <_.Black onClick={onClick}
        onMouseEnter={()=>setCursorImage(CURSOR_IMAGES.hand)}
        onMouseLeave={()=>setCursorImage(CURSOR_IMAGES.default)}
        >
            <div>
                <div>
                    <div>
                        <div>{props}</div>
                    </div>
                </div>
            </div>
        </_.Black>
    );
}
export default Button;