import { useAtomValue } from 'jotai';
import MainInfo from '../judgementMainInfo';
import SubInfo from '../judgementSubInfo';
import * as _ from './style';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { Sep_window } from '@/applications/applicationList/vote/state_manage';
import { useEffect } from 'react';


interface JudgementObjProps{
    rank:number
    cName:string
    aName:string
    img:string|undefined
    like:number
    vote:number
    heaven_count:number
    hell_count:number
    stack:any[];
    push:any;
    pop:any;
    top:any;
}


const Judgement_Object = ({rank,cName,aName,img,like,vote,heaven_count,hell_count,stack,push,pop,top}:JudgementObjProps) => {

    const taskSearch = useAtomValue(taskSearchAtom)

    const taskTransform = useAtomValue(taskTransformerAtom);

    const sep_window = useAtomValue(Sep_window)
    
    
        useEffect(()=>{
            if(sep_window == false){
                taskTransform('재판 댓글','')
            }
        },[sep_window])
    


    const VoteProps = {
        stack:stack,
        push:push,
        pop:pop,
        top:top,

        aName:aName,
        cName:cName,
        img:img,
        like:like,
        vote:vote,
        hell_count:hell_count,
        heaven_count:heaven_count,
        
    }

    return(
        <_.Main_Box>
            <_.Left>
                <MainInfo
                    rank={rank}
                    cName={cName}
                    aName={aName}
                    img={img}
                    like={like}
                    voteNum={vote}
                >
    
                </MainInfo>
            </_.Left>

            <_.Right>
                <SubInfo
                    heaven_count={(heaven_count/ (heaven_count+hell_count) * 100).toFixed(1)}
                    hell_count={(hell_count/(heaven_count+hell_count)*100).toFixed(1)}
                >
                    
                </SubInfo>
                <_.Link
                    onClick={()=>{
                        taskTransform('','재판 댓글')
                        push(taskSearch?.('투표',VoteProps))
                    }}
                >«« 재판장으로 가기</_.Link>
            </_.Right>
        </_.Main_Box>
    )
}





export default Judgement_Object