import MainInfo from '../judgementMainInfo';
import SubInfo from '../judgementSubInfo';
import * as _ from './style';


interface JudgementObjProps{
    rank:number
    cName:string
    aName:string
    img:string|undefined
    like:number
    vote:number
    heaven_count:number | string
    hell_count:number | string
}


const Judgement_Object = ({rank,cName,aName,img,like,vote,heaven_count,hell_count}:JudgementObjProps) => {
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
                    heaven_count={heaven_count}
                    hell_count={hell_count}
                >

                </SubInfo>
            </_.Right>
        </_.Main_Box>
    )
}





export default Judgement_Object