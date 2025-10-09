import Inputs from '@/applications/components/inputs';
import * as _ from './style';
import  { useState } from 'react';
import Button from '@/applications/components/button';
import { SetStateAction } from 'jotai';
import FilterBlock from '@/applications/components/filterBlock';
import MemorialBtn from '@/applications/components/memorialBtn';
import JudgementSort from '@/applications/components/judgement_sort';
import Judgement_Object from '@/applications/components/judgementObject';
import hosino from '@/assets/character/hosino.svg'
import { imgs } from '../bow/style';



const sort= [
    '최신',
    '인기',
]


const JudgementList = [

    {rank:1, cName:'호시노 아이', aName:"최애의 아이", img:hosino, like:2025, vote:9999, is_end:false},
    {rank:2, cName:'포트거스 D. 에이스', aName:"원피스", img:hosino, like:2025, vote:8888, is_end:false},
    {rank:3, cName:'사토 카즈마', aName:"이 멋진 세계에 축복을", img:hosino, like:2025, vote:7777, is_end:false},
    {rank:4, cName:'가나다라마바사', aName:"hijklmnop", img:hosino, like:2025, vote:6666, is_end:false},
    {rank:5, cName:'가나다라마바사', aName:"hijklmnop", img:hosino, like:2025, vote:6666, is_end:false},

]




const Judgement = () => {

    const [text,setText] = useState('')

    const [open,setOpen] = useState(false)
    const [choice,setChoice] = useState("최신")

    

    return(
        <_.Container>
            <_.Top>
                <_.Top_Text>** 인기재판은 실시간으로 1시간 마다 갱신됩니다. **</_.Top_Text>
                <_.Search_div>
                    <Inputs
                    width='225px'
                    type='text'
                    value={text}
                    setValue={(value)=>{setText(value)}}
                    placeHold='캐릭터 이름으로 검색'
                    />
                    <MemorialBtn
                        name='검색'
                        width='41px'
                        height='100%'
                        fontSize='14px'
                        type='menu'
                        active={true}
                        onClick={()=>{
                            console.log('zz')
                        }}
                    />
                    
                </_.Search_div>
                <FilterBlock
                        
                        label=''
                        option={choice}
                        isOpen={open}
                        onClick={()=>{setOpen(!open)}}
                        list={sort}
                        onChange={(value)=>{
                            setChoice(value);
                            setOpen(false);
                        }}
                    />
            </_.Top>
            <_.Main_Display>
                <_.Judgement_List>
                    <JudgementSort
                        text='인기재판'
                    />

                    {
                        JudgementList.filter((item)=>item.rank<=3).map((item)=>{
                            return(
                                <Judgement_Object
                                    rank={item.rank}
                                    cName={item.cName}
                                    aName={item.aName}
                                    img={item.img}
                                    like={item.like}
                                    vote={item.vote}
                                />
                            )
                        })
                    }



                    <JudgementSort
                        text='재판'
                    />

                    {
                        JudgementList.filter((item)=>item.rank>3).map((item)=>{
                            return(
                                <Judgement_Object
                                    rank={item.rank}
                                    cName={item.cName}
                                    aName={item.aName}
                                    img={item.img}
                                    like={item.like}
                                    vote={item.vote}
                                />
                            )
                        })
                    }


                    <JudgementSort
                        text='종료된 재판'
                    />
                </_.Judgement_List>
            </_.Main_Display>
        </_.Container>
    );
}


export default Judgement;