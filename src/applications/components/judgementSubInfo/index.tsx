import { useAtom, useAtomValue } from 'jotai'
import * as _ from './style'
import { taskTransformerAtom } from '@/atoms/taskTransformer'
import Judgement from '@/applications/applicationList/judgement'


interface VoteProps{
    heaven_count:number | string
    hell_count:number | string
}

const SubInfo = ({heaven_count,hell_count}:VoteProps) => {

    const taskTransform = useAtomValue(taskTransformerAtom)

    return(
        <_.Main_Box>
    
                <_.Vote_Info>
                    <_.Vote_Div>
                        천국
                        {heaven_count}
                    </_.Vote_Div>
                    <_.Sep_Bar></_.Sep_Bar>
                    <_.Vote_Div>
                        지옥
                        {hell_count}
                    </_.Vote_Div>
                </_.Vote_Info>
                 
                <_.Link onClick={()=>{
                    taskTransform('재판','')
                    console.log(123)
                    }}>
                    «« 재판장으로 가기
                </_.Link>
        
        </_.Main_Box>
    )
}



export default SubInfo