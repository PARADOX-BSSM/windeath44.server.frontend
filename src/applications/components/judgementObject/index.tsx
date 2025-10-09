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
}


const Judgement_Object = ({rank,cName,aName,img,like,vote}:JudgementObjProps) => {
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
                <SubInfo></SubInfo>
            </_.Right>
        </_.Main_Box>
    )
}





export default Judgement_Object