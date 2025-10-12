import * as _ from './style.ts'
import {ChatList} from './chat_list.ts'
import { useState } from 'react'
import MemorialBtn from '@/applications/components/memorialBtn/index.tsx'
import FilterBlock from '@/applications/components/filterBlock/index.tsx'
import JudgementChatObj from '@/applications/components/judgementChatObj/index.tsx'

const sort= [
    '최신',
    '인기',
]



const JudgementChat = () => {

    const chat_list = ChatList.sort((a, b) => a.chat_id - b.chat_id);

    const [input_value,set_input_value] = useState('')

    const [open,setOpen] = useState(false)
    const [choice,setChoice] = useState("최신")


    return(
        <_.Container>
            <_.Input_Sep>
                <_.Chat_Back>
                    <_.Title_Div>
                        <_.Title_Text>배심원 토의</_.Title_Text>
                        <_.Select_Div>
                            <FilterBlock
                            label=''
                            option={choice}
                            isOpen={open}
                            list={sort}
                            onChange={(e)=>{
                                setChoice(e)
                                setOpen(false)
                            }}
                            onClick={()=>{setOpen(!open)}}
                            />
                        </_.Select_Div>
                        
                    </_.Title_Div>

                    <_.Discussion>
                            {
                                chat_list.map((item)=>{
                                    return(
                                        <JudgementChatObj
                                            user_id={item.user_id}
                                            user_name={item.user_name}
                                            chat_id={item.chat_id}
                                            text={item.text}
                                            profile={item.profile}
                                            like={item.like}
                                            isChild={item.isChild}
                                            child_chat={item.child_chat}
                                            
                                        />

                                    )
                                })
                            }
                            
                    </_.Discussion>
                </_.Chat_Back>


                <_.Input_Div>
                    <_.Input placeholder='댓글을 입력하세요' onChange={(value)=>{set_input_value(value.target.value)}}></_.Input>
                    <_.Submit_Btn>
                        <MemorialBtn
                            name='게시'
                            type='menu'
                            width='46px'
                            height='22px'
                    
                            fontSize='11px'
                        />
                    </_.Submit_Btn>
                </_.Input_Div>
            </_.Input_Sep>
        </_.Container>
    )
}

export default JudgementChat