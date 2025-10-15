import React from 'react';
import * as _ from './style';
import { useState } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn';
import CommunityBtn from '@/applications/components/communityBtn';
import FilterBlock from '@/applications/components/filterBlock';
import Inputs from '@/applications/components/inputs';
import Posts from '@/applications/components/posts';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';


enum sortOption{
    Latest = "최신순",
    Popular = "인기순"
}
interface User {
    name: string;
    id: string;
    profileImage: string;
}
interface Post{
    title: string;
    content: string;
    postImage: string;
    comment: number;
    heart: number;
    datetime: string;
}

const Community : React.FC = ()=>{
    const taskTransform = useAtomValue(taskTransformerAtom);
    
    const [isOpen, setIsOpen] = useState(false);
    const [sort, setSort] = useState(sortOption.Latest);
    const [active, setActive] = useState("humor");
    const [search, setSearch] = useState("");

    const sortOp: string[] = [sortOption.Latest, sortOption.Popular];
    const sortChange = (value: any) => {
        setSort(value);
        setIsOpen(false);
    };

    return(
        <_.Container>
            <_.Main>
                <_.Header>
                    <_.ButtonArea>
                        <CommunityBtn name="유머글" selected={active==="humor"} onClick={()=>setActive("humor")} type='menu' />
                        <CommunityBtn name="인기글" selected={active=="popular"} onClick={()=>setActive("popular")}type = 'menu' />
                        <CommunityBtn name="검색" selected={active=="search"} onClick={()=>setActive("search")} type = 'menu' />
                        <CommunityBtn name="게시글 작성" selected={false} onClick={()=>{
                            if(taskTransform)
                                taskTransform('', '게시글 작성'); }}
                        type = 'menu' />
                    </_.ButtonArea>
                    <_.sortInput>
                        <FilterBlock
                            label=""
                            option={sort}
                            isOpen={isOpen}
                            onClick={()=> setIsOpen(!isOpen)}
                            list={sortOp}
                            onChange={sortChange}
                        />
                    </_.sortInput>
                </_.Header>
                {active=="search" && <_.InputArea>
                    <Inputs width='100%' fontSize='14px' flex value={search} type='text' setValue={setSearch} placeHold="무엇이든 입력해보세요!" />
                    <MemorialBtn name='검색' type='menu' width='74px' height='100%' fontSize='14px' />
                    {/*<CommunityBtn name="검색" onClick={()=>setActive("search")} type='menu' />*/}
                </_.InputArea>}
                <_.PostArea>
                    <Posts user={{name:"방태양", id:"noah_byte", profileImage:""}} 
                    post={{title:"아니 얘가 벌써 죽는다고?", content:"아니 이건 진짜 아니지. 살려내라.", postImage:"",
                        datetime:"2025년 09월 14일 AM 8:47", heart:12, comment:20
                    }}  />
                </_.PostArea>

            </_.Main>
            <_.Judgement>
                <_.NavJudgement>
                    <_.JudgementImg />
                    <_.JudgementText>재판으로</_.JudgementText>
                </_.NavJudgement>

                <_.JudgementLankArea>
                    <_.JudgementText>진행중인 재판</_.JudgementText>
                    <_.JudgementLankList>
                        <_.JudgementLank>
                            <_.JudgementLankNum>#1</_.JudgementLankNum>
                            <_.JudgementName>호시노 아이</_.JudgementName>
                        </_.JudgementLank>
                        <_.JudgementLank>
                            <_.JudgementLankNum>#2</_.JudgementLankNum>
                            <_.JudgementName>포트거스 D. 에이스</_.JudgementName>
                        </_.JudgementLank>
                        <_.JudgementLank>
                            <_.JudgementLankNum>#3</_.JudgementLankNum>
                            <_.JudgementName>사토 카즈마</_.JudgementName>
                        </_.JudgementLank>
                    </_.JudgementLankList>
                </_.JudgementLankArea>
            </_.Judgement>
        </_.Container>
    );
}
export default Community;