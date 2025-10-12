import { useEffect, useState } from "react";
import * as _ from "./style"
import balance from '@/assets/judgement/balance.png'
import { useAtomValue, useSetAtom } from "jotai";
import { Event_Count, Event_Past, Open_Vote, Sep_window } from "./state_manage";
import MemorialBtn from "@/applications/components/memorialBtn";

interface VoteProps{
    stack:any[];
    push:any;
    pop:any;
    top:any;

    aName:string,
    cName:string,
    img:string,
    like:number,
    vote:number,
    hell_count:number,
    heaven_count:number,
    
}


const Judgement_Vote = ({stack,push,pop,top,like,aName,cName,vote,heaven_count,hell_count,img}:VoteProps) => {
   
    const [isHeaven, setIsHeaven] = useState(false)
    const [isHell, setIsHell] = useState(false)

    const count = useAtomValue(Event_Count)
    const count_p = useAtomValue(Event_Past)
    const set_count_p = useSetAtom(Event_Past)
    const Set_open_vote = useSetAtom(Open_Vote)
    

    useEffect(()=>{
        if (count != count_p){
            pop()
            set_count_p(count)
        }
    },[count])

    useEffect(()=>{
        Set_open_vote(true)
    },[])

    return(
        <_.Container>
            <_.Main_Display>
                <_.Balance src={balance}/>
                <_.Main_Vote_Live>

                    <_.Live_Div>
                        <_.Live_Back></_.Live_Back>
                        <_.Live_Text>{heaven_count}</_.Live_Text>
                    </_.Live_Div>

                    <_.Live_Div>
                        <_.Live_Back></_.Live_Back>
                        <_.Live_Text>{hell_count}</_.Live_Text>
                    </_.Live_Div>

                </_.Main_Vote_Live>


                <_.Vote_Btn_Div>
                    <MemorialBtn
                        width="128px"
                        height="68px"
                        name="천국"
                        type="menu"
                        fontSize="26px"
                        selected={isHeaven}
                        onClick={()=>{
                            setIsHeaven(true)
                            setIsHell(false)

                        }}
                        
                    />

                    <MemorialBtn
                        width="128px"
                        height="68px"
                        name="지옥"
                        type="menu"
                        fontSize="26px"
                        selected={isHell}
                        onClick={()=>{
                            setIsHell(true)
                            setIsHeaven(false)
                        }}
                    />
                </_.Vote_Btn_Div>
                
                <_.Info>
                    <_.Profile_Div><_.Profile src={img}/></_.Profile_Div>
                    <_.Name_Div>
                        <_.CName>{cName}</_.CName>
                        <_.AName>{aName}</_.AName>
                    </_.Name_Div>
                </_.Info>
            </_.Main_Display>
        </_.Container>
    )
}


export default Judgement_Vote