import React from 'react';
import * as _ from './style';
import { useState } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn';
import ChevronIcon from '@/assets/community/chevron-left.svg';

const CommunityPostWrite : React.FC = ()=>{
    const [loadPage, setLoadPage] = useState(false); 
    return(
        <_.Container>
            {!loadPage?
            <>
                <_.Title type='text' placeholder='제목을 입력해주세요' />
                <_.Content placeholder='자유롭게 글을 작성해 보세요.'></_.Content>
            </> : 
            <>
                <_.Header>
                    <_.BeforeBtn onClick={()=>setLoadPage(false)}><_.Icon src={ChevronIcon} /></_.BeforeBtn>
                    방태양님의 게시글
                </_.Header>
                <_.PostArea>
                    {
                        <_.Post>
                            <_.PostText>
                                <_.PostTitle>아니근데진짜</_.PostTitle>
                                <_.PostContent>살려주라...</_.PostContent>
                            </_.PostText>
                            <_.PostBtnArea>
                                <_.PostBtn>선택</_.PostBtn>
                                <_.PostBtn>삭제</_.PostBtn>
                            </_.PostBtnArea>
                        </_.Post>
                    }
                </_.PostArea>
            </>
            }
            
            <_.BtnArea>
                <MemorialBtn
                    name="이미지 첨부" selected={true} type = 'submit' active={true}
                    width='108px' height='32px' fontSize = '14px' />
                    <MemorialBtn name="임시저장/불러오기" selected={loadPage} onClick={()=>{setLoadPage(!loadPage)}} type = 'menu' active={true}
                    width='151px' height='32px' fontSize = '14px' />
                    <MemorialBtn name="취소" selected={true} type = 'submit' active={true}
                    width='60px' height='32px' fontSize = '14px' />
                    <MemorialBtn name="게시" selected={true} type = 'submit' active={true}
                    width='60px' height='32px' fontSize = '14px' />
            </_.BtnArea>
        </_.Container>
    );
}
export default CommunityPostWrite;