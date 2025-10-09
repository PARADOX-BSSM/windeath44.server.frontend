import React from 'react';
import * as _ from './style';
import { useState } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn';
import FilterBlock from '@/applications/components/filterBlock';

const Community : React.FC = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const [sort, setSort] = useState("최신순");
    const [active, setActive] = useState("humor");
    const sortOp: string[] = ["최신순", "인기순"]
    const sortChange = (value: deathType) => {
        setSort(value);
        setIsOpen(false);
    };

    return(
        <_.Container>
            <_.Main>
                <_.Header>
                    <_.ButtonArea>
                        <MemorialBtn name="유머글" selected={active==="humor"} onClick={()=>setActive("humor")}
                        type = 'menu' active={true} width="74px" height="100%" fontSize = '14px' />
                        <MemorialBtn name="인기글" selected={active=="popular"} onClick={()=>setActive("popular")}
                        type = 'menu' active={true} width="74px" height="100%" fontSize = '14px' />
                        <MemorialBtn name="검색" selected={active=="serch"} onClick={()=>setActive("serch")}
                        type = 'menu' active={true} width="74px" height="100%" fontSize = '14px' />
                        <MemorialBtn name="게시글 작성" selected={false} onClick={()=>{}}
                        type = 'menu' active={true} width="108px" height="100%" fontSize = '14px' />
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
                
            </_.Main>
            <_.Judgement>
                <_.NavJudgement>
                    <_.JudgementImg />
                    <_.JudgementText>재판으로</_.JudgementText>
                </_.NavJudgement>
            </_.Judgement>
        </_.Container>
    );
}
export default Community;