import { useState } from 'react';
import MergeBtn from '../mergeBtn';
import * as _ from './style';

interface PropsType {
    btnText?: string,
    from: string,
    content: string,
    isReadonly? : boolean,
    isPerson? : boolean
}

const MemorialTextarea = ({ btnText="", from, content, isReadonly=false, isPerson=false }: PropsType) => {
    const [value, setValue] = useState(content);
    return (
        <>
            <_.Container>
                {isPerson? <_.Title>- @{from}의 작성안</_.Title> : <_.Title>{from}</_.Title>}
                <_.CommitAreaContainer>
                    <_.CommitArea value={value} onChange={e => setValue(e.target.value)} readOnly={isReadonly}></_.CommitArea>
                </_.CommitAreaContainer>
            </_.Container>
            {isPerson? <MergeBtn text={btnText} /> : <></>}
            
        </>
    );
}

export default MemorialTextarea;