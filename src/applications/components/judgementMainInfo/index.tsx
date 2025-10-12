import * as _ from './style'

import heart from '@/assets/judgement/Judgement_Heart.svg'
import vote from '@/assets/community/Vote Yeah.svg'
import star from '@/assets/judgement/star.svg'

interface InfoProps {
    rank : number
    cName : string
    aName : string
    img : string | undefined
    like : number
    voteNum : number

}



const MainInfo = ({rank,cName,aName,img,like,voteNum}:InfoProps)=>{
    if (rank <= 3){
        return(
        <_.MainBox>
            <_.Img_Div><_.Main_Img src={img} alt="info image"/></_.Img_Div>
            


            <_.NameSep>
                <_.CNameSep>
                    <_.CName>{cName}<_.Star_Div src={star}/></_.CName>
                    <_.AName>{aName}</_.AName>
                </_.CNameSep>
                
                <_.Like_Div>
                    
                    <_.Heart src={heart}/>
                    <div>{like}</div>
               
                    <_.Vote src={vote}/>
                    <div>{voteNum}</div>
                    
                    <_.Rank_Div>
                        #{rank}
                    </_.Rank_Div>
                </_.Like_Div>
                
            </_.NameSep>
            
        </_.MainBox>
    )
    }
    else{
        return(
        <_.MainBox>
            <_.Img_Div><_.Main_Img src={img} alt="info image"/></_.Img_Div>
            
            <_.NameSep>
                <_.CNameSep>
                    <_.CName>{cName}</_.CName>
                    <_.AName>{aName}</_.AName>
                </_.CNameSep>
                
                <_.Like_Div>
                    
                    <_.Heart src={heart}/>
                    <div>{like}</div>
               
                    <_.Vote src={vote}/>
                    <div>{voteNum}</div>
                    
                    <_.Rank_Div>
                        #{rank}
                    </_.Rank_Div>
                </_.Like_Div>
                
            </_.NameSep>
            
        </_.MainBox>
    )
    }
    
}

export default MainInfo