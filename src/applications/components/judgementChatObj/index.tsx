import * as _ from './style.ts'
import ame from '@/assets/profile/ame.svg'

import heart from '@/assets/community/Community_Heart.svg'
import empty_heart from '@/assets/community/Empty_Heart.svg'
import chat_box from '@/assets/community/Chat.svg'
import { useEffect, useState } from 'react'

interface JudgementChatProps {
    chat_id : number
    user_name : string
    user_id : string
    text : string
    profile : string

    like : number

    isChild : boolean
    child_chat? : number
    parent_id? : number
}

/* text 30글짜 까지 허용 */


const JudgementChatObj = ({user_id, user_name, text, profile, like, isChild, chat_id, child_chat, parent_id} : JudgementChatProps) => {
    
    const [like_img, setLikeImg] = useState(empty_heart)
    const [isEmpty, setIsEmpty] = useState(true)

    useEffect(()=>{
        if(isEmpty===true){
            setLikeImg(empty_heart)
        }
        else{
            setLikeImg(heart)
        }
    },[isEmpty])
    if(isChild===false){
        return(
        <_.Main_Div>
            <_.User_Div>
                <_.Profile src={profile}/>

                <_.Sep_Profile>
                    <_.User_Info>
                        <_.UserName>{user_name}</_.UserName>
                        <_.UserId>@{user_id}</_.UserId>
                    </_.User_Info>
                    <_.Text>{text}</_.Text> 
                </_.Sep_Profile>
            </_.User_Div>

            <_.Int_Div>
                <_.Like_Div>
                    <_.Like_Img src={like_img} onClick={()=>{setIsEmpty(!isEmpty)}}></_.Like_Img>
                    <_.Like_Text_Div>
                        <_.Like>{like}</_.Like>
                    </_.Like_Text_Div>
                </_.Like_Div>

                <_.Child_Chat_Div>
                    <_.Child_Chat_Img src={chat_box}/>
                    <_.Child_Chat_Text_Div>
                        <_.Child_Chat>{child_chat}</_.Child_Chat>
                    </_.Child_Chat_Text_Div>
                </_.Child_Chat_Div>
                
            </_.Int_Div>
        </_.Main_Div>
    )
    }
    else if(isChild===true){
        return(
            <_.Main_Div>
            <_.Child_User_Div>
                <_.Profile src={profile}/>

                <_.Sep_Profile>
                    <_.User_Info>
                        <_.UserName>{user_name}</_.UserName>
                        <_.UserId>@{user_id}</_.UserId>
                    </_.User_Info>
                    <_.Text>{text}</_.Text> 
                </_.Sep_Profile>
            </_.Child_User_Div>

            <_.Int_Div>
                <_.Like_Div>
                    <_.Like_Img src={like_img} onClick={()=>{setIsEmpty(!isEmpty)}}></_.Like_Img>
                    <_.Like_Text_Div>
                        <_.Like>{like}</_.Like>
                    </_.Like_Text_Div>
                </_.Like_Div>                
            </_.Int_Div>
        </_.Main_Div>
        )
    }
    
}


export default JudgementChatObj