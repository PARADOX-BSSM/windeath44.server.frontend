import * as _ from './style';


interface Sort_Props{
    text:string
}

const JudgementSort = ({text}:Sort_Props) => {
    return(
        <_.Sort>
            {text}
        </_.Sort>
    )
}


export default JudgementSort